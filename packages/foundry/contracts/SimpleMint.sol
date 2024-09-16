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
  // mapping(address => uint256) public artistNonces;
  event CollectionStarted(
    address indexed nft,
    address artist,
    string name,
    string symbol,
    string tokenURI
  );

  bytes32 public constant TYPEHASH = keccak256(
    "startCollection(string name,string symbol,string tokenURI,address artist)"
  );

  constructor() EIP712("SimpleMint", "1.0.0") { }

  // Add a nonce to prevent collections being started more than once
  function startCollection(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _artist
  ) public returns (address) {
    SimpleMintNFT nft = new SimpleMintNFT(_name, _symbol, _tokenURI, _artist);
    emit CollectionStarted(address(nft), _artist, _name, _symbol, _tokenURI);
    return address(nft);
  }

  function startCollectionBySig(
    string memory _name,
    string memory _symbol,
    string memory _tokenURI,
    address _artist,
    bytes memory signature
  ) external {
    bytes32 structHash =
      keccak256(abi.encode(TYPEHASH, _name, _symbol, _tokenURI, _artist));
    bytes32 hash = _hashTypedDataV4(structHash);
    address signer = ECDSA.recover(hash, signature);
    require(signer == _artist, "Invalid signature");
    startCollection(_name, _symbol, _tokenURI, _artist);
  }

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
