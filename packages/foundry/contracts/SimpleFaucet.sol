// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error FailedToTransfer();

contract SimpleFaucet {
  // Mapping to track if an address has claimed ETH
  mapping(address => bool) public hasClaimed;

  // Ether to be dispensed (10 USDC in 18 decimals)
  uint256 public constant AMOUNT = 10 * 1e6;
  // uint256 public constant AMOUNT = 0.01 ether;
  IERC20 public mockUSDC;

  constructor(
    address _mockUSDC
  ) {
    mockUSDC = IERC20(_mockUSDC);
  }

  // Only allow each address to claim once
  modifier onlyOnce() {
    require(!hasClaimed[msg.sender], "Already claimed");
    _;
  }

  // Function to claim ETH
  function claim() external onlyOnce {
    require(
      mockUSDC.balanceOf(address(this)) >= AMOUNT, "Insufficient faucet balance"
    );

    // Mark address as having claimed
    hasClaimed[msg.sender] = true;

    // Transfer 10 USDC to the claimant
    // payable(msg.sender).transfer(AMOUNT);
    mockUSDC.transfer(msg.sender, AMOUNT);
  }

  // Function to deposit ETH into the faucet
  function deposit() external payable { }

  function transfer(
    address receiver
  ) public payable {
    (bool sent,) = payable(receiver).call{ value: msg.value }("");
    if (!sent) revert FailedToTransfer();
  }

  // Fallback function to accept ETH deposits
  receive() external payable { }
}
