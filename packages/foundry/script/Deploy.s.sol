//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { MockUSDC } from "../contracts/MockUSDC.sol";
import { MockNFT } from "../contracts/MockNFT.sol";
import { SimpleMint } from "../contracts/SimpleMint.sol";
import { SimpleMintNFT } from "../contracts/SimpleMintNFT.sol";
import { Marketplace } from "../contracts/Marketplace.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  uint256 AVALANCHE_FUJI_CHAIN_ID = 43113;
  uint256 POLYGON_AMOY_CHAIN_ID = 80002;
  uint256 LOCAL_CHAIN_ID = 31337;
  address usdcOnAvalancheFuji = 0x5425890298aed601595a70AB815c96711a31Bc65;
  address usdcOnPolygonAmoy = 0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582;

  error InvalidPrivateKey(string);

  function run() external {
    uint256 deployerPrivateKey = setupLocalhostEnv();
    if (deployerPrivateKey == 0) {
      revert InvalidPrivateKey(
        "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
      );
    }
    vm.startBroadcast(deployerPrivateKey);

    SimpleMint simpleMint = new SimpleMint();
    console.logString(
      string.concat(
        "SimpleMint deployed at: ", vm.toString(address(simpleMint))
      )
    );

    MockNFT mockNFT = new MockNFT();
    console.logString(
      string.concat("MockNFT deployed at: ", vm.toString(address(mockNFT)))
    );

    if (block.chainid == AVALANCHE_FUJI_CHAIN_ID) {
      Marketplace marketplace = new Marketplace(usdcOnAvalancheFuji);
      console.logString(
        string.concat(
          "Marketplace deployed at: ", vm.toString(address(marketplace))
        )
      );
    } else if (block.chainid == POLYGON_AMOY_CHAIN_ID) {
      Marketplace marketplace = new Marketplace(usdcOnPolygonAmoy);
      console.logString(
        string.concat(
          "Marketplace deployed at: ", vm.toString(address(marketplace))
        )
      );
    } else if (block.chainid == LOCAL_CHAIN_ID) {
      MockUSDC localUSDC = new MockUSDC();
      console.logString(
        string.concat(
          "Local USDC (MockUSDC) deployed at: ", vm.toString(address(localUSDC))
        )
      );
      Marketplace marketplace = new Marketplace(address(localUSDC));
      console.logString(
        string.concat(
          "Marketplace deployed at: ", vm.toString(address(marketplace))
        )
      );
    }

    vm.stopBroadcast();

    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }

  function test() public { }
}
