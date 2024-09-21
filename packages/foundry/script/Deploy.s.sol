//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { MockUSDC } from "../contracts/MockUSDC.sol";
import { MockNFT } from "../contracts/MockNFT.sol";
import { SimpleMint } from "../contracts/SimpleMint.sol";
import { SimpleMintNFT } from "../contracts/SimpleMintNFT.sol";
import { Marketplace } from "../contracts/Marketplace.sol";
import { ProfileInfo } from "../contracts/ProfileInfo.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  uint256 AVALANCHE_FUJI_CHAIN_ID = 43113;
  uint256 POLYGON_AMOY_CHAIN_ID = 80002;
  uint256 LOCAL_CHAIN_ID = 31337;
  address usdcOnAvalancheFuji = 0x5425890298aed601595a70AB815c96711a31Bc65;
  address usdcOnPolygonAmoy = 0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582;

  SimpleMint simpleMint;
  MockNFT mockNFT;
  Marketplace marketplace;
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

    profileInfo = new ProfileInfo();
    console.logString(
      string.concat(
        "ProfileInfo deployed at: ", vm.toString(address(profileInfo))
      )
    );

    simpleMint = new SimpleMint();
    console.logString(
      string.concat(
        "SimpleMint deployed at: ", vm.toString(address(simpleMint))
      )
    );

    mockNFT = new MockNFT();
    console.logString(
      string.concat("MockNFT deployed at: ", vm.toString(address(mockNFT)))
    );

    if (block.chainid == AVALANCHE_FUJI_CHAIN_ID) {
      marketplace = new Marketplace(usdcOnAvalancheFuji);
      console.logString(
        string.concat(
          "Marketplace deployed at: ", vm.toString(address(marketplace))
        )
      );
    } else if (block.chainid == POLYGON_AMOY_CHAIN_ID) {
      marketplace = new Marketplace(usdcOnPolygonAmoy);
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
      marketplace = new Marketplace(address(localUSDC));
      console.logString(
        string.concat(
          "Marketplace deployed at: ", vm.toString(address(marketplace))
        )
      );
      // Populate the marketplace with some initial NFTs
      mintInitialMarketplaceNFTs();
    }

    vm.stopBroadcast();

    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }

  function mintInitialMarketplaceNFTs() internal {
    mockNFT.mintItem(
      "https://ipfs.io/ipfs/Qmeh4aKV1DVBm324MFnKzUgmz74ZYFJPj77bZzsGoLjBaj"
    );
    mockNFT.approve(address(marketplace), 1);
    mockNFT.mintItem(
      "https://ipfs.io/ipfs/QmWgTmATX7weXVyimHkjaY7MJJro8ZM2mU6n4KrGt1yQgE"
    );
    mockNFT.approve(address(marketplace), 2);
    mockNFT.mintItem(
      "https://ipfs.io/ipfs/QmTy34vycaA6by2D5VadtqTazhg9pKa5ZAwpnnX7ust4qs"
    );
    mockNFT.approve(address(marketplace), 3);
    mockNFT.mintItem(
      "https://ipfs.io/ipfs/QmVxLz4mmP9uY4P3fbi88mpemWcAvnZYX8sbqKGk88x5YP"
    );
    mockNFT.approve(address(marketplace), 4);
    simpleMint.startCollection(
      "Vaquita en el Monte",
      "VM",
      "https://ipfs.io/ipfs/QmWRssgjvrkyoSwWspzxrHfU6DTMbdVY2oR6zKgzvtnts2",
      msg.sender,
      3 * 1e6,
      30
    );

    // mockNFT.mintItem(
    //   "https://ipfs.io/ipfs/QmWRssgjvrkyoSwWspzxrHfU6DTMbdVY2oR6zKgzvtnts2"
    // );
    marketplace.createListing(
      address(mockNFT), 1, 15 * 1e6, Marketplace.Currency.USDCToken, false, 0
    );
    marketplace.createListing(
      address(mockNFT), 2, 15 * 1e16, Marketplace.Currency.NativeToken, false, 0
    );
    marketplace.createListing(
      address(mockNFT), 3, 5 * 1e6, Marketplace.Currency.USDCToken, false, 0
    );
    marketplace.createListing(
      address(mockNFT), 4, 5 * 1e16, Marketplace.Currency.NativeToken, false, 0
    );
  }

  function test() public { }
}
