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
    <div className="flex flex-col items-center p-6">
      {/* User Profile Section */}
      <div className="relative flex flex-col items-center bg-base-100 p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* Edit Profile Button */}
        <button className="absolute top-4 right-4 btn btn-primary btn-sm">Edit Profile</button>

        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
        </div>

        {/* User Bio */}
        <div className="flex flex-col justify-center items-center mt-4">
          <h2 className="text-2xl font-bold">-unregistered user-</h2>
          <Address address={connectedAddress} />

          <p className="text-base-content mt-2">-no bio available-</p>
        </div>

        {/* USDC Balance and Logo */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2 mr-3">
          <img
            src="usdc-logo.png"
            alt="USDC Logo"
            className="w-6 h-6 object-contain" // Set width and height, use object-contain to maintain aspect ratio
          />
          <p className="text-sm text-cyan-600 font-bold">{usdcBalance ? Number(usdcBalance) / 1e6 : 0}</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8 w-full max-w-3xl">
        <div className="tabs justify-center">
          <a
            className={`tab tab-lifted ${activeTab === "your-nfts" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("your-nfts")}
          >
            Your NFTs
          </a>
          <a
            className={`tab tab-lifted ${activeTab === "nfts-on-sale" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("nfts-on-sale")}
          >
            NFTs on Sale
          </a>
          <a
            className={`tab tab-lifted ${activeTab === "past-sales" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("past-sales")}
          >
            Past Sales
          </a>
        </div>
      </div>
      {/* Content Based on Active Tab */}
      <div className="bg-base-200 p-6 rounded-lg shadow-md">
        {activeTab === "your-nfts" && (
          <>
            <div className="flex justify-center mb-4">
              {!isConnected || isConnecting ? (
                <RainbowKitCustomConnectButton />
              ) : (
                <div className="flex flex-row gap-3">
                  <button className="btn btn-secondary" onClick={handleMintItem}>
                    Mint test NFT
                  </button>
                  <button className="btn btn-secondary" onClick={handleMintUSDC}>
                    Mint test USDC
                  </button>
                </div>
              )}
            </div>
            <MyHoldings />
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
