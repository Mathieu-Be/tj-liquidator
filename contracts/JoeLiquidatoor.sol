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
    Joetroller public joetroller;

    /**
     * @notice Joetroller address
     */
    JoeRouter02 public joerouter;

    constructor(Joetroller _joetroller, JoeRouter02 _joerouter) {
        joetroller = _joetroller;
        joerouter = _joerouter;
    }

    function doFlashloan(
        address liquidationTarget,
        JCollateralCapErc20 borrowJToken,
        JCollateralCapErc20 collateralJToken,
        JCollateralCapErc20 flashloanJToken,
        uint256 repayAmount
    ) external {
        (, , uint256 debt) = joetroller.getAccountLiquidity(liquidationTarget);
        require(debt > 0, "Account not underwater");

        address[] memory path;
        path = new address[](2);
        path[0] = flashloanJToken.underlying();
        path[1] = borrowJToken.underlying();

        uint256 borrowAmount = joerouter.getAmountsOut(repayAmount, path)[
            path.length - 1
        ];

        console.log(borrowAmount);

        // bytes memory data = abi.encode(repayAmount);
        // JCollateralCapErc20(flashloanJToken).flashLoan(
        //     this,
        //     address(this),
        //     repayAmount,
        //     data
        // );
    }

    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        require(
            Joetroller(joetroller).markets(msg.sender).isListed,
            "untrusted message sender"
        );
        require(
            initiator == address(this),
            "FlashBorrower: Untrusted loan initiator"
        );
        uint256 borrowAmount = abi.decode(data, (uint256));
        require(
            borrowAmount == amount,
            "encoded data (borrowAmount) does not match"
        );

        IERC20(token).approve(msg.sender, amount + fee);
        uint256 b = IERC20(token).balanceOf(address(this));
        require(b >= amount + fee, "insuficient balance");

        return keccak256("ERC3156FlashBorrowerInterface.onFlashLoan");
    }
}
