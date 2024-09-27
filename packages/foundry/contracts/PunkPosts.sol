// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// NFTs with programmable royalties.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
// import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract PunkPosts is ERC721, ERC721Enumerable, ERC721URIStorage {
  uint256 private _tokenIds; // Replaces the Counters.Counter

  mapping(uint256 => address) public postIdToUser;
  mapping(address => uint256[]) public userToPostsId;

  event PostCreated(address user, string tokenURI);
  event PostDeleted(address user, uint256 postId);

  // bytes32 public constant TYPEHASH = keccak256("createPost(string,address)");

  constructor() ERC721("PunkPosts", "PP") { }

  // Function to start a collection by the user
  function createPost(
    string memory _tokenURI
  ) public returns (bool) {
    postIdToUser[_tokenIds] = msg.sender;
    userToPostsId[msg.sender].push(_tokenIds);

    // Add nonce to prevent replay?

    _tokenIds++;
    uint256 id = _tokenIds;

    _mint(msg.sender, id);
    _setTokenURI(id, _tokenURI);

    emit PostCreated(msg.sender, _tokenURI);

    return true;
  }

  function deletePost(
    uint256 _postId
  ) public returns (bool) {
    require(
      postIdToUser[_postId] == msg.sender,
      "PunkPosts: Not the owner of the post"
    );

    _burn(_postId);

    emit PostDeleted(msg.sender, _postId);

    return true;
  }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function tokenIdCounter() public view returns (uint256) {
    return _tokenIds;
  }

  // The following functions are overrides required by Solidity.

  function supportsInterface(
    bytes4 interfaceId
  )
    public
    view
    override(ERC721, ERC721Enumerable, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _update(
    address to,
    uint256 tokenId,
    address auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(
    address account,
    uint128 value
  ) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }
}
