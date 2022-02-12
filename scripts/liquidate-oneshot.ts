import { Signer } from "ethers";
import { Interface } from "ethers/lib/utils";
import { ethers } from "hardhat";

import JUsdcDelegator from "../ABI/JUsdcDelegator.json";

const jUSDC_address = ethers.utils.getAddress(JUsdcDelegator.address);
const jUSDC_interfacte = new Interface(JUsdcDelegator.abi);

export async function main(signer: Signer) {}
