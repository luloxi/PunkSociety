import { useState } from "react";
import Image from "next/image";
import { Collectible } from "./MyHoldings";
import { useAccount } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";

// For ETH conversion

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true); // Added collapsing behavior
  const [activeTab, setActiveTab] = useState("details");
  const [NFTPrice, setNFTPrice] = useState("");
  const [payableCurrency, setPayableCurrency] = useState("0"); // "0" for ETH, "1" for USDC
  const [isAuction, setIsAuction] = useState(false);
  const [biddingTimeDays, setBiddingTimeDays] = useState(0);
  const [biddingTimeHours, setBiddingTimeHours] = useState(0);
  const [biddingTimeMinutes, setBiddingTimeMinutes] = useState(0);
  const [biddingTimeSeconds, setBiddingTimeSeconds] = useState(0);

  const { address: connectedAddress } = useAccount();

  return (
    <div className={`card-compact w-[300px] relative group ${isCollapsed ? "" : "bg-base-100"}`}>
      {/* Image Section */}
      <figure className="relative">
        <Image
          src={nft.image || "/path/to/default/image.png"}
          alt="NFT Image"
          className="w-full h-auto rounded-lg object-cover"
          layout="responsive" // Ensures responsiveness like the original img
          width={300} // Same as the original container width
          height={300} // Adjust this to maintain the aspect ratio of the image
        />
        {/* Hover-triggered collapse section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 flex justify-center items-center bg-base-100 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className={`transition-transform ${isCollapsed ? "" : ""}`}>
            {isCollapsed ? "▼ Expand" : "▲ Collapse"} {/* Arrow toggles up/down */}
          </div>
        </div>
      </figure>

      {/* Tabs navigation */}
      {!isCollapsed && (
        <div className="tabs flex justify-center gap-3 border-b-4 border-base-200">
          <a
            className={`tab  ${activeTab === "details" ? "bg-blue-900 text-white" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </a>
          {connectedAddress === nft.owner && (
            <a
              className={`tab  ${activeTab === "sellNFT" ? "bg-red-800 text-white" : ""}`}
              onClick={() => setActiveTab("sellNFT")}
            >
              Sell NFT
            </a>
          )}
        </div>
      )}

      {!isCollapsed && activeTab === "details" && (
        // Render all combined content (artwork, info, actions) here
        <div>
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
            <div className="flex flex-col justify-center mt-1">
              <span className="text-lg">
                <strong>Id:</strong> {nft.id}
              </span>
            </div>

            <div className="flex flex-col my-2 space-y-1">
              <span className="text-lg font-semibold mb-1">Transfer To: </span>
              <AddressInput
                value={transferToAddress}
                placeholder="receiver address"
                onChange={newValue => setTransferToAddress(newValue)}
              />
            </div>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      )}

      {!isCollapsed && activeTab === "sellNFT" && (
        // Render Marketplace content here
        <div className="card-body">
          {/* Payable Currency Toggle */}
          <div className="form-control">
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

          <div className="card-actions justify-end"></div>
        </div>
      )}
    </div>
  );
};
