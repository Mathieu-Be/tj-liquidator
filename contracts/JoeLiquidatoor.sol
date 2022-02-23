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
        uint256 b = IERC20(address(flashloanJToken.underlying())).balanceOf(
            address(this)
        );
        console.log("Balance WAVAX debut : ", b);

        (, , uint256 debt) = joetroller.getAccountLiquidity(liquidationTarget);
        require(debt > 0, "Account not underwater");

        console.log("Repay Amount : ", repayAmount);

        address[] memory path;
        path = new address[](2);
        path[0] = flashloanJToken.underlying();
        path[1] = borrowJToken.underlying();

        console.log("Path built", path[0], path[1]);

        uint256 borrowAmount = joerouter.getAmountsIn(repayAmount, path)[0];

        console.log("BorrowAmount calculated");
        console.log("WAVAX borrowed : ", borrowAmount);

        bytes memory data = abi.encode(
            liquidationTarget,
            borrowJToken,
            collateralJToken,
            flashloanJToken,
            repayAmount
        );

        console.log("Flashloan started");

        flashloanJToken.flashLoan(
            ERC3156FlashBorrowerInterface(this),
            address(this),
            borrowAmount,
            data
        );

        b = IERC20(address(flashloanJToken.underlying())).balanceOf(
            address(this)
        );
        console.log("Balance WAVAX fin : ", b);
    }

    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        console.log("onFlashLoan triggered");
        require(
            Joetroller(joetroller).markets(msg.sender).isListed,
            "untrusted message sender"
        );
        require(
            initiator == address(this),
            "FlashBorrower: Untrusted loan initiator"
        );

        IERC20(token).approve(msg.sender, amount + fee);

        (
            address liquidationTarget,
            JCollateralCapErc20 borrowJToken,
            JCollateralCapErc20 collateralJToken,
            JCollateralCapErc20 flashloanJToken,
            uint256 repayAmount
        ) = abi.decode(
                data,
                (
                    address,
                    JCollateralCapErc20,
                    JCollateralCapErc20,
                    JCollateralCapErc20,
                    uint256
                )
            );

        address[] memory path;
        path = new address[](2);
        path[0] = flashloanJToken.underlying();
        path[1] = borrowJToken.underlying();

        IERC20(flashloanJToken.underlying()).approve(
            address(joerouter),
            amount
        );

        joerouter.swapExactTokensForTokens(
            amount,
            repayAmount,
            path,
            address(this),
            block.timestamp
        );

        console.log("Swap done");

        IERC20(borrowJToken.underlying()).approve(
            address(borrowJToken),
            repayAmount
        );

        uint256 err = borrowJToken.liquidateBorrow(
            liquidationTarget,
            repayAmount,
            JTokenInterface(address(collateralJToken))
        );

        console.log("Liquidation : ", err);

        collateralJToken.redeem(collateralJToken.balanceOf(address(this)));

        uint256 collatbalance = IERC20(collateralJToken.underlying()).balanceOf(
            address(this)
        );

        console.log("Collat balance :", collatbalance);

        path[0] = collateralJToken.underlying();
        path[1] = flashloanJToken.underlying();

        IERC20(collateralJToken.underlying()).approve(
            address(joerouter),
            collatbalance
        );

        joerouter.swapExactTokensForTokens(
            collatbalance,
            amount,
            path,
            address(this),
            block.timestamp
        );
        console.log("Final swap done");

        uint256 b = IERC20(token).balanceOf(address(this));
        console.log("Balance WAVAX : ", b);

        // require(b >= amount + fee, "insuficient balance");

        return keccak256("ERC3156FlashBorrowerInterface.onFlashLoan");
    }
}
