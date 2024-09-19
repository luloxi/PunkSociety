import { useState } from "react";
import { Collectible } from "./MyHoldings";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address, AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

// For ETH conversion

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [NFTPrice, setNFTPrice] = useState(0);
  const [payableCurrency, setPayableCurrency] = useState("0"); // "0" for ETH, "1" for USDC
  const [isAuction, setIsAuction] = useState(false);
  const [biddingTimeDays, setBiddingTimeDays] = useState(0);
  const [biddingTimeHours, setBiddingTimeHours] = useState(0);
  const [biddingTimeMinutes, setBiddingTimeMinutes] = useState(0);
  const [biddingTimeSeconds, setBiddingTimeSeconds] = useState(0);

  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: MockERC721WriteContractAsync } = useScaffoldWriteContract("MockNFT");
  const { writeContractAsync: MarketplaceWriteContractAsync } = useScaffoldWriteContract("Marketplace");
  const { data: mockERC721Data } = useDeployedContractInfo("MockNFT");
  // const { data: marketplaceData } = useDeployedContractInfo("Marketplace");

  const handleTransfer = async () => {
    try {
      await MockERC721WriteContractAsync({
        functionName: "transferFrom",
        args: [nft.owner, transferToAddress, BigInt(nft.id.toString())],
      });
    } catch (err) {
      console.error("Error calling transferFrom function", err);
    }
  };

  const calculateBiddingTimeInSeconds = () => {
    return biddingTimeDays * 86400 + biddingTimeHours * 3600 + biddingTimeMinutes * 60 + biddingTimeSeconds;
  };

  const handleCreateListing = async () => {
    try {
      const totalBiddingTime = calculateBiddingTimeInSeconds();
      let priceInSmallestUnit;

      // Convert price based on currency type
      if (payableCurrency === "0") {
        // ETH: Convert to wei
        priceInSmallestUnit = parseEther(NFTPrice.toString());
      } else {
        // USDC: Convert to smallest unit by multiplying by 10^6 (for 6 decimals)
        priceInSmallestUnit = BigInt(Math.floor(NFTPrice * 1e6).toString());
      }

      await MarketplaceWriteContractAsync({
        functionName: "createListing",
        args: [
          mockERC721Data?.address,
          BigInt(nft.id.toString()),
          priceInSmallestUnit, // Use the correct price based on currency
          parseInt(payableCurrency),
          isAuction,
          BigInt(totalBiddingTime.toString()),
        ],
      });
    } catch (err) {
      console.error("Error calling createListing function", err);
    }
  };

  return (
    <div className="card card-compact bg-base-100  w-[300px] ">
      {/* Tabs navigation */}
      <div className="tabs flex justify-center gap-3">
        <a
          className={`tab tab-bordered ${activeTab === "details" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </a>
        {connectedAddress === nft.owner && (
          <a
            className={`tab tab-bordered ${activeTab === "sellNFT" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("sellNFT")}
          >
            Sell NFT
          </a>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        // Render all combined content (artwork, info, actions) here
        <div>
          <figure className="relative">
            {/* eslint-disable-next-line */}
            <img src={nft.image} alt="NFT Image" className="h-60 min-w-full" />
            <figcaption className="glass absolute bottom-4 left-4 p-4 w-25 rounded-xl">
              <span className="text-white "># {nft.id}</span>
            </figcaption>
          </figure>
          <div className="card-body space-y-3">
            <div className="flex items-center justify-center">
              <p className="text-xl p-0 m-0 font-semibold">{nft.name}</p>
              <div className="flex flex-wrap space-x-2 mt-1">
                {nft.attributes?.map((attr, index) => (
                  <span key={index} className="badge badge-primary py-3">
                    {attr.value}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center mt-1">
              <p className="my-0 text-lg">{nft.description}</p>
            </div>
            {nft.animation_url && (
              <video controls className="w-full h-14">
                <source src={nft.animation_url} type="audio/mpeg" />
              </video>
            )}
            <div className="flex space-x-3 mt-1 items-center">
              <span className="text-lg font-semibold">Owner : </span>
              <Address address={nft.owner} />
            </div>
            <div className="flex flex-col my-2 space-y-1">
              <span className="text-lg font-semibold mb-1">Transfer To: </span>
              <AddressInput
                value={transferToAddress}
                placeholder="receiver address"
                onChange={newValue => setTransferToAddress(newValue)}
              />
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary btn-md px-8 tracking-wide function-button" onClick={handleTransfer}>
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "sellNFT" && (
        // Render Marketplace content here
        <div className="card-body space-y-3">
          {/* Payable Currency Toggle */}
          <div className="form-control">
            <p className="text-lg font-semibold">Create Listing</p>
            <span className="label-text font-semibold">Currency</span>
            <label className="label cursor-pointer items-center flex flex-row">
              <span>{payableCurrency === "0" ? "ETH" : "USDC"}</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={payableCurrency === "1"}
                onChange={() => setPayableCurrency(payableCurrency === "0" ? "1" : "0")}
              />
            </label>
          </div>

          {/* NFT Price Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <InputBase placeholder="Enter price" value={NFTPrice} onChange={setNFTPrice} />
          </div>

          {/* Auction Toggle */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Auction</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={isAuction}
                onChange={() => setIsAuction(!isAuction)}
              />
            </label>
          </div>

          {/* Bidding Time Input */}
          {isAuction && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Bidding Time</span>
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex flex-row">
                  <p>Days</p>
                  <input
                    type="number"
                    className="input input-bordered max-w-24"
                    placeholder="Days"
                    value={biddingTimeDays}
                    onChange={e => setBiddingTimeDays(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-row">
                  <p>Hours</p>
                  <input
                    type="number"
                    className="input input-bordered max-w-24"
                    placeholder="Hours"
                    value={biddingTimeHours}
                    onChange={e => setBiddingTimeHours(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-row">
                  <p>Minutes</p>
                  <input
                    type="number"
                    className="input input-bordered max-w-24"
                    placeholder="Minutes"
                    value={biddingTimeMinutes}
                    onChange={e => setBiddingTimeMinutes(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-row">
                  <p>Seconds</p>
                  <input
                    type="number"
                    className="input input-bordered max-w-24"
                    placeholder="Seconds"
                    value={biddingTimeSeconds}
                    onChange={e => setBiddingTimeSeconds(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Create Listing Button */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-md px-8 tracking-wide function-button" onClick={handleCreateListing}>
              Create Listing
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
