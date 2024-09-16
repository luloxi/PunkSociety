// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// NFTs with programmable royalties.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MockNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
  //this lets you look up a token by the uri (assuming there is only one of each uri)
  mapping(string => uint256) public uriToTokenId;

  uint256 private _tokenIds; // Replaces the Counters.Counter

  constructor() ERC721("YourCollectible", "YC") { }

  function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
  }

  // The following functions are overrides required
  //   function _burn(uint256 tokenId) internal override(ERC721) {
  //     super._burn(tokenId);
  //   }

  function tokenURI(
    uint256 tokenId
  ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

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

  // The following functions are overrides required by Solidity.

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

  // Mint an NFT
  function mintItem(
    string memory _tokenURI
  ) public returns (bool) {
    _tokenIds++; // Increment the token ID manually
    uint256 id = _tokenIds;

    _mint(msg.sender, id);
    _setTokenURI(id, _tokenURI);

    uriToTokenId[_tokenURI] = id;

    return true;
  }

  function tokenIdCounter() public view returns (uint256) {
    return _tokenIds;
  }
}
