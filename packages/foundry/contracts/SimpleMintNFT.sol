// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// NFTs with programmable royalties.

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SimpleMintNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    uint256 private _tokenIds; // Replaces the Counters.Counter
    string public collectionTokenURI;
    address public artist;

    constructor(string memory _name, string memory _symbol, string memory _tokenURI, address _artist)
        ERC721(_name, _symbol)
    {
        collectionTokenURI = _tokenURI;
        artist = _artist;
    }

    // Mint an NFT
    function mintItem() public returns (bool) {
        _tokenIds++; // Increment the token ID manually
        uint256 id = _tokenIds;

        _mint(msg.sender, id);
        _setTokenURI(id, collectionTokenURI);

        return true;
    }

    function tokenURI(uint256 /* tokenId */ ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        // return super.tokenURI(tokenId);
        return string(abi.encodePacked("https://ipfs.io/ipfs/", collectionTokenURI));
    }

    function tokenIdCounter() public view returns (uint256) {
        return _tokenIds;
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }
}
