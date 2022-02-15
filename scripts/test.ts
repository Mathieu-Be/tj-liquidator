import { ethers, network } from "hardhat";
import { AccountsToLiquidate } from "../graphql/accounts.queries";
import { Account } from "../graphql/generated";

import JAvaxDelegator from "../ABI/JAvaxDelegator.json";
import Joetroller from "../ABI/Joetroller.json";
import { Interface } from "@ethersproject/abi";
import {
  Contract,
  ContractFactory,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  utils,
} from "ethers";

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
    value: utils.parseEther("690"),
  };

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

  let wavax = await ethers.getContractAt(
    "WAVAX",
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    signer
  );

  let tx = {
    to: wavax.address,
    value: ethers.utils.parseEther("200"),
  };

  await signer.sendTransaction(tx);

  const balance = await wavax.balanceOf(await wavax.signer.getAddress());
  console.log("Balance : ", utils.formatEther(balance));

  // await wavax.approve(javax.address, balance);
  // console.log("Approved");

  // await javax.mintNative({ value: balance });
  // console.log("Minted");

  // let javaxbalance = await javax.balanceOf(signer.address);
  // console.log(ethers.utils.formatEther(javaxbalance));

  await wavax.transfer(flash.address, balance);

  // let javaxbalancecontract = await javax.balanceOf(flash.address);
  // console.log(ethers.utils.formatEther(javaxbalancecontract));

  await flash.doFlashloan(jUSDC_address, utils.parseEther("500"));

  console.log("Yooooooo ca a marché");
};

main();
