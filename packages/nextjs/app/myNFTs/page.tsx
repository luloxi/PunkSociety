"use client";

import { MyHoldings } from "./_components";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const MyNFTs: NextPage = () => {
  const { address: isConnected, isConnecting } = useAccount();
  // const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const { writeContractAsync } = useScaffoldWriteContract("MockNFT");

  const { data: tokenIdCounter } = useScaffoldReadContract({
    contractName: "MockNFT",
    functionName: "tokenIdCounter",
    watch: true,
  });

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
    <>
      <div className="flex items-center flex-col pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-4xl font-bold">My NFTs</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center">
        {!isConnected || isConnecting ? (
          <RainbowKitCustomConnectButton />
        ) : (
          <button className="btn btn-secondary" onClick={handleMintItem}>
            Mint NFT
          </button>
        )}
      </div>
      <MyHoldings />
    </>
  );
};

export default MyNFTs;
