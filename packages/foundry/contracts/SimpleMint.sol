// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { SimpleMintNFT } from "./SimpleMintNFT.sol";

/**
 * @title SimpleMint
 * @author Lulox
 * @notice A contract to enable artists uploading and signing their art, and someone else paying for the gas to mint it on the blockchain
 */
contract SimpleMint is EIP712 {
  address[] public collections;

  event CollectionStarted(
    address indexed nft,
    address artist,
    string name,
    string symbol,
    string tokenURI,
    uint256 usdPrice,
    uint256 maxTokenId
  );

  bytes32 public constant TYPEHASH =
    keccak256("startCollection(string,string,string,address)");

  constructor() EIP712("SimpleMint", "1.0.0") { }

  // Function to start a collection by the artist
  function startCollection(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _artist,
    uint256 _usdPrice,
    uint256 _maxTokenId
  ) public returns (address) {
    // IMPORTANT CHANGE:
    // Add a third function for starting collection from signature
    // Remove artist from parameters and use msg.sender instead
    // Add nonce to prevent replay
    SimpleMintNFT nft = new SimpleMintNFT(
      _name, _symbol, _tokenURI, _artist, _usdPrice, _maxTokenId
    );
    collections.push(address(nft));
    emit CollectionStarted(
      address(nft), _artist, _name, _symbol, _tokenURI, _usdPrice, _maxTokenId
    );
    return address(nft);
  }

  // Function to start a collection by a third party using a signature from the artist
  function startCollectionBySig(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _artist,
    uint256 _usdPrice,
    uint256 _maxTokenId,
    bytes memory signature
  ) external returns (address) {
    // 1. Create a hash of the input data using the provided type hash
    bytes32 structHash =
      keccak256(abi.encode(TYPEHASH, _name, _symbol, _tokenURI, _artist));
    bytes32 hash = _hashTypedDataV4(structHash);

    // 2. Recover the artist's address from the signature
    address signer = ECDSA.recover(hash, signature);

    // 3. Verify that the signer matches the provided artist address
    require(
      signer == _artist, "Invalid signature: signer does not match artist"
    );

    // 4. Start the collection using the verified artist's address
    address collectionInstanceAddress = startCollection(
      _name, _symbol, _tokenURI, _artist, _usdPrice, _maxTokenId
    );

    return collectionInstanceAddress;
  }

  // Helper function to get the message hash for signing
  function getMessageHash(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _artist
  ) public view returns (bytes32) {
    return _hashTypedDataV4(
      keccak256(abi.encode(TYPEHASH, _name, _symbol, _tokenURI, _artist))
    );
  }
}
