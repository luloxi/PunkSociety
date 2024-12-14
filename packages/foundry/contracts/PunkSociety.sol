// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { PunkProfile } from "./PunkProfile.sol";
import { PunkPosts } from "./PunkPosts.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
// import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

struct Comment {
  address user;
  string text;
  uint256 index;
}

contract PunkSociety is Ownable {
  /*//////////////////////////////////////////////////////////////
                                    EVENTS
  //////////////////////////////////////////////////////////////*/

  event PostCreated(
    uint256 indexed postId,
    address indexed user,
    string tokenURI,
    uint256 timestamp
  );
  event PostDeleted(uint256 indexed postId, uint256 timestamp);
  event PostLiked(
    uint256 indexed postID, address indexed user, uint256 timestamp
  );
  event PostUnliked(
    uint256 indexed postID, address indexed user, uint256 timestamp
  );
  event PostCommented(
    uint256 indexed postID,
    address indexed user,
    string text,
    uint256 index,
    uint256 timestamp
  );
  event PostCommentDeleted(
    uint256 indexed postID, address indexed user, uint256 timestamp
  );
  event PostShared(
    uint256 indexed postID, address indexed user, uint256 timestamp
  );
  event PostUnshared(
    uint256 indexed postID, address indexed user, uint256 timestamp
  );
  event UserFollowed(
    address indexed user, address indexed follower, uint256 timestamp
  );
  event UserUnfollowed(
    address indexed user, address indexed follower, uint256 timestamp
  );
  event FollowerRemoved(
    address indexed user, address indexed follower, uint256 timestamp
  );

  /*//////////////////////////////////////////////////////////////
                                STATE VARIABLES
  //////////////////////////////////////////////////////////////*/

  uint256 public postIds;
  PunkProfile public punkProfile;
  PunkPosts public punkPosts;
  IERC20 public mockUSDC;

  mapping(uint256 => address) public postIdToUser;
  mapping(address => uint256[]) public userPosts;

  // Likes
  mapping(uint256 post => uint256 likes) public postToLikes;
  mapping(address user => mapping(uint256 post => bool liked)) public
    userToPostLikes;

  // Comments
  mapping(uint256 postId => Comment[]) public postToComments;
  mapping(uint256 postId => mapping(uint256 commentId => address user)) public
    postCommentToUser;

  // Shared
  mapping(address user => uint256[] sharedPosts) public userToSharedPosts;
  mapping(address user => mapping(uint256 post => uint256 index)) public
    userToSharedPostIndex;

  // Following and Followers
  mapping(address user => mapping(address follower => bool isFollowing)) public
    userToFollowing;
  mapping(address user => mapping(address follower => bool isFollower)) public
    userToFollowers;

  /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR FUNCTION
  //////////////////////////////////////////////////////////////*/

  constructor(
    address _punkProfile,
    address _punkPosts,
    address _mockUSDC
  ) Ownable(msg.sender) {
    punkProfile = PunkProfile(_punkProfile);
    punkPosts = PunkPosts(_punkPosts);
    mockUSDC = IERC20(_mockUSDC);
  }

  /*//////////////////////////////////////////////////////////////
                            EXTERNAL FUNCTIONS
   //////////////////////////////////////////////////////////////*/

  function createPost(
    string memory _tokenURI
  ) public payable {
    // require(msg.value == 3 ether, "Must send 3 USDC to create a post");
    uint256 postId = postIds++;
    postIdToUser[postId] = msg.sender;
    userPosts[msg.sender].push(postId);

    mockUSDC.transferFrom(msg.sender, owner(), 3 * 1e6);
    punkPosts.mint(_tokenURI);
    // payable(owner()).transfer(3 ether);

    emit PostCreated(postId, msg.sender, _tokenURI, block.timestamp);
  }

  function deletePost(
    uint256 _postId
  ) public {
    require(postIdToUser[_postId] == msg.sender, "Not the owner of the post");

    punkPosts.burn(_postId);

    emit PostDeleted(_postId, block.timestamp);
  }

  function likePost(
    uint256 _postID
  ) public payable {
    _requirePostExists(_postID);
    require(
      !userToPostLikes[msg.sender][_postID], "You have already liked this post"
    );
    // require(msg.value == 1 ether, "Must send 1 USDC to like a post");

    address postOwner = postIdToUser[_postID];
    require(postOwner != address(0), "Post owner does not exist");

    userToPostLikes[msg.sender][_postID] = true;
    postToLikes[_postID]++;

    // Transfer 1 USDC to the post owner
    // (bool sent,) = postOwner.call{ value: 1 ether }("");
    // require(sent, "Failed to send USDC to the post owner");

    emit PostLiked(_postID, msg.sender, block.timestamp);
  }

  function unlikePost(
    uint256 _postID
  ) public payable {
    _requirePostExists(_postID);
    require(
      userToPostLikes[msg.sender][_postID], "You have not liked this post yet"
    );
    // require(msg.value == 0.5 ether, "Must send 0.5 USDC to unlike a post");

    address postOwner = postIdToUser[_postID];
    require(postOwner != address(0), "Post owner does not exist");

    userToPostLikes[msg.sender][_postID] = false;
    postToLikes[_postID]--;

    // Transfer 0.5 USDC to the post owner
    // (bool sent,) = postOwner.call{ value: 0.5 ether }("");
    // require(sent, "Failed to send USDC to the post owner");

    emit PostUnliked(_postID, msg.sender, block.timestamp);
  }

  function commentOnPost(uint256 _postID, string memory _text) public {
    _requirePostExists(_postID);
    // set max length at 250 characters
    require(
      bytes(_text).length <= 250, "Comment must be less than 250 characters"
    );
    uint256 commentIndex = postToComments[_postID].length;
    postToComments[_postID].push(Comment(msg.sender, _text, commentIndex));
    emit PostCommented(
      _postID, msg.sender, _text, commentIndex, block.timestamp
    );
  }

  function deleteComment(uint256 _postID, uint256 _commentID) public {
    _requirePostExists(_postID);
    require(
      postCommentToUser[_postID][_commentID] == msg.sender,
      "You can't erase what you didn't post!"
    );
    delete postCommentToUser[_postID][_commentID];
    delete postToComments[_postID][_commentID];
    emit PostCommentDeleted(_postID, msg.sender, block.timestamp);
  }

  function sharePost(
    uint256 _postID
  ) public {
    _requirePostExists(_postID);
    userToSharedPosts[msg.sender].push(_postID);
    // userToSharedPostIndex[msg.sender][_postID] =
    //   userToSharedPosts[msg.sender].length - 1;
    emit PostShared(_postID, msg.sender, block.timestamp);
  }

  function deleteSharedPost(
    uint256 _postID
  ) public {
    _requirePostExists(_postID);

    // Retrieve the index of the post to be deleted
    uint256 index = userToSharedPostIndex[msg.sender][_postID];

    // Set the post to a default value (e.g., 0)
    userToSharedPosts[msg.sender][index] = 0;

    // Delete the index entry for the deleted post
    delete userToSharedPostIndex[msg.sender][_postID];

    // Emit the PostUnshared event
    emit PostUnshared(_postID, msg.sender, block.timestamp);
  }

  function followUser(
    address _userAddress
  ) public {
    require(_userAddress != msg.sender, "Cannot follow yourself");
    require(
      !userToFollowing[msg.sender][_userAddress], "Already following this user"
    );

    userToFollowing[msg.sender][_userAddress] = true;
    userToFollowers[_userAddress][msg.sender] = true;
    emit UserFollowed(_userAddress, msg.sender, block.timestamp);
  }

  function unfollowUser(
    address _userAddress
  ) public {
    require(
      userToFollowing[msg.sender][_userAddress], "Not following this user"
    );

    userToFollowing[msg.sender][_userAddress] = false;
    userToFollowers[_userAddress][msg.sender] = false;
    emit UserUnfollowed(_userAddress, msg.sender, block.timestamp);
  }

  function removeFollower(
    address _followerAddress
  ) public {
    require(userToFollowers[msg.sender][_followerAddress], "Not a follower");

    userToFollowers[msg.sender][_followerAddress] = false;
    userToFollowing[_followerAddress][msg.sender] = false;
    emit FollowerRemoved(msg.sender, _followerAddress, block.timestamp);
  }

  /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
  //////////////////////////////////////////////////////////////*/

  function _requirePostExists(
    uint256 _postID
  ) internal view {
    require(punkPosts.tokenId() >= _postID, "Post does not exist");
  }
}
