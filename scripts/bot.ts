import dotenv from "dotenv";
import { ethers } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import JTokenjson from "../ABI/JAvaxDelegator.json";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import { utils } from "ethers";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { optimizeLiquidations } from "./optimizeLiquidations";
import { exit } from "process";
import { collections, connectToDatabase } from "../services/database.service";
import { JCollateralCapErc20 } from "../typechain-types";
dotenv.config();

const WAVAX_ADDRESS = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const GASCHECK = true;

const main = async () => {
  // InfluxDB setup to store liquidation results
  const clientInflux = new InfluxDB({
    url: process.env.INFLUXDB_URI,
    token: process.env.INFLUXDB_TOKEN,
  });
  const avalancheBucket = clientInflux.getWriteApi("57ac5d56999288ec", "Avalanche", "s");

  // MongoDB connection to get the bot private key and the contract address
  await connectToDatabase();

  // Connection to the official RPC
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_HTTP_URL);

  // Initialisation of the signer
  const bot = new ethers.Wallet(
    (
      await collections.bots.findOne({
        name: "TJliquidator",
      })
    ).private_key,
    provider
  );

  // Contract initialization
  const wAvax = await ethers.getContractAt("IERC20", WAVAX_ADDRESS, bot);
  const contract_address = await collections.contracts.findOne({
    name: "TJliquidator",
  });
  const Liquidatoor = await ethers.getContractAt("JoeLiquidatoor", contract_address.address, bot);
  const joeTroller = await ethers.getContractAt("Joetroller", JoeTrollerjson.address, bot);
  const joeRouter = await ethers.getContractAt("JoeRouter02", JoeRouterjson.address, bot);

  // Accounts are retrieved from TJ subgraph
  let accounts = await AccountsToLiquidate(0, 1);

  // Best target is chosen
  // This bot liquidates one target at a time
  let target = optimizeLiquidations(accounts);

  // I noticed that sometimes the graphQL isn't completly accurate and returns not underwater accounts
  // This part makes sure to get a real underwater target
  while (!(await joeTroller.getAccountLiquidity(target.id))[2].gt(0)) {
    accounts = accounts.filter((account) => account.id !== target.id);
    target = optimizeLiquidations(accounts);
    console.log("Account skipped");
  }

  //If there is nothing to liquidate it stops
  if (!target) {
    exit(0);
  }

  // Identification of liquidated and collateral tokens (biggests supply and borrow balances)
  const liquidatedtoken = target.tokens.reduce((prev, current) => {
    return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying ? prev : current;
  });
  const collateraltoken = target.tokens.reduce((prev, current) => {
    return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying && prev.enteredMarket ? prev : current;
  });

  console.log("Target : " + target.id);
  console.log(
    "Collateral : " + collateraltoken.symbol,
    "Balance : " + collateraltoken.supplyBalanceUnderlying,
    "Address : " + collateraltoken.id.substring(0, 42)
  );
  console.log(
    "Liquidated : " + liquidatedtoken.symbol,
    "Balance : " + liquidatedtoken.borrowBalanceUnderlying,
    "Address : " + liquidatedtoken.id.substring(0, 42)
  );

  const jcollateraltoken = (await ethers.getContractAt(
    JTokenjson.abi,
    collateraltoken.id.substring(0, 42),
    bot
  )) as JCollateralCapErc20;

  const jliquidatedtoken = (await ethers.getContractAt(
    JTokenjson.abi,
    liquidatedtoken.id.substring(0, 42),
    bot
  )) as JCollateralCapErc20;

  /* Determination of how much we want to repay
    If there is not enough collateral to seize,
    I calculate what proportion of the borrowed token I can repay, directly from the value in $ 
    */
  let borrow_balance = await jliquidatedtoken.callStatic.borrowBalanceCurrent(target.id);
  if (liquidatedtoken.borrowBalanceUnderlying / 2 > collateraltoken.supplyBalanceUnderlying) {
    const ratio = collateraltoken.supplyBalanceUnderlying / (liquidatedtoken.borrowBalanceUnderlying / 2);
    borrow_balance = borrow_balance.mul(ratio);
  }

  /* Choice of the flashloan token :
    wAvax is the priority as it will be the easiest one to 
    swap with every other token borrowed or used as collateral.
    If not possible, I take the token from the biggest TJ pools to minimize slippage.
    I sticked with TJ but it could be more interessant to 
    use it along with other protocols to minimize swap costs.
    */
  let flashloantoken_address = "";
  // WAVAX not involved
  if (collateraltoken.symbol !== "jAVAX" && liquidatedtoken.symbol !== "jAVAX") {
    flashloantoken_address = "0xC22F01ddc8010Ee05574028528614634684EC29e";
  }
  // USDC.e first (AVAX/USDC.e is the biggest pool on TJ)
  else if (collateraltoken.symbol !== "jUSDC" && liquidatedtoken.symbol !== "jUSDC") {
    flashloantoken_address = "0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC";
  }
  // USDT second (second biggest pool)
  else {
    flashloantoken_address = "0x8b650e26404AC6837539ca96812f0123601E4448";
  }

  // Very rough estimation of the gas cost of the transaction in regards of the profits
  // GASCHECK = false allowed me to do some demo liquidations
  if (GASCHECK) {
    const avax_price = await joeRouter.getAmountsOut(utils.parseEther("1"), [
      WAVAX_ADDRESS,
      "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", //USDC address
    ]);

    const gas_amount = await Liquidatoor.estimateGas.liquidate(
      target.id,
      jliquidatedtoken.address,
      jcollateraltoken.address,
      flashloantoken_address,
      borrow_balance.div(2)
    );
    const gas_price = await bot.getGasPrice();

    const estimate_costs =
      Number.parseFloat(utils.formatEther(avax_price[1].mul(1e12))) *
      Number.parseFloat(utils.formatEther(gas_amount.mul(gas_price)));

    const estimate_earnings =
      Math.min(liquidatedtoken.borrowBalanceUnderlying / 2, collateraltoken.supplyBalanceUnderlying) * 0.08;

    if (estimate_earnings < estimate_costs) {
      console.log("Liquidation will not be profitable");
      exit(0);
    }
  }

  // Initialisation of the balances before the liquidation
  let wavax_balance = await wAvax.balanceOf(Liquidatoor.address);
  let avax_balance = await bot.getBalance();

  // Liquidation
  const receipt = await (
    await Liquidatoor.liquidate(
      target.id,
      jliquidatedtoken.address,
      jcollateraltoken.address,
      flashloantoken_address,
      borrow_balance.div(2)
    )
  ).wait();

  console.log("Transaction status : " + receipt.status, "Gas paid : " + receipt.gasUsed.toString());

  // Balances evolution after the liquidation
  wavax_balance = (await wAvax.balanceOf(Liquidatoor.address)).sub(wavax_balance);
  avax_balance = (await bot.getBalance()).sub(avax_balance);

  console.log("Overall earnings : ", utils.formatEther(wavax_balance.add(avax_balance)));

  // Monitoring using InfluxDB and Grafana
  let balancePoint = new Point("liquidation")
    .floatField("value", utils.formatEther(wavax_balance.add(avax_balance)))
    .tag("name", "tj-liquidator")
    .tag("version", "prod");

  avalancheBucket.writePoint(balancePoint);
  avalancheBucket.flush();

  exit(0);
};

main();
