//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { PunkPosts } from "../contracts/PunkPosts.sol";
import { PunkProfile } from "../contracts/PunkProfile.sol";
import { PunkSociety } from "../contracts/PunkSociety.sol";
import { SimpleFaucet } from "../contracts/SimpleFaucet.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  uint256 LOCAL_CHAIN_ID = 31337;

  PunkPosts punkPosts;
  PunkProfile punkProfile;
  PunkSociety punkSociety;

  SimpleFaucet simpleFaucet;

  error InvalidPrivateKey(string);

  function run() external {
    uint256 deployerPrivateKey = setupLocalhostEnv();
    if (deployerPrivateKey == 0) {
      revert InvalidPrivateKey(
        "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
      );
    }
    vm.startBroadcast(deployerPrivateKey);

    // Deploying just to get the ABI from the frontend
    punkPosts = new PunkPosts();
    console.logString(
      string.concat("PunkPosts deployed at: ", vm.toString(address(punkPosts)))
    );

    punkProfile = new PunkProfile();
    console.logString(
      string.concat(
        "PunkProfile deployed at: ", vm.toString(address(punkProfile))
      )
    );

    punkSociety = new PunkSociety(address(punkProfile), address(punkPosts));
    console.logString(
      string.concat(
        "PunkSociety deployed at: ", vm.toString(address(punkSociety))
      )
    );

    punkPosts.transferOwnership(address(punkSociety));
    console.logString(
      string.concat(
        "PunkPosts ownership transferred to: ",
        vm.toString(address(punkSociety))
      )
    );

    simpleFaucet = new SimpleFaucet();
    console.logString(
      string.concat(
        "SimpleFaucet deployed at: ", vm.toString(address(simpleFaucet))
      )
    );

    // Transfer 5000 USDC to the simpleFaucet
    // payable(address(simpleFaucet)).transfer(5000 * 1e18);
    // payable(address(simpleFaucet)).transfer(0.5 * 1e18);
    // console.logString("5000 USDC transferred to SimpleFaucet");

    if (block.chainid == LOCAL_CHAIN_ID) { }

    vm.stopBroadcast();

    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }
}
