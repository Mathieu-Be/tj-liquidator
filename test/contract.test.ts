import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, utils } from "ethers";
import { ethers, network } from "hardhat";
import JoeRouterjson from "../ABI/JoeRouter.json";
import JoeTrollerjson from "../ABI/Joetroller.json";
import JDaijson from "../ABI/JDaiDelegator.json";
import JMIMjson from "../ABI/JMimDelegator.json";
import JWAVAXjson from "../ABI/JAvaxDelegator.json";
import { IERC20, JCollateralCapErc20, JoeLiquidatoor } from "../typechain-types";
import { JoeRouter, Joetroller } from "../typechain-types/from-abis";

const WAVAX_ADDRESS = "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7";
const DAI_ADDRESS = "0xd586e7f844cea2f87f50152665bcbc2c279d8d70";
const MIM_ADDRESS = "0x130966628846bfd36ff31a822705796e8cb8c18d";

let signer: SignerWithAddress;
let wAvax: IERC20;
let dai: IERC20;
let mim: IERC20;
let Liquidatoor: JoeLiquidatoor;
let joeRouter: JoeRouter;
let joeTroller: Joetroller;
let jDAI: JCollateralCapErc20;
let jMIM: JCollateralCapErc20;
let USDCbalance: BigNumber;

describe("Contract Tests", function () {
  before(async function () {
    signer = await ethers.getSigner("0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097");
    wAvax = await ethers.getContractAt("IERC20", WAVAX_ADDRESS, signer);
    dai = await ethers.getContractAt("IERC20", DAI_ADDRESS, signer);
    mim = await ethers.getContractAt("IERC20", MIM_ADDRESS, signer);
    const Liquidatoor_factory = await ethers.getContractFactory("JoeLiquidatoor", signer);
    Liquidatoor = await Liquidatoor_factory.deploy(
      JoeTrollerjson.address,
      JoeRouterjson.address,
      "0x57319d41F71E81F3c65F2a47CA4e001EbAFd4F33", //xJoe
      "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7" //wAvax
    );

    joeRouter = (await ethers.getContractAt(JoeRouterjson.abi, JoeRouterjson.address, signer)) as JoeRouter;
    joeTroller = (await ethers.getContractAt(JoeTrollerjson.abi, JoeTrollerjson.address, signer)) as Joetroller;
    jDAI = (await ethers.getContractAt(JDaijson.abi, JDaijson.address, signer)) as JCollateralCapErc20;
    jMIM = (await ethers.getContractAt(JMIMjson.abi, JMIMjson.address, signer)) as JCollateralCapErc20;

    const lastblock = await signer.provider.getBlock("latest");

    await joeRouter.swapExactAVAXForTokens(0, [WAVAX_ADDRESS, DAI_ADDRESS], signer.address, lastblock.timestamp + 10, {
      value: utils.parseEther("500"),
    });

    USDCbalance = await dai.balanceOf(signer.address);

    await dai.approve(jDAI.address, USDCbalance);
    await jDAI.mint(USDCbalance);

    await joeTroller.enterMarkets([jDAI.address]);

    await jMIM.borrow(USDCbalance.mul(80).div(100)); // Collateral Factor 80%
  });

  describe("Constructor", function () {
    it("Should set the maximal allowance for wAvax from owner", async function () {
      const allowance = await wAvax.allowance(Liquidatoor.address, signer.address);
      expect(allowance).to.be.gt(0);
    });
  });

  describe("Liquidation", function () {
    it("Should fail if the account is not underwater", async function () {
      await expect(
        Liquidatoor.doFlashloan(
          signer.address,
          jMIM.address,
          jDAI.address,
          JWAVAXjson.address,
          USDCbalance.mul(80).div(100).div(2) // 50% of the borrowed MIM
        )
      ).to.be.revertedWith("Account not underwater");
    });

    it("Should liquidate the underwater account", async function () {
      // Low APY on DAI and high negative APY on MIM alows me to be underwater when time passes
      await network.provider.send("evm_increaseTime", [60 * 60 * 24 * 10]); // 10 day
      await jDAI.accrueInterest();
      await jMIM.accrueInterest();
      const liquidity = await joeTroller.getAccountLiquidity(signer.address);

      //Account should be underwater
      expect(liquidity[1]).to.be.eq(0);
      expect(liquidity[2]).to.be.gt(0);

      await expect(
        Liquidatoor.doFlashloan(
          signer.address,
          jMIM.address,
          jDAI.address,
          JWAVAXjson.address,
          USDCbalance.mul(80).div(100).div(2) // 50% of the borrowed MIM
        )
      ).to.emit(Liquidatoor, "Liquidation");

      // I should have earned some juicy wAvax
      expect(await wAvax.balanceOf(Liquidatoor.address)).to.be.gt(0);
    });
  });
});
