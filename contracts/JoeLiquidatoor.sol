// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./interfaces/traderjoe/ERC3156FlashBorrowerInterface.sol";
import "./interfaces/traderjoe/JCollateralCapErc20.sol";
import "./interfaces/traderjoe/JTokenInterface.sol";
import "./interfaces/traderjoe/Joetroller.sol";
import "./interfaces/traderjoe/JoeRouter02.sol";
import "./interfaces/traderjoe/xJoe.sol";

contract JoeLiquidatoor is ERC3156FlashBorrowerInterface {
    Joetroller joetroller;
    JoeRouter02 joerouter;
    XJoe xjoe;
    address wavax;

    constructor(
        Joetroller _joetroller,
        JoeRouter02 _joerouter,
        XJoe _xjoe,
        address _wavax
    ) {
        joetroller = _joetroller;
        joerouter = _joerouter;
        xjoe = _xjoe;
        wavax = _wavax;

        IERC20(wavax).approve(address(joerouter), type(uint256).max);
        IERC20(wavax).approve(address(msg.sender), type(uint256).max);
    }

    event Liquidation(address target);

    function liquidate(
        address liquidationTarget,
        JCollateralCapErc20 borrowJToken,
        JCollateralCapErc20 collateralJToken,
        JCollateralCapErc20 flashloanJToken,
        uint256 repayAmount
    ) external {
        // First of all the account liquidity is checked to avoid wasting gas if the liquidation is meant to fail
        (, , uint256 debt) = joetroller.getAccountLiquidity(liquidationTarget);
        require(debt > 0, "Account not underwater");

        // Calculation of the amount that needs to be flashloaned
        // wAvax is used inbetween for simplification purpose, some swaps between stablecoins could be done directly
        address[] memory path;
        if (
            flashloanJToken.underlying() == wavax ||
            borrowJToken.underlying() == wavax
        ) {
            path = new address[](2);
            path[0] = flashloanJToken.underlying();
            path[1] = borrowJToken.underlying();
        } else {
            path = new address[](3);
            path[0] = flashloanJToken.underlying();
            path[1] = wavax;
            path[2] = borrowJToken.underlying();
        }
        uint256 borrowAmount = joerouter.getAmountsIn(repayAmount, path)[0];

        // onFlashloan args encoding
        bytes memory data = abi.encode(
            liquidationTarget,
            borrowJToken,
            collateralJToken,
            repayAmount
        );

        flashloanJToken.flashLoan(
            ERC3156FlashBorrowerInterface(this),
            address(this),
            borrowAmount,
            data
        );
    }

    function onFlashLoan(
        address initiator,
        address flashloan_token,
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

        // Approval to prepare flashloan repay
        IERC20(flashloan_token).approve(msg.sender, amount + fee);

        // onFlashloan args decoding
        (
            address liquidationTarget,
            JCollateralCapErc20 borrowJToken,
            JCollateralCapErc20 collateralJToken,
            uint256 repayAmount
        ) = abi.decode(
                data,
                (address, JCollateralCapErc20, JCollateralCapErc20, uint256)
            );

        address collateral_token = collateralJToken.underlying();
        address borrowed_token = borrowJToken.underlying();

        // Flashloan token swapped to repay borrow
        address[] memory path;
        if (flashloan_token == wavax || borrowed_token == wavax) {
            path = new address[](2);
            path[0] = flashloan_token;
            path[1] = borrowed_token;
        } else {
            path = new address[](3);
            path[0] = flashloan_token;
            path[1] = wavax;
            path[2] = borrowed_token;
        }

        // This could be done once at the initialisation of the contract to save gas
        // I kept it here for simplification purpose
        IERC20(flashloan_token).approve(address(joerouter), amount);

        // flashloan_token is swapped to prepare the borrow repay
        joerouter.swapExactTokensForTokens(
            amount,
            repayAmount,
            path,
            address(this),
            block.timestamp
        );

        // Again this could be done once and for all at contract initialisation for the max amount and for every jToken
        IERC20(borrowed_token).approve(address(borrowJToken), repayAmount);

        // Liquidation
        require(
            borrowJToken.liquidateBorrow(
                liquidationTarget,
                repayAmount,
                JTokenInterface(address(collateralJToken))
            ) == 0,
            "Liquidation error"
        );

        emit Liquidation(liquidationTarget);

        // Seized token swapped to repay flashloan
        collateralJToken.redeem(collateralJToken.balanceOf(address(this)));

        // We can't swap xJoe directly so it is unstaked first
        if (collateral_token == address(xjoe)) {
            xjoe.leave(xjoe.balanceOf(address(this)));
            collateral_token = xjoe.joe();
        }

        uint256 collatbalance = IERC20(collateral_token).balanceOf(
            address(this)
        );

        if (collateral_token == wavax || flashloan_token == wavax) {
            path = new address[](2);
            path[0] = collateral_token;
            path[1] = flashloan_token;
        } else {
            path = new address[](3);
            path[0] = collateral_token;
            path[1] = wavax;
            path[2] = flashloan_token;
        }

        IERC20(collateral_token).approve(address(joerouter), collatbalance);

        // 100% of the seized token is first swapped to wAvax (if necessary)
        // Only the necessary amount is then swapped to repay the flashloan
        uint256 finalswapamountmin = amount + fee;

        // Case collateral = wAvax : one swap
        if (collateral_token == wavax) {
            joerouter.swapTokensForExactTokens(
                finalswapamountmin,
                collatbalance,
                path,
                address(this),
                block.timestamp
            );
        }
        // Case flashloan = wAvax : one swap aswell
        else if (flashloan_token == wavax) {
            joerouter.swapExactTokensForTokens(
                collatbalance,
                finalswapamountmin,
                path,
                address(this),
                block.timestamp
            );
        }
        // Else : Two swaps with different amounts
        else {
            address[] memory path_atomic;
            path_atomic = new address[](2);
            path_atomic[0] = collateral_token;
            path_atomic[1] = wavax;

            joerouter.swapExactTokensForTokens(
                collatbalance,
                0,
                path,
                address(this),
                block.timestamp
            );

            path_atomic[0] = wavax;
            path_atomic[1] = flashloan_token;

            joerouter.swapTokensForExactTokens(
                finalswapamountmin,
                0,
                path,
                address(this),
                block.timestamp
            );
        }

        return keccak256("ERC3156FlashBorrowerInterface.onFlashLoan");
    }
}
