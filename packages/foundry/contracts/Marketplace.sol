// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ReentrancyGuard, Ownable {
    // * State
    uint256 private listingIds; // Replaces the Counters.Counter

    enum Currency {
        NativeToken,
        USDCToken
    }

    mapping(uint256 => Listing) public listings;
    mapping(address => Royalties) public royalties; // Royalty information by collection address.

    uint256 private constant BPS = 10000;
    address public immutable USDC;

    // * Structs
    // Single NFT listing
    struct Listing {
        address nftContract;
        uint256 nftId;
        address payable seller;
        uint256 price;
        Currency payableCurrency;
        bool isAuction;
        uint256 date;
        address highestBidder;
    }

    // Royalty Info
    struct Royalties {
        address _nftContract;
        address payoutAccount;
        uint256 royaltyAmount;
        bool exists;
    }

    // * Events
    event ListingCreated(
        uint256 listingId,
        address indexed nftContract,
        uint256 indexed nftId,
        address seller,
        uint256 price,
        Currency payableCurrency,
        bool isAuction,
        uint256 date,
        address highestBidder
    );
    event Purchase(uint256 indexed itemId, address buyer, Currency currency, uint256 price);
    event UpdatedPrice(uint256 indexed itemId, address owner, uint256 price);
    event NewBid(address buyer, Listing listing, uint256 newBid);

    // * Modifiers
    modifier Owned(uint256 listingId) {
        Listing memory item = listings[listingId];
        address ownerOfToken = IERC721(item.nftContract).ownerOf(item.nftId);

        require(ownerOfToken == msg.sender, "You don't own this NFT!");
        _;
    }

    // * Constructor
    constructor(address _usdcAddress) Ownable(msg.sender) {
        USDC = _usdcAddress;
    }

    // * Create Listing
    function createListing(
        address nftContract,
        uint256 nftId,
        uint256 price,
        Currency payableCurrency,
        bool isAuction,
        uint256 biddingTime
    ) public nonReentrant {
        require(price > 0, "Price must be greater than 0.");
        address nftOwner = IERC721(nftContract).ownerOf(nftId);
        require(nftOwner == msg.sender, "You can't sell an NFT you don't own!");
        if (isAuction) {
            require(biddingTime > 0, "Auctions must have a valid date");
        }

        listingIds++; // Increment listing ID
        uint256 itemId = listingIds;
        uint256 auctionDate = block.timestamp + biddingTime;

        listings[itemId] = Listing(
            nftContract, nftId, payable(msg.sender), price, payableCurrency, isAuction, auctionDate, payable(address(0))
        );
        emit ListingCreated(
            itemId, nftContract, nftId, msg.sender, price, payableCurrency, isAuction, auctionDate, address(0)
        );
    }

    // IERC20 buy function
    function buy(uint256 listingId) public payable nonReentrant {
        Listing memory item = listings[listingId];
        address contractAddress = item.nftContract;
        address nftSeller = item.seller;
        uint256 nftId = item.nftId;
        uint256 price = item.price;
        Currency payableCurrency = item.payableCurrency;
        uint256 baseRoyalty = royalties[contractAddress].royaltyAmount;
        address royaltyReceiver = royalties[contractAddress].payoutAccount;
        require(msg.sender != nftSeller, "You cannot buy an NFT you are selling.");
        require(contractAddress != address(0), "Listing does not exist.");
        require(!item.isAuction, "This listing is designated for auction.");

        require(msg.value >= price, "Please submit asking price to complete purchase");

        // Transfer NFT to the buyer
        IERC721(contractAddress).safeTransferFrom(nftSeller, msg.sender, nftId);
        // Transfer sale proceeds to seller, minus royalty
        if (payableCurrency == Currency.USDCToken) {
            bool usdcSuccess = IERC20(USDC).transferFrom(msg.sender, nftSeller, price - ((price * baseRoyalty) / BPS)); // price - royalty
            // Transfer royalty to the royalty receiver
            bool usdcRoyaltiesSuccess =
                IERC20(USDC).transferFrom(msg.sender, royaltyReceiver, (price * baseRoyalty) / BPS); // just royalty
            require(usdcSuccess && usdcRoyaltiesSuccess, "Failed to transfer USDC");
        } else {
            (bool ethSuccess,) = payable(nftSeller).call{value: price - ((price * baseRoyalty) / BPS)}("");
            (bool ethRoyaltiesSuccess,) = payable(royaltyReceiver).call{value: (price * baseRoyalty) / BPS}("");
            require(ethSuccess && ethRoyaltiesSuccess, "Failed to transfer ETH");
        }
        // Mixed payment
        // Implement AggregatorV3Interface to convert the USD value to the native token equivalent value

        emit Purchase(listingId, msg.sender, item.payableCurrency, price);
    }

    // * Get current listing price
    function getPrice(uint256 listingId) public view returns (uint256) {
        return listings[listingId].price;
    }

    // * Update listing price, listing cannot be on auction.
    function updatePrice(uint256 listingId, uint256 newPrice) public Owned(listingId) {
        require(!listings[listingId].isAuction, "Auction starting prices cannot be updated");

        // Set new price
        listings[listingId].price = newPrice;

        emit UpdatedPrice(listingId, msg.sender, newPrice);
    }

    // * New bid and return funds to previous bidder
    function bid(uint256 listingId, uint256 amount) public payable nonReentrant {
        Listing storage listing = listings[listingId];
        uint256 currentBid = listing.price;
        address highestBidder = listing.highestBidder;
        Currency payableCurrency = listing.payableCurrency;
        require(msg.sender != listing.seller, "You cannot bid on an NFT you are selling.");
        require(listing.isAuction, "This listing is not an auction");
        require(block.timestamp < listing.date, "Auction has already ended");
        require(amount > listing.price, "Bid must be greater than the previous bid.");

        if (payableCurrency == Currency.USDCToken) {
            // Escrow payment in the marketplace contract
            IERC20(USDC).transferFrom(msg.sender, address(this), amount);
            // Transfer current bid back to previous bidder if applicable
            if (listing.highestBidder != address(0)) {
                IERC20(USDC).transfer(highestBidder, currentBid);
            }
        } else {
            // Implement AggregatorV3Interface to convert the USD value to the native token equivalent value
        }
        // Update to new bid values
        listing.highestBidder = msg.sender;
        listing.price = amount;

        emit NewBid(msg.sender, listing, amount);
    }

    // * Withdraw
    function withdraw(uint256 listingId) public nonReentrant {
        Listing storage listing = listings[listingId];
        address contractAddress = listing.nftContract;
        uint256 nftId = listing.nftId;
        address nftSeller = listing.seller;
        address highestBidder = listing.highestBidder;
        uint256 endBid = listing.price;
        uint256 baseRoyalty = royalties[contractAddress].royaltyAmount;
        address royaltyReceiver = royalties[contractAddress].payoutAccount;
        Currency payableCurrency = listing.payableCurrency;
        uint256 sellerAmount = endBid - ((endBid * baseRoyalty) / BPS);
        uint256 royaltyRecAmount = (endBid * baseRoyalty) / BPS;
        require(
            msg.sender == nftSeller || msg.sender == highestBidder, "Only the seller or highest bidder can withdraw."
        );

        IERC721(contractAddress).safeTransferFrom(nftSeller, highestBidder, nftId);
        if (payableCurrency == Currency.USDCToken) {
            IERC20(USDC).transfer(nftSeller, sellerAmount);
            IERC20(USDC).transfer(royaltyReceiver, royaltyRecAmount);
        } else {
            // Implement AggregatorV3Interface to convert the USD value to the native token equivalent value
        }

        // Update listing status
        listing.isAuction = false;

        emit Purchase(listingId, highestBidder, listing.payableCurrency, endBid);
    }

    // * Auction Cancel
    function auctionCancel(uint256 listingId) public Owned(listingId) nonReentrant {
        Listing storage listing = listings[listingId];
        require(block.timestamp < listing.date, "Auction has already ended");
        // If there is a highestBidder, transfer their bid back
        if (listing.highestBidder != address(0)) {
            payable(listing.highestBidder).transfer(listing.price);
        }

        delete listings[listingId];
    }

    // * Remove Listing
    function removeListing(uint256 listingId) public Owned(listingId) {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "You do not own this listing.");
        require(!listing.isAuction, "You cannot remove an active auction");

        delete listings[listingId];
    }

    // ============ UTILITIES ==============

    // * Set Royalty info
    function setNFTCollectionRoyalty(address contractAddress, address payoutAccount, uint256 royaltyAmount)
        public
        returns (bool)
    {
        require(!royalties[contractAddress].exists, "Collection already has royalty info set.");
        require(royaltyAmount > 0 && royaltyAmount <= 5000, "Please set a royalty amount between 0.01% and 50%");
        require(payoutAccount != address(0), "Royalties should not be burned.");
        // Set royalties
        royalties[contractAddress] = Royalties(contractAddress, payoutAccount, royaltyAmount, true);

        return true;
    }

    // * Remove ERC20 from contract
    function removeERC20Stuck(address to, IERC20 currency, uint256 amount) public onlyOwner {
        IERC20(currency).transfer(to, amount);
    }

    // ========= Receive =============
    receive() external payable {}
}
