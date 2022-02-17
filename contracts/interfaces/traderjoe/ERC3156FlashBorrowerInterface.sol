// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8;

interface ERC3156FlashBorrowerInterface {
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);
}
