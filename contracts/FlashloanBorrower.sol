// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "./ERC3156FlashLenderInterface.sol";
import "./ERC3156FlashBorrowerInterface.sol";
import "hardhat/console.sol";

interface Comptroller {
    function isMarketListed(address cTokenAddress) external view returns (bool);
}

interface ERC20 {
    function approve(address spender, uint256 amount) external;

    function transfer(address to, uint256 amount) external;

    function balanceOf(address account) external;
}

// FlashloanBorrower is a simple flashloan Borrower implementation for testing
contract FlashloanBorrower is ERC3156FlashBorrowerInterface {
    /**
     * @notice C.R.E.A.M. comptroller address
     */
    address public comptroller;

    constructor(address _comptroller) {
        comptroller = _comptroller;
    }

    function doFlashloan(address flashloanLender, uint256 borrowAmount)
        external
    {
        console.log("Debut flashloan");
        bytes memory data = abi.encode(borrowAmount);
        ERC3156FlashLenderInterface(flashloanLender).flashLoan(
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
            Comptroller(comptroller).isMarketListed(msg.sender),
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
        ERC20(token).approve(msg.sender, amount + fee);

        ERC20(token).transfer(token, amount / 2);

        return keccak256("ERC3156FlashBorrowerInterface.onFlashLoan");
    }
}
