// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleFaucet {
  // Mapping to track if an address has claimed ETH
  mapping(address => bool) public hasClaimed;

  // Ether to be dispensed (10 ETH in 18 decimals)
  uint256 public constant AMOUNT = 10 ether;

  // Only allow each address to claim once
  modifier onlyOnce() {
    require(!hasClaimed[msg.sender], "Already claimed");
    _;
  }

  // Function to claim ETH
  function claim() external onlyOnce {
    require(address(this).balance >= AMOUNT, "Insufficient faucet balance");

    // Mark address as having claimed
    hasClaimed[msg.sender] = true;

    // Transfer 10 ETH to the claimant
    payable(msg.sender).transfer(AMOUNT);
  }

  // Function to deposit ETH into the faucet
  function deposit() external payable { }

  // Fallback function to accept ETH deposits
  receive() external payable { }
}
