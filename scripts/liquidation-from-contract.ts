import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";
import JTokenjson from "../ABI/JAvaxDelegator.json";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import { JoeRouter, JUsdcDelegator } from "../typechain-types/from-abis";
import { IERC20 } from "../typechain-types";
import { utils } from "ethers";

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
    "Balance : " + collateraltoken_info.supplyBalanceUnderlying,
    "Address : " + collateraltoken_info.id.substring(0, 42)
  );
  console.log(
    "Liquidated : " + liquidatedtoken_info.symbol,
    "Balance : " + liquidatedtoken_info.borrowBalanceUnderlying,
    "Address : " + liquidatedtoken_info.id.substring(0, 42)
  );

  const signer = await ethers.getSigner(
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

  let liquidity = await joeTroller.getAccountLiquidity(borrower);

  console.log(await jliquidatedtoken.callStatic.borrowBalanceCurrent(borrower));

  console.log("Account liquidity : " + utils.formatEther(liquidity[1]));

  let months = 0;
  while (liquidity[1].gt(0)) {
    await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 180]); // 6 month
    await jliquidatedtoken.accrueInterest();
    await jcollateraltoken.accrueInterest();
    months += 6;
    liquidity = await joeTroller.getAccountLiquidity(borrower);
  }

  console.log("%s month later", months);
  console.log(
    "Account liquidity : " + utils.formatEther(liquidity[1]),
    utils.formatEther(liquidity[2])
  );

  const Liquidatoor_factory = await ethers.getContractFactory(
    "JoeLiquidatoor",
    signer
  );

  const Liquidatoor = await Liquidatoor_factory.deploy(
    JoeTrollerjson.address,
    JoeRouterjson.address
  );

  console.log("Contract deployed on : " + Liquidatoor.address);

  const borrow_balance = await jliquidatedtoken.callStatic.borrowBalanceCurrent(
    borrower
  );

  const receipt = await (
    await Liquidatoor.doFlashloan(
      borrower,
      jliquidatedtoken.address,
      jcollateraltoken.address,
      JTokenjson.address,
      borrow_balance.div(2)
    )
  ).wait();

  console.log(
    "Transaction status : " + receipt.status,
    "Gas paid : " + receipt.gasUsed.toString()
  );
};

main();
