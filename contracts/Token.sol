// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Token is ERC20, Ownable {
    // Initialize contract with 1 million tokens minted to the creator of the contract
    constructor() ERC20("Token", "TKN") Ownable(msg.sender){
      _mint(owner(), 1000000 * 10 ** decimals());
    }
}