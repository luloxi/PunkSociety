import { useState } from "react";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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

  const { writeContractAsync: MarketplaceWriteContractAsync } = useScaffoldWriteContract("Marketplace");

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

  // Convert and format price for display (handle if price is undefined)
  const formattedPrice =
    nft.price && nft.payableCurrency === "ETH"
      ? formatEther(BigInt(nft.price)) // Format from wei to ETH
      : nft.price
      ? (parseInt(nft.price) / 1e6).toFixed(2) // Format USDC (assuming 6 decimal places)
      : "N/A"; // If price is undefined

  return (
    <div className="card card-compact bg-base-100 w-[300px]">
      {/* Tabs navigation */}
      <div className="tabs flex justify-center gap-3">
        {nft.listingId ? (
          <a
            className={`tab tab-bordered ${activeTab === "buyNFT" ? "bg-red-600" : ""}`}
            onClick={() => setActiveTab("buyNFT")}
          >
            Buy NFT
          </a>
        ) : (
          <a
            className={`tab tab-bordered ${activeTab === "mintNFT" ? " bg-green-600" : ""}`}
            onClick={() => setActiveTab("mintNFT")}
          >
            Mint NFT
          </a>
        )}
        <a
          className={`tab tab-bordered ${activeTab === "info" ? "bg-yellow-600" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </a>
      </div>

      {/* Tab Content */}
      {activeTab === "mintNFT" && (
        <div>
          <figure className="relative">
            <img src={nft.image} alt="NFT Image" className="h-60 min-w-full" />
          </figure>
          <div className="card-body space-y-3">
            {nft.animation_url && (
              <video controls className="w-full h-14">
                <source src={nft.animation_url} type="audio/mpeg" />
              </video>
            )}

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

                <div className="card-actions justify-end">
                  <button
                    // className="btn btn-secondary bg-green-600 btn-md px-8 tracking-wide function-button"
                    className={`btn btn-primary hover:bg-green-500 py-3 px-6 bg-green-600 `}
                    onClick={handleBuyNFT}
                  >
                    Mint
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "buyNFT" && (
        <div>
          <figure className="relative">
            <img src={nft.image} alt="NFT Image" className="h-60 min-w-full" />
            <figcaption className="glass absolute bottom-4 left-4 p-4 w-25 rounded-xl">
              <span className="text-white "># {nft.listingId ?? "N/A"}</span>{" "}
              {/* Display 'N/A' if listingId is missing */}
            </figcaption>
          </figure>
          <div className="card-body space-y-3">
            {nft.animation_url && (
              <video controls className="w-full h-14">
                <source src={nft.animation_url} type="audio/mpeg" />
              </video>
            )}

            {/* Display price and buy button only if price is available */}
            {nft.price && nft.payableCurrency && (
              <div className="flex flex-row justify-around items-center my-2 space-y-1">
                <div>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-lg">
                      <b>{formattedPrice}</b> {nft.payableCurrency}
                    </span>
                  </div>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-secondary btn-md px-8 tracking-wide function-button"
                    onClick={handleBuyNFT}
                  >
                    Buy
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "info" && (
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
          <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Owner : </span>
            <Address address={nft.owner} />
          </div>
        </div>
      )}
    </div>
  );
};
