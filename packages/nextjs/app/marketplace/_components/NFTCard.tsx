import { useState } from "react";
import Image from "next/image";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId?: number; // Make optional
  uri: string;
  owner: string;
  price?: string; // Make optional
  payableCurrency?: string; // Make optional
  isAuction?: boolean; // Make optional
  date?: string; // Make optional
  highestBidder?: string;
  maxTokenId?: number; // Include maxTokenId in the Collectible interface
}

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  let initialActiveTab = "";
  if (nft.listingId) {
    initialActiveTab = "buyNFT";
  } else {
    initialActiveTab = "mintNFT";
  }
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: MarketplaceWriteContractAsync } = useScaffoldWriteContract("Marketplace");
  const { writeContractAsync: USDCWriteContractAsync } = useScaffoldWriteContract("MockUSDC");

  const { data: marketplaceData } = useDeployedContractInfo("Marketplace");

  const { data: usdcAllowance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "allowance",
    args: [connectedAddress, marketplaceData?.address],
    watch: true,
  });

  // console.log("usdcAllowance", usdcAllowance);

  const handleBuyNFT = async () => {
    if (!nft.listingId || !nft.price || !nft.payableCurrency) return; // Skip if required data is missing

    try {
      let value;

      if (nft.payableCurrency === "ETH") {
        value = BigInt(nft.price); // Price in wei
      } else if (nft.payableCurrency === "USDC") {
        value = BigInt(0); // No ETH required for USDC
      }

      await MarketplaceWriteContractAsync({
        functionName: "buy",
        args: [BigInt(nft.listingId.toString())],
        value,
      });
    } catch (err) {
      console.error("Error calling buy function", err);
    }
  };

  const handleApproveUSDC = async () => {
    if (!nft.price || !nft.payableCurrency) return; // Skip if required data is missing

    try {
      // let value;

      await USDCWriteContractAsync({
        functionName: "approve",
        args: [marketplaceData?.address, BigInt(nft.price)],
      });
    } catch (err) {
      console.error("Error calling buy function", err);
    }
  };

  // Convert and format price for display
  const formattedPrice =
    nft.price && nft.payableCurrency === "ETH"
      ? formatEther(BigInt(nft.price)) // Format from wei to ETH
      : nft.price
      ? (parseInt(nft.price) / 1e6).toFixed(2) // Format USDC (assuming 6 decimal places)
      : "N/A"; // If price is undefined

  const usdcPriceInUnits = nft.price ? BigInt(nft.price) : BigInt(0); // Ensure USDC price is handled as BigInt

  // Check if approval is required (USDC)
  const requiresApproval =
    nft.payableCurrency === "USDC" &&
    usdcAllowance !== undefined && // Ensure that allowance is defined
    usdcPriceInUnits > BigInt(usdcAllowance.toString()); // Ensure comparison is accurate

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
      </figure>

      {/* Hover-triggered collapse section */}
      <div
        className="absolute top-0 left-0 right-0 h-8 flex justify-center items-center bg-base-100 cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className={`transition-transform ${isCollapsed ? "" : ""}`}>
          {isCollapsed ? "▼ Expand" : "▲ Collapse"} {/* Arrow toggles up/down */}
        </div>
      </div>

      {!isCollapsed && (
        <div className="tabs flex justify-center gap-3">
          {nft.listingId ? (
            <a
              className={`tab ${activeTab === "buyNFT" ? "bg-red-200 dark:bg-red-800" : ""}`}
              onClick={() => setActiveTab("buyNFT")}
            >
              Buy NFT
            </a>
          ) : (
            <a
              className={`tab ${activeTab === "mintNFT" ? "bg-green-200 dark:bg-green-800" : ""}`}
              onClick={() => setActiveTab("mintNFT")}
            >
              Mint NFT
            </a>
          )}
          <a
            className={`tab ${activeTab === "info" ? "bg-blue-200 dark:bg-blue-900" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </a>
        </div>
      )}

      {/* Tab Content */}
      {!isCollapsed && activeTab === "mintNFT" && (
        <div>
          <div className="card-body space-y-3">
            {/* Display price and buy button only if price is available */}
            {nft.price && nft.payableCurrency && (
              <div className="flex flex-row justify-around my-2 space-y-1">
                <div>
                  <div className="flex space-x-3 mt-1 items-center">
                    <span className="font-semibold">Max Supply: </span>
                    <span>{nft.maxTokenId}</span>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-lg">
                      <b>{formattedPrice}</b> {nft.payableCurrency}
                    </span>
                  </div>
                </div>

                {/* Conditionally render the Allow button */}
                {requiresApproval ? (
                  <div className="card-actions justify-end">
                    <button className="cool-button" onClick={handleApproveUSDC}>
                      Allow USDC
                    </button>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button className="cool-button" onClick={handleBuyNFT}>
                      Buy NFT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!isCollapsed && activeTab === "buyNFT" && (
        <div>
          <div className="card-body space-y-3">
            {/* Display price and buy button only if price is available */}
            {nft.price && nft.payableCurrency && (
              <div className="flex flex-row items-center justify-around my-2 space-y-1">
                <div>
                  <div className="flex flex-row justify-center  gap-2">
                    <span className="text-lg">
                      <b>{formattedPrice}</b> {nft.payableCurrency}
                    </span>
                  </div>
                </div>

                {/* Conditionally render the Allow button */}
                {requiresApproval ? (
                  <div className="card-actions justify-end">
                    <button className="cool-button" onClick={handleApproveUSDC}>
                      Allow USDC
                    </button>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button className="cool-button" onClick={handleBuyNFT}>
                      Buy NFT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {!isCollapsed && activeTab === "info" && (
        <div className="card-body space-y-3">
          <div className="flex items-center justify-center">
            <p className="text-xl p-0 m-0 font-semibold">{nft.name ?? "Unnamed NFT"}</p> {/* Handle missing name */}
            <div className="flex flex-wrap space-x-2 mt-1">
              {nft.attributes?.map((attr, index) => (
                <span key={index} className="badge badge-primary py-3">
                  {attr.value}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center mt-1">
            <p className="my-0 text-lg">{nft.description ?? "No description available."}</p>{" "}
            {/* Handle missing description */}
          </div>

          {nft.animation_url && (
            <video controls className="w-full h-14">
              <source src={nft.animation_url} type="audio/mpeg" />
            </video>
          )}

          <div className="flex space-x-3 mt-1 items-center">
            {nft.listingId ? (
              <>
                <span className="text-lg font-semibold">Owner: </span>
                <Address address={nft.owner} />
              </>
            ) : (
              <>
                <span className="text-lg font-semibold">Artist: </span>
                <Address address={nft.owner} />
              </>
            )}
          </div>
          {/* <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Listing ID : </span>
            <span className="text-lg  ">{nft.listingId ?? "N/A"}</span>{" "}
          </div> */}
        </div>
      )}
    </div>
  );
};
