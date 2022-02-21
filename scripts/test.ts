import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";

import JAvaxDelegatorjson from "../ABI/JAvaxDelegator.json";
import JTokenjson from "../ABI/JUsdcDelegator.json";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import Joetroller from "../ABI/Joetroller.json";
import { Interface } from "ethers/lib/utils";
import { JoeRouter, JUsdcDelegator } from "../typechain-types/from-abis";
import { IERC20 } from "../typechain-types";
import { BigNumber, utils } from "ethers";
import { util } from "chai";
import { exit } from "process";

const wAvax_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";

const main = async () => {
  let array: Account[] = [];

  await AccountsToLiquidate(1, 1.1).then((accounts) => {
    array = accounts;
  });

  var res = array.reduce((prev, current) => {
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

  console.log("Target : " + res.id);
  console.log(
    "Collateral : " + collateraltoken_info.symbol,
    "Balance : " + collateraltoken_info.supplyBalanceUnderlying
  );
  console.log(
    "Liquidated : " + liquidatedtoken_info.symbol,
    "Balance : " + liquidatedtoken_info.borrowBalanceUnderlying
  );

  let signer = await ethers.getSigner(
    "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"
  );

  const jcollateraltoken = (await ethers.getContractAt(
    JTokenjson.abi,
    collateraltoken_info.id.substring(0, 42),
    signer
  )) as JUsdcDelegator;

  const jliquidatedtoken = (await ethers.getContractAt(
    JTokenjson.abi,
    liquidatedtoken_info.id.substring(0, 42),
    signer
  )) as JUsdcDelegator;

  const joeTroller = await ethers.getContractAt(
    "Joetroller",
    JoeTrollerjson.address,
    signer
  );

  const joeRouter = (await ethers.getContractAt(
    JoeRouterjson.abi,
    JoeRouterjson.address,
    signer
  )) as JoeRouter;

  let liquidity = await joeTroller.getAccountLiquidity(borrower);

  console.log(await jliquidatedtoken.callStatic.borrowBalanceCurrent(borrower));

  console.log("Account liquidity : " + utils.formatEther(liquidity[1]));

  let months = 0;
  while (liquidity[1].gt(0)) {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 180]); // 6 month
    await jliquidatedtoken.accrueInterest();
    months += 6;
    liquidity = await joeTroller.getAccountLiquidity(borrower);
  }

  console.log("%s month later", months);
  console.log(
    "Account liquidity : " + utils.formatEther(liquidity[1]),
    utils.formatEther(liquidity[2])
  );

  const borrow_balance = await jliquidatedtoken.callStatic.borrowBalanceCurrent(
    borrower
  );

  let lastblock = await signer.provider.getBlock("latest");

  const underlyingtokenliquidated_address = await jliquidatedtoken.underlying();

  const underlyingtokenliquidated = (await ethers.getContractAt(
    "IERC20",
    underlyingtokenliquidated_address,
    signer
  )) as IERC20;

  await joeRouter.swapExactAVAXForTokens(
    0,
    [wAvax_address, underlyingtokenliquidated_address],
    signer.address,
    lastblock.timestamp + 10,
    { value: utils.parseEther("800") }
  );

  console.log(
    utils.formatEther(await underlyingtokenliquidated.balanceOf(signer.address))
  );

  await underlyingtokenliquidated.approve(
    jliquidatedtoken.address,
    await underlyingtokenliquidated.balanceOf(signer.address)
  );

  console.log(
    await joeTroller.callStatic.liquidateBorrowAllowed(
      jliquidatedtoken.address,
      jcollateraltoken.address,
      signer.address,
      borrower,
      borrow_balance.div(2)
    )
  );

  console.log(await joeTroller.getAccountLiquidity(borrower));

  let tx = await jliquidatedtoken.liquidateBorrow(
    borrower,
    borrow_balance.div(3),
    jcollateraltoken.address
  );

  console.log(tx);

  const receipt = await tx.wait();

  receipt.logs.forEach((l) => {
    console.log(jliquidatedtoken.interface.parseLog(l));
  });

  // borrow = await jUsdc.callStatic.borrowBalanceCurrent(target);
  // console.log(utils.formatEther(borrow));

  // const myLiquidator = (await ethers.getContractFactory(
  //   "JoeLiquidatoor"
  // )) as JoeLiquidatoor__factory;
  // const liquidator = await myLiquidator.deploy(Joetroller_address);

  // await liquidator.deployed();
  // console.log(`Flash deployed to: ${liquidator.address}`);

  // let wavax = new Contract(wAvax_address, IERC20_interface, signer);

  // //fund contract with wavax so I can reimburse the loan without worrying
  // let tx = {
  //   to: wavax.address,
  //   value: ethers.utils.parseEther("200"),
  // };
  // await signer.sendTransaction(tx);
  // await wavax.transfer(liquidator.address, ethers.utils.parseEther("200"));

  // await liquidator.functions.doFlashloan(
  //   jAvax_address,
  //   utils.parseEther("500")
  // );
  // //french way to be happy when the script works
  // console.log("Yooooooo ca a marché !");
};

main();
