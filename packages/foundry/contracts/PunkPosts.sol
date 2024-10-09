// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NFTs with programmable royalties.

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from
  "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { ERC721URIStorage } from
  "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract PunkPosts is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  uint256 public tokenId; // Replaces the Counters.Counter

  constructor() ERC721("PunkPosts", "PP") Ownable(msg.sender) { }

  function mint(
    string memory _tokenURI
  ) public onlyOwner {
    uint256 postId = tokenId++;
    _mint(msg.sender, postId);
    _setTokenURI(postId, _tokenURI);
  }

  function burn(
    uint256 _postId
  ) public {
    _burn(_postId);
  }

  function tokenURI(
    uint256 _tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(_tokenId);
  }

  // The following functions are overrides required by Solidity.

  function supportsInterface(
    bytes4 _interfaceId
  )
    public
    view
    override(ERC721, ERC721Enumerable, ERC721URIStorage)
    returns (bool)
  {
    return super.supportsInterface(_interfaceId);
  }

  function _update(
    address _to,
    uint256 _tokenId,
    address _auth
  ) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(_to, _tokenId, _auth);
  }

  function _increaseBalance(
    address _account,
    uint128 _value
  ) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(_account, _value);
  }
}
