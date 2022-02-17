import { ethers } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";
import { Contract, ContractFactory, utils } from "ethers";

import JAvaxDelegator from "../ABI/JAvaxDelegator.json";
import Joetroller from "../ABI/Joetroller.json";
import IERC20 from "../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";
import { Interface } from "ethers/lib/utils";

const jAvax_address = ethers.utils.getAddress(JAvaxDelegator.address);
const Joetroller_address = ethers.utils.getAddress(Joetroller.address);
const wAvax_address = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const IERC20_interface = new Interface(IERC20.abi);

const main = async () => {
  let array: Account[] = [];

  await AccountsToLiquidate(0, 1).then((accounts) => {
    array = accounts;
  });

  var res = array.reduce((prev, current) => {
    return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD
      ? prev
      : current;
  });

  console.log(res);

  let signer = await ethers.getSigner(
    "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"
  );

  const myLiquidator: ContractFactory = await ethers.getContractFactory(
    "JoeLiquidatoor"
  );
  const liquidator: Contract = await myLiquidator.deploy(Joetroller_address);

  await liquidator.deployed();
  console.log(`Flash deployed to: ${liquidator.address}`);

  let wavax = new Contract(wAvax_address, IERC20_interface, signer);

  //fund contract with wavax so I can reimburse the loan without worrying
  let tx = {
    to: wavax.address,
    value: ethers.utils.parseEther("200"),
  };
  await signer.sendTransaction(tx);
  await wavax.transfer(liquidator.address, ethers.utils.parseEther("200"));

  await liquidator.doFlashloan(jAvax_address, utils.parseEther("500"));
  //french way to be happy when the script works
  console.log("Yooooooo ca a marché !");
};

main();
