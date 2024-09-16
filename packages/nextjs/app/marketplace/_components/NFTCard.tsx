import { useState } from "react";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId: number;
  uri: string;
  owner: string;
  price: string;
  payableCurrency: string;
  isAuction: boolean;
  date: string;
  highestBidder?: string;
}

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [activeTab, setActiveTab] = useState("buyNFT");

  const { writeContractAsync: MarketplaceWriteContractAsync } = useScaffoldWriteContract("Marketplace");

  const handleBuyNFT = async () => {
    try {
      let value;

      if (nft.payableCurrency === "ETH") {
        // If it's ETH, assume the price is already in wei (smallest ETH unit)
        value = BigInt(nft.price); // Price should already be in wei
      } else if (nft.payableCurrency === "USDC") {
        // If it's USDC, no value needs to be passed in ETH. Just pass 0.
        value = BigInt(0);
      }

      await MarketplaceWriteContractAsync({
        functionName: "buy",
        args: [BigInt(nft.listingId.toString())],
        value, // Only pass ETH if it's payableCurrency is ETH
      });
    } catch (err) {
      console.error("Error calling buy function", err);
    }
  };

  // Convert and format price for display
  const formattedPrice =
    nft.payableCurrency === "ETH"
      ? formatEther(BigInt(nft.price)) // Format price from wei to ETH
      : (parseInt(nft.price) / 1e6).toFixed(2); // Format price from micro USDC to USDC

  return (
    <div className="card card-compact bg-base-100 w-[300px]">
      {/* Tabs navigation */}
      <div className="tabs flex justify-center gap-3">
        <a
          className={`tab tab-bordered ${activeTab === "buyNFT" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("buyNFT")}
        >
          Buy NFT
        </a>
        <a
          className={`tab tab-bordered ${activeTab === "info" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Info
        </a>
      </div>

      {/* Tab Content */}
      {activeTab === "buyNFT" && (
        <div>
          <figure className="relative">
            <img src={nft.image} alt="NFT Image" className="h-60 min-w-full" />
            <figcaption className="glass absolute bottom-4 left-4 p-4 w-25 rounded-xl">
              <span className="text-white "># {nft.listingId}</span>
            </figcaption>
          </figure>
          <div className="card-body space-y-3">
            {nft.animation_url && (
              <video controls className="w-full h-14">
                <source src={nft.animation_url} type="audio/mpeg" />
              </video>
            )}

            <div className="flex flex-col my-2 space-y-1">
              <div className="flex flex-row items-center gap-2">
                <span className="text-lg font-semibold mb-1">Current price: </span>
                <span>
                  <b>{formattedPrice}</b> {nft.payableCurrency}
                </span>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary btn-md px-8 tracking-wide function-button" onClick={handleBuyNFT}>
                Buy
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "info" && (
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
          <div className="flex space-x-3 mt-1 items-center">
            <span className="text-lg font-semibold">Owner : </span>
            <Address address={nft.owner} />
          </div>
        </div>
      )}
    </div>
  );
};
