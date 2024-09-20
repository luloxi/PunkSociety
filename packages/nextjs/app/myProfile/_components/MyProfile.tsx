"use client";

import { useState } from "react";
import { MyHoldings } from "./";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

export const MyProfile: NextPage = () => {
  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { writeContractAsync: nftWriteAsync } = useScaffoldWriteContract("MockNFT");
  const { writeContractAsync: usdcWriteAsync } = useScaffoldWriteContract("MockUSDC");

  const { data: tokenIdCounter } = useScaffoldReadContract({
    contractName: "MockNFT",
    functionName: "tokenIdCounter",
    watch: true,
  });

  const { data: usdcBalance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  // Tab management state
  const [activeTab, setActiveTab] = useState("your-nfts");

  const handleMintUSDC = async () => {
    try {
      await usdcWriteAsync({
        functionName: "mint",
        args: [connectedAddress, BigInt(100e6)], // Mint 1 USDC
      });

      notification.success("USDC Minted Successfully");
    } catch (error) {
      console.error("Error during minting:", error);

      // Log the error and notify the user
      notification.error("Minting failed, please try again.");
    }
  };

  const handleMintItem = async () => {
    if (tokenIdCounter === undefined) {
      notification.error("Token ID Counter not found.");
      return;
    }

    const tokenIdCounterNumber = Number(tokenIdCounter);
    const currentTokenMetaData = nftsMetadata[tokenIdCounterNumber % nftsMetadata.length];
    const notificationId = notification.loading("Uploading to IPFS");
    try {
      const uploadedItem = await addToIPFS(currentTokenMetaData);

      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");

      // Log IPFS path before sending to contract
      console.log("IPFS Path:", uploadedItem.path);

      // Mint the NFT
      await nftWriteAsync({
        functionName: "mintItem",
        args: [uploadedItem.path],
      });

      notification.success("NFT Minted Successfully");
    } catch (error) {
      notification.remove(notificationId);
      console.error("Error during minting:", error);

      // Log the error and notify the user
      notification.error("Minting failed, please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-2">
      {/* User Profile Section */}
      <div className="relative flex flex-col md:flex-row items-start bg-base-100 p-6 rounded-lg shadow-md w-full">
        {/* Profile Picture at the Top Left */}
        <div className="avatar mr-4 md:mr-8">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex flex-col justify-start">
          <h2 className="text-2xl font-bold">-unregistered user-</h2>
          <div className="text-base-content">
            <Address address={connectedAddress} />
          </div>
        </div>

        {/* User Bio (centered) */}
        <div className="flex-grow text-center md:mx-auto mt-4 md:mt-0">
          <p className="text-base-content">-no bio available-</p>
          <p className="text-base-content">-no URL provided-</p>
        </div>

        {/* Edit Profile Button at the Top Right */}
        <button className="absolute top-4 right-4 btn btn-primary btn-sm">Edit Profile</button>

        {/* USDC Balance and Logo at the Bottom Right */}
        <div className="absolute bottom-2 right-4 flex items-center gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleMintUSDC}>
            Mint test USDC
          </button>
          <img src="usdc-logo.png" alt="USDC Logo" className="w-7 h-7 object-contain" />
          <p className="text-md text-cyan-600 font-bold">{usdcBalance ? Number(usdcBalance) / 1e6 : 0}</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-2 bg-base-300 w-full rounded-lg">
        <div className="tabs justify-center">
          <a
            className={`tab tab-lifted ${activeTab === "your-nfts" ? "bg-blue-500" : ""}`}
            onClick={() => setActiveTab("your-nfts")}
          >
            Your NFTs
          </a>
          <a
            className={`tab tab-lifted ${activeTab === "nfts-on-sale" ? "bg-blue-500" : ""}`}
            onClick={() => setActiveTab("nfts-on-sale")}
          >
            NFTs on Sale
          </a>
          <a
            className={`tab tab-lifted ${activeTab === "past-sales" ? "bg-blue-500" : ""}`}
            onClick={() => setActiveTab("past-sales")}
          >
            Past Sales
          </a>
        </div>
      </div>
      {/* Content Based on Active Tab */}
      <div>
        {activeTab === "your-nfts" && (
          <>
            <MyHoldings />
            <div className="flex justify-center mb-4">
              {!isConnected || isConnecting ? (
                <RainbowKitCustomConnectButton />
              ) : (
                <div className="flex flex-row gap-3">
                  <button className="btn btn-secondary" onClick={handleMintItem}>
                    Mint test NFT
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "nfts-on-sale" && (
          <div className="text-center">
            <p className="text-lg">You currently have no NFTs listed for sale.</p>
          </div>
        )}

        {activeTab === "past-sales" && (
          <div className="text-center">
            <p className="text-lg">You have no past sales yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// export default MyNFTs;
