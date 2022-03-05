// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8;

interface XJoe {
    function leave(uint256 share) external;

    function joe() external view returns (address);

    function balanceOf(address account) external view returns (uint256);
}
