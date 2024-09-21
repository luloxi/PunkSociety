"use client";

import { useState } from "react";
import Image from "next/image";
import { MyHoldings } from "./";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

export const MyProfile: NextPage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [website, setWebsite] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { writeContractAsync: nftWriteAsync } = useScaffoldWriteContract("MockNFT");
  const { writeContractAsync: usdcWriteAsync } = useScaffoldWriteContract("MockUSDC");
  const { writeContractAsync: profileInfoWriteAsync } = useScaffoldWriteContract("ProfileInfo");

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

  const handleEditProfile = async () => {
    try {
      await profileInfoWriteAsync({
        functionName: "setProfile",
        args: [name, bio, imageURL, website], // Mint 1 USDC
      });

      notification.success("Profile Edited Successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error during editing profile:", error);

      // Log the error and notify the user
      notification.error("Editing profile, please try again.");
    }
  };

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
        {/* Profile Picture */}
        <div className="avatar mr-4 md:mr-8">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            {isEditing ? (
              <div className="flex flex-col">
                <Image
                  src={imageURL || "https://ipfs.io/ipfs/QmVCvzEQHFKzAYSsou8jEJtWdFj31n2XgPpbLjbZqui4YY"} // Ensure you use the correct path for Next.js
                  alt="Profile Picture"
                  width={150} // 7 * 4px = 28px
                  height={150} // 7 * 4px = 28px
                  // style={{ objectFit: "contain" }} // Ensures the image behaves like 'object-contain'
                />
              </div>
            ) : (
              <Image
                src={imageURL || "https://ipfs.io/ipfs/QmVCvzEQHFKzAYSsou8jEJtWdFj31n2XgPpbLjbZqui4YY"} // Ensure you use the correct path for Next.js
                alt="Profile Picture"
                width={150} // 7 * 4px = 28px
                height={150} // 7 * 4px = 28px
                // style={{ objectFit: "contain" }} // Ensures the image behaves like 'object-contain'
              />
            )}
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex flex-col justify-start">
          {isEditing ? (
            <InputBase placeholder="Your Name" value={name} onChange={setName} />
          ) : (
            <>
              <h2 className="text-2xl font-bold">{name || "no name"}</h2>
              <div className="text-base-content">
                <Address address={connectedAddress} />
              </div>
            </>
          )}
        </div>

        {/* User Bio */}
        <div className="flex-grow text-center md:mx-auto mt-4 md:mt-0">
          {isEditing ? (
            <>
              <InputBase placeholder="Your Bio" value={bio} onChange={setBio} />
              <InputBase placeholder="Your Website" value={website} onChange={setWebsite} />
              <InputBase placeholder="Image URL" value={imageURL} onChange={setImageURL} />
            </>
          ) : (
            <>
              <p className={`text-base-content ${bio ? "" : "text-red-600"}`}>{bio || "no biography available"}</p>
              <p className={`text-base-content ${website ? "" : "text-red-600"}`}>{website || "no link available"}</p>
            </>
          )}
        </div>

        {/* Edit/Cancel Button */}
        {isEditing ? (
          <button className="absolute top-4 right-4 btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
            Cancel Edition
          </button>
        ) : (
          <button className="absolute top-4 right-4 btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}

        {/* USDC Balance and Logo at the Bottom Right */}
        {isEditing ? (
          <div className="absolute bottom-2 right-4 flex items-center gap-2">
            <button className="cool-button" onClick={handleEditProfile}>
              Save changes
            </button>
          </div>
        ) : (
          <div className="absolute bottom-2 right-4 flex items-center gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleMintUSDC}>
              Mint test USDC
            </button>

            {/* Wrap Image in a div and set explicit width/height */}
            <div className="w-7 h-7 relative">
              <Image
                src="/usdc-logo.png" // Ensure you use the correct path for Next.js
                alt="USDC Logo"
                width={28} // 7 * 4px = 28px
                height={28} // 7 * 4px = 28px
                style={{ objectFit: "contain" }} // Ensures the image behaves like 'object-contain'
              />
            </div>

            <p className="text-md text-cyan-600 font-bold">{usdcBalance ? Number(usdcBalance) / 1e6 : 0}</p>
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <div className="mt-2 md:px-4 w-full rounded-lg">
        <div className="tabs justify-start flex-wrap border-b-2 border-base-300">
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "your-nfts" ? "border-blue-500 font-bold text-blue-500" : ""
            }`}
            onClick={() => setActiveTab("your-nfts")}
          >
            Your NFTs
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "nfts-created" ? "border-blue-500 font-bold text-blue-500" : ""
            }`}
            onClick={() => setActiveTab("nfts-created")}
          >
            NFTs created
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "nfts-on-sale" ? "border-blue-500 font-bold text-blue-500" : ""
            }`}
            onClick={() => setActiveTab("nfts-on-sale")}
          >
            NFTs on Sale
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "past-sales" ? "border-blue-500 font-bold text-blue-500" : ""
            }`}
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

        {activeTab === "nfts-created" && (
          <div className="text-center">
            <p className="text-lg">You have created 0 NFTs so far.</p>
          </div>
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
