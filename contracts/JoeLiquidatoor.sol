// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/traderjoe/ERC3156FlashBorrowerInterface.sol";
import "./interfaces/traderjoe/JCollateralCapErc20.sol";
import "./interfaces/traderjoe/JTokenInterface.sol";
import "./interfaces/traderjoe/Joetroller.sol";
import "./interfaces/traderjoe/JoeRouter02.sol";

import "hardhat/console.sol";

contract JoeLiquidatoor is ERC3156FlashBorrowerInterface {
    /**
     * @notice Joetroller address
     */
    address public joetroller;

    constructor(address _joetroller) {
        joetroller = _joetroller;
    }

    function doFlashloan(address flashloanLender, uint256 borrowAmount)
        external
    {
        console.log("Debut flashloan", flashloanLender);
        bytes memory data = abi.encode(borrowAmount);
        JCollateralCapErc20(flashloanLender).flashLoan(
            this,
            address(this),
            borrowAmount,
            data
        );
    }

    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        console.log("Debut onflashloan");
        require(
            Joetroller(joetroller).markets(msg.sender).isListed,
            "untrusted message sender"
        );
        require(
            initiator == address(this),
            "FlashBorrower: Untrusted loan initiator"
        );
        uint256 borrowAmount = abi.decode(data, (uint256));
        // require(
        //     borrowToken == token,
        //     "encoded data (borrowToken) does not match"
        // );
        require(
            borrowAmount == amount,
            "encoded data (borrowAmount) does not match"
        );

        console.log("Debut approve");
        IERC20(token).approve(msg.sender, amount + fee);
        uint256 b = IERC20(token).balanceOf(address(this));
        require(b >= amount + fee, "insuficient balance");

        return keccak256("ERC3156FlashBorrowerInterface.onFlashLoan");
    }
}
