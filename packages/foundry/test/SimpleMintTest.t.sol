// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Test, console } from "forge-std/Test.sol";
import { SimpleMint } from "../contracts/SimpleMint.sol";
import { SimpleMintNFT } from "../contracts/SimpleMintNFT.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract SimpleMintTest is Test {
  SimpleMint public simpleMint;
  SimpleMintNFT public simpleMintNFT;

  // NFT building helpers
  string NAME = "Song Number Two";
  string SYMBOL = "SONG2";
  string TOKEN_URI = "QmTokenUri";
  uint256 USD_PRICE = 10;
  uint256 MAX_TOKEN_ID = 10;

  // Variables for testing the EIP-712 signature
  address ARTIST_ADDRESS;
  uint256 PRIVATE_KEY;
  address gasPayer;

  function setUp() public {
    // Address that will pay for the gas of the signer
    gasPayer = makeAddr("gasPayer");
    // Generate address and private key for signing
    (ARTIST_ADDRESS, PRIVATE_KEY) = makeAddrAndKey("artist");
    // Deploy the SimpleMint contract
    simpleMint = new SimpleMint();
  }

  function testStartCollection() public {
    // Start a collection
    address newCollection = simpleMint.startCollection(
      NAME, SYMBOL, TOKEN_URI, ARTIST_ADDRESS, USD_PRICE, MAX_TOKEN_ID
    );
    // Check that the collection was started
    SimpleMintNFT newCollectionInstance = SimpleMintNFT(newCollection);
    string memory completeTokenURI =
      string(abi.encodePacked("https://ipfs.io/ipfs/", TOKEN_URI));

    assertEq(newCollectionInstance.name(), NAME);
    assertEq(newCollectionInstance.symbol(), SYMBOL);
    assertEq(newCollectionInstance.tokenURI(0), completeTokenURI);
    assertEq(newCollectionInstance.artist(), ARTIST_ADDRESS);
  }

  function testArtistCanSignCollectionAndSomeoneElsePaysTheGas() public {
    vm.startPrank(ARTIST_ADDRESS);
    // Sign the message containing the collection metadata with the artist's private key
    (uint8 v, bytes32 r, bytes32 s) = signMessage();
    vm.stopPrank();

    // Prank the gas payer
    vm.prank(gasPayer);
    bytes memory signature = abi.encodePacked(r, s, v);
    address newCollection = simpleMint.startCollectionBySig(
      NAME,
      SYMBOL,
      TOKEN_URI,
      ARTIST_ADDRESS,
      USD_PRICE,
      MAX_TOKEN_ID,
      signature
    );

    // Assert the collection has been correctly initialized
    SimpleMintNFT newCollectionInstance = SimpleMintNFT(newCollection);
    string memory completeTokenURI =
      string(abi.encodePacked("https://ipfs.io/ipfs/", TOKEN_URI));

    assertEq(newCollectionInstance.name(), NAME);
    assertEq(newCollectionInstance.symbol(), SYMBOL);
    assertEq(newCollectionInstance.tokenURI(0), completeTokenURI);
    assertEq(newCollectionInstance.artist(), ARTIST_ADDRESS);
  }

  function signMessage() internal view returns (uint8 v, bytes32 r, bytes32 s) {
    // Reproduce the domain separator from the contract
    bytes32 domainSeparator = keccak256(
      abi.encode(
        keccak256(
          "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
        ),
        keccak256(bytes("SimpleMint")),
        keccak256(bytes("1.0.0")),
        block.chainid, // Ensure this matches the chain ID in the test
        address(simpleMint) // The contract's address
      )
    );

    // Reproduce the struct hash from the contract
    bytes32 structHash = keccak256(
      abi.encode(simpleMint.TYPEHASH(), NAME, SYMBOL, TOKEN_URI, ARTIST_ADDRESS)
    );

    bytes32 hashedMessage =
      keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));

    (v, r, s) = vm.sign(PRIVATE_KEY, hashedMessage);
  }
}
