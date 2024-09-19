"use client";

import { useState } from "react";
import { MyHoldings } from "./_components";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const MyNFTs: NextPage = () => {
  const { address: isConnected, isConnecting } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("MockNFT");

  const { data: tokenIdCounter } = useScaffoldReadContract({
    contractName: "MockNFT",
    functionName: "tokenIdCounter",
    watch: true,
  });

  // Tab management state
  const [activeTab, setActiveTab] = useState("your-nfts");

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
      await writeContractAsync({
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
      <div className="flex flex-col items-center bg-base-200 p-6 rounded-lg shadow-md w-full max-w-lg">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>
        </div>
        {/* User Bio */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-base-content mt-2">
            NFT collector and digital artist. Passionate about blockchain and decentralized art.
          </p>
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

        {/* Content Based on Active Tab */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md">
          {activeTab === "your-nfts" && (
            <>
              <div className="flex justify-center mb-4">
                {!isConnected || isConnecting ? (
                  <RainbowKitCustomConnectButton />
                ) : (
                  <button className="btn btn-secondary" onClick={handleMintItem}>
                    Mint test NFT
                  </button>
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
    </div>
  );
};

export default MyNFTs;
