import dotenv from "dotenv";
import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";
import JTokenjson from "../ABI/JAvaxDelegator.json";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import { JUsdcDelegator } from "../typechain-types/from-abis";
import { utils } from "ethers";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { optimizeLiquidations } from "./optimizeLiquidations";
import { exit } from "process";

dotenv.config();
const clientInflux = new InfluxDB({
  url: process.env.INFLUXDB_URI,
  token: process.env.INFLUXDB_TOKEN,
});
const avalancheBucket = clientInflux.getWriteApi("57ac5d56999288ec", "Avalanche", "s");

const wAvax_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

const TimeTravel = false;

const main = async () => {
  const signer = await ethers.getSigner("0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097");
  const wAvax = await ethers.getContractAt("IERC20", wAvax_address, signer);
  const Liquidatoor_factory = await ethers.getContractFactory("JoeLiquidatoor", signer);
  const Liquidatoor = await Liquidatoor_factory.deploy(
    JoeTrollerjson.address,
    JoeRouterjson.address,
    "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", //xJoe
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //wAvax
  );

  console.log("Contract deployed on : " + Liquidatoor.address);

  const joeTroller = await ethers.getContractAt("Joetroller", JoeTrollerjson.address, signer);
  const joeRouter = await ethers.getContractAt("JoeRouter02", JoeRouterjson.address, signer);

  let accounts: Account[] = [];

  if (TimeTravel) {
    accounts = await AccountsToLiquidate(1, 1.06);
  } else {
    accounts = await AccountsToLiquidate(0, 1);
  }

  let target = optimizeLiquidations(accounts);
  if (!TimeTravel) {
    while (!(await joeTroller.getAccountLiquidity(target.id))[2].gt(0)) {
      accounts = accounts.filter((account) => account.id !== target.id);
      target = optimizeLiquidations(accounts);
      console.log("Account skipped");
    }
  }
  if (!target) {
    exit(0);
  }
  const collateraltoken = target.tokens.reduce((prev, current) => {
    return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying && prev.enteredMarket ? prev : current;
  });

  const liquidatedtoken = target.tokens.reduce((prev, current) => {
    return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying ? prev : current;
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
    signer
  )) as JUsdcDelegator;

  const jliquidatedtoken = (await ethers.getContractAt(
    JTokenjson.abi,
    liquidatedtoken.id.substring(0, 42),
    signer
  )) as JUsdcDelegator;

  let liquidity = await joeTroller.getAccountLiquidity(target.id);

  console.log(await jliquidatedtoken.callStatic.borrowBalanceCurrent(target.id));

  console.log("Account liquidity : " + utils.formatEther(liquidity[1]));

  if (TimeTravel) {
    let months = 0;
    while (!liquidity[2].gt(0)) {
      await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 180]); // 6 month
      await jliquidatedtoken.accrueInterest();
      await jcollateraltoken.accrueInterest();
      months += 6;
      liquidity = await joeTroller.getAccountLiquidity(target.id);
    }

    console.log("%s month later", months);
    console.log("Account liquidity : " + utils.formatEther(liquidity[1]), utils.formatEther(liquidity[2]));
  }

  let borrow_balance = await jliquidatedtoken.callStatic.borrowBalanceCurrent(target.id);
  if (liquidatedtoken.borrowBalanceUnderlying / 2 > collateraltoken.supplyBalanceUnderlying) {
    const ratio = collateraltoken.supplyBalanceUnderlying / (liquidatedtoken.borrowBalanceUnderlying / 2);
    borrow_balance = borrow_balance.mul(ratio);
  }

  let wavax_balance = await wAvax.balanceOf(Liquidatoor.address);

  let avax_balance = await signer.getBalance();

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

  const avax_price = await joeRouter.getAmountsOut(utils.parseEther("1"), [
    wAvax_address,
    "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  ]);

  const gas_amount = await Liquidatoor.estimateGas.liquidate(
    target.id,
    jliquidatedtoken.address,
    jcollateraltoken.address,
    flashloantoken_address,
    borrow_balance.div(2)
  );

  const gas_price = await signer.getGasPrice();

  const estimate_costs =
    Number.parseFloat(utils.formatEther(avax_price[1].mul(1e12))) *
    Number.parseFloat(utils.formatEther(gas_amount.mul(gas_price)));

  const estimate_earnings =
    Math.min(liquidatedtoken.borrowBalanceUnderlying / 2, collateraltoken.supplyBalanceUnderlying) * 0.08;

  console.log(estimate_earnings, estimate_costs);

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

  wavax_balance = (await wAvax.balanceOf(Liquidatoor.address)).sub(wavax_balance);
  avax_balance = (await signer.getBalance()).sub(avax_balance);

  console.log("Overall earnings : ", utils.formatEther(wavax_balance.add(avax_balance)));

  // Monitoring using InfluxDB and Grafana
  let balancePoint = new Point("liquidation")
    .floatField("value", utils.formatEther(wavax_balance.add(avax_balance)))
    .tag("name", "tj-liquidator")
    .tag("version", "testv1");

  avalancheBucket.writePoint(balancePoint);
  avalancheBucket.flush();
};

main();

// const optimizeLiquidations = (accounts: Account[]) => {
//   const currentTarget = accounts.reduce((prev, current) => {
//     return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD ? prev : current;
//   });

//   let nextTarget: Account;
//   if (accounts.filter((account) => account.id !== currentTarget.id).length > 0) {
//     nextTarget = optimizeLiquidations(accounts.filter((account) => account !== currentTarget));
//   } else {
//     return currentTarget;
//   }

//   if (liquidationValueOfAccount(currentTarget) > liquidationValueOfAccount(nextTarget)) {
//     return currentTarget;
//   } else {
//     return nextTarget;
//   }
// };

// const liquidationValueOfAccount = (account: Account) => {
//   const collateraltoken = account.tokens.reduce((prev, current) => {
//     return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying && prev.enteredMarket ? prev : current;
//   });

//   const liquidatedtoken = account.tokens.reduce((prev, current) => {
//     return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying ? prev : current;
//   });

//   return Math.min(liquidatedtoken.borrowBalanceUnderlying / 2, collateraltoken.supplyBalanceUnderlying);
// };
