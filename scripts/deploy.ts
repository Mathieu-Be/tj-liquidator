import dotenv from "dotenv";
import { ethers } from "hardhat";
import { exit } from "process";
import { connectToDatabase, collections } from "../services/database.service";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
dotenv.config();

const main = async () => {
  await connectToDatabase();
  // const provider = new ethers.providers.WebSocketProvider(process.env.RPC_WEBSOCKET_URL);
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_HTTP_URL);

  const bot = new ethers.Wallet(
    (
      await collections.bots.findOne({
        name: "TJliquidator",
      })
    ).private_key,
    provider
  );

  const Liquidatoor_factory = await ethers.getContractFactory("JoeLiquidatoor", bot);
  const Liquidatoor = await Liquidatoor_factory.deploy(
    JoeTrollerjson.address,
    JoeRouterjson.address,
    "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", //xJoe
    "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //wAvax
  );

  console.log("Contract deployed on : " + Liquidatoor.address);

  await collections.contracts.insertOne({
    name: "TJliquidator",
    address: Liquidatoor.address,
  });
  exit(0);
};

main();
