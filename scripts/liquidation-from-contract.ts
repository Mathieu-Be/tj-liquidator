import dotenv from "dotenv";
import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account, AccountJToken } from "../graphql/generated";
import JTokenjson from "../ABI/JAvaxDelegator.json";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import { JUsdcDelegator } from "../typechain-types/from-abis";
import { utils } from "ethers";
import { InfluxDB, Point } from "@influxdata/influxdb-client";

dotenv.config();
const clientInflux = new InfluxDB({
  url: process.env.INFLUXDB_URI,
  token: process.env.INFLUXDB_TOKEN,
});
const avalancheBucket = clientInflux.getWriteApi(
  "57ac5d56999288ec",
  "Avalanche",
  "s"
);

const wAvax_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

const IsGreedy = false;
const TimeTravel = true;

const main = async () => {
  let accounts: Account[] = [];

  if (TimeTravel) {
    accounts = await AccountsToLiquidate(1, 3);
  } else {
    accounts = await AccountsToLiquidate(0, 1);
  }

  const liquidation = optimizeLiquidations(accounts)[0];

  const signer = await ethers.getSigner(
    "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"
  );
  const wAvax = await ethers.getContractAt("IERC20", wAvax_address, signer);
  const Liquidatoor_factory = await ethers.getContractFactory(
    "JoeLiquidatoor",
    signer
  );
  const Liquidatoor = await Liquidatoor_factory.deploy(
    JoeTrollerjson.address,
    JoeRouterjson.address,
    "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", //xJoe
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //wAvax
  );

  console.log("Contract deployed on : " + Liquidatoor.address);

  console.log("Target : " + liquidation.target_address);
  console.log(
    "Collateral : " + liquidation.jcollateraltoken.symbol,
    "Balance : " + liquidation.jcollateraltoken.supplyBalanceUnderlying,
    "Address : " + liquidation.jcollateraltoken.id.substring(0, 42)
  );
  console.log(
    "Liquidated : " + liquidation.jliquidatedtoken.symbol,
    "Balance : " + liquidation.jliquidatedtoken.borrowBalanceUnderlying,
    "Address : " + liquidation.jliquidatedtoken.id.substring(0, 42)
  );

  const jcollateraltoken = (await ethers.getContractAt(
    JTokenjson.abi,
    liquidation.jcollateraltoken.id.substring(0, 42),
    signer
  )) as JUsdcDelegator;

  const jliquidatedtoken = (await ethers.getContractAt(
    JTokenjson.abi,
    liquidation.jliquidatedtoken.id.substring(0, 42),
    signer
  )) as JUsdcDelegator;

  const joeTroller = await ethers.getContractAt(
    "Joetroller",
    JoeTrollerjson.address,
    signer
  );

  let liquidity = await joeTroller.getAccountLiquidity(
    liquidation.target_address
  );

  console.log(
    await jliquidatedtoken.callStatic.borrowBalanceCurrent(
      liquidation.target_address
    )
  );

  console.log("Account liquidity : " + utils.formatEther(liquidity[1]));

  if (TimeTravel) {
    let months = 0;
    while (!liquidity[2].gt(0)) {
      await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 180]); // 6 month
      await jliquidatedtoken.accrueInterest();
      await jcollateraltoken.accrueInterest();
      months += 6;
      liquidity = await joeTroller.getAccountLiquidity(
        liquidation.target_address
      );
    }

    console.log("%s month later", months);
    console.log(
      "Account liquidity : " + utils.formatEther(liquidity[1]),
      utils.formatEther(liquidity[2])
    );
  }

  const borrow_balance = await jliquidatedtoken.callStatic.borrowBalanceCurrent(
    liquidation.target_address
  );

  let wavax_balance = await wAvax.balanceOf(Liquidatoor.address);

  let avax_balance = await signer.getBalance();

  const receipt = await (
    await Liquidatoor.doFlashloan(
      liquidation.target_address,
      jliquidatedtoken.address,
      jcollateraltoken.address,
      liquidation.jflashloantoken,
      borrow_balance.div(2)
    )
  ).wait();

  console.log(
    "Transaction status : " + receipt.status,
    "Gas paid : " + receipt.gasUsed.toString()
  );

  wavax_balance = (await wAvax.balanceOf(Liquidatoor.address)).sub(
    wavax_balance
  );
  avax_balance = (await signer.getBalance()).sub(avax_balance);

  console.log(
    "Overall earnings : ",
    utils.formatEther(wavax_balance.add(avax_balance))
  );

  // Monitoring using InfluxDB and Grafana
  let balancePoint = new Point("liquidation")
    .floatField("value", utils.formatEther(wavax_balance.add(avax_balance)))
    .tag("name", "tj-liquidator")
    .tag("version", "testv1");

  avalancheBucket.writePoint(balancePoint);
  avalancheBucket.flush();
};

main();

interface Liquidation {
  target_address: string;
  jliquidatedtoken: AccountJToken;
  jcollateraltoken: AccountJToken;
  jflashloantoken: string;
}

const optimizeLiquidations = (accounts: Account[]) => {
  let liquidations: Liquidation[] = [];

  if (IsGreedy) {
    var res = accounts.reduce((prev, current) => {
      return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD
        ? prev
        : current;
    });

    const borrower = res.id;
    const collateraltoken_info = res.tokens.reduce((prev, current) => {
      return prev.supplyBalanceUnderlying > current.supplyBalanceUnderlying
        ? prev
        : current;
    });

    const liquidatedtoken_info = res.tokens.reduce((prev, current) => {
      return prev.borrowBalanceUnderlying > current.borrowBalanceUnderlying
        ? prev
        : current;
    });

    let flashloantoken_address = "";
    // WAVAX not involved
    if (
      collateraltoken_info.symbol !== "jAVAX" &&
      liquidatedtoken_info.symbol !== "jAVAX"
    ) {
      flashloantoken_address = "0xC22F01ddc8010Ee05574028528614634684EC29e";
    }
    // USDC.e first (AVAX/USDC.e biggest pool on TJ)
    else if (
      collateraltoken_info.symbol !== "jUSDC" &&
      liquidatedtoken_info.symbol !== "jUSDC"
    ) {
      flashloantoken_address = "0xEd6AaF91a2B084bd594DBd1245be3691F9f637aC";
    }
    // USDT second (second biggest pool)
    else {
      flashloantoken_address = "0x8b650e26404AC6837539ca96812f0123601E4448";
    }

    liquidations.push({
      target_address: borrower,
      jcollateraltoken: collateraltoken_info,
      jliquidatedtoken: liquidatedtoken_info,
      jflashloantoken: flashloantoken_address,
    });
  }

  return liquidations;
};
