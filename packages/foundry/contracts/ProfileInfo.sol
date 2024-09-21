// SPDX-License-Identifier:MIT
pragma solidity 0.8.26;

contract ProfileInfo {
  struct Profile {
    string name;
    string bio;
    string imageURL;
    string website;
  }

  mapping(address => Profile) public profiles;

  function setProfile(
    string memory _name,
    string memory _bio,
    string memory _imageURL,
    string memory _website
  ) public {
    profiles[msg.sender] = Profile(_name, _bio, _imageURL, _website);
  }
}
