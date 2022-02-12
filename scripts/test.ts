import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";

import JAvaxDelegator from "../ABI/JAvaxDelegator.json";
import Joetroller from "../ABI/Joetroller.json";
import { Interface } from "@ethersproject/abi";
import { Contract, ContractFactory, Overrides, utils } from "ethers";

const jUSDC_address = ethers.utils.getAddress(JAvaxDelegator.address);
const Joetroller_address = ethers.utils.getAddress(Joetroller.address);

const jUSDC_interfacte = new Interface(JAvaxDelegator.abi);
const Joetroller__interfacte = new Interface(Joetroller.abi);

const main = async () => {
  let array: Account[] = [];

  // await AccountsToLiquidate(0, 1).then((accounts) => {
  //   array = accounts;
  // });

  // var res = array.reduce((prev, current) => {
  //   return prev.totalBorrowValueInUSD > current.totalBorrowValueInUSD
  //     ? prev
  //     : current;
  // });

  // console.log(res);

  // console.log(await ethers.provider.getBlock("latest"));

  let signer = await ethers.getSigner(
    "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"
  );

  let overrides = {
    value: utils.parseEther("5"),
  };

  await network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: ["0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097"],
  });

  let javax = new ethers.Contract(jUSDC_address, jUSDC_interfacte, signer);

  console.log(utils.formatEther(await javax.balanceOf(signer.address)));

  await javax.mintNative(overrides);

  await console.log(utils.formatEther(await javax.balanceOf(signer.address)));

  const Flash: ContractFactory = await ethers.getContractFactory(
    "FlashloanBorrower"
  );
  const flash: Contract = await Flash.deploy(Joetroller_address);

  await flash.deployed();
  console.log(`Flash deployed to: ${flash.address}`);

  await javax.transfer(flash.address, utils.parseEther("4"));

  let tx = await flash.doFlashloan(jUSDC_address, utils.parseEther("0.0005"));

  console.log(tx);
};

main();
