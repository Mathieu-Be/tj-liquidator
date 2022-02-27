// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8;

interface XJoe {
    function claim() external;

    function joe() external view returns (address);
}
