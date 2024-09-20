import { useState } from "react";
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
    <div className="card card-compact bg-base-100 w-[300px]">
      {/* Tabs navigation */}
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

      {/* Tab Content */}
      {activeTab === "mintNFT" && (
        <div>
          <figure className="relative">
            <img src={nft.image} alt="NFT Image" className="w-full h-auto object-cover" />
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

                {/* Conditionally render the Allow button */}
                {requiresApproval ? (
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-md px-8 tracking-wide bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700 border-0"
                      onClick={handleApproveUSDC}
                    >
                      Allow USDC
                    </button>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-md px-8 tracking-wide bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700  border-0"
                      onClick={handleBuyNFT}
                    >
                      Mint NFT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "buyNFT" && (
        <div>
          <figure className="relative">
            <img src={nft.image} alt="NFT Image" className="w-full h-auto object-cover" />
          </figure>
          <div className="card-body space-y-3">
            {nft.animation_url && (
              <video controls className="w-full h-14">
                <source src={nft.animation_url} type="audio/mpeg" />
              </video>
            )}

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
                    <button
                      className="btn btn-primary btn-md px-8 tracking-wide bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-800 dark:hover:bg-yellow-700 border-0"
                      onClick={handleApproveUSDC}
                    >
                      Allow USDC
                    </button>
                  </div>
                ) : (
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary btn-md px-8 tracking-wide bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700 border-0"
                      onClick={handleBuyNFT}
                    >
                      Buy NFT
                    </button>
                  </div>
                )}
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
