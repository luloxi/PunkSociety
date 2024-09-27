//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { PunkPosts } from "../contracts/PunkPosts.sol";
import { ProfileInfo } from "../contracts/ProfileInfo.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  uint256 SEPOLIA_CHAIN_ID = 11155111;
  uint256 LOCAL_CHAIN_ID = 31337;

  PunkPosts punkPosts;
  ProfileInfo profileInfo;

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

    profileInfo = new ProfileInfo();
    console.logString(
      string.concat(
        "ProfileInfo deployed at: ", vm.toString(address(profileInfo))
      )
    );

    if (block.chainid == LOCAL_CHAIN_ID) {
      // Populate the marketplace with some initial PunkPosts
      // mintInitialMarketplaceNFTs();
    }

    vm.stopBroadcast();

    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }

  function mintInitialMarketplaceNFTs() internal { }

  function test() public { }
}
