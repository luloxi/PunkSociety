"use client";

import { useEffect, useState } from "react";
// import { useRef } from "react";
import { CollectibleView } from "./CollectibleView";
// import { useAccount } from "wagmi";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  id: number;
  uri: string;
  owner: string;
}

const CollectiblePage = () => {
  //   const { address: connectedAddress } = useAccount();
  const [collectible, setCollectible] = useState<Collectible | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: yourCollectibleContract } = useScaffoldContract({
    contractName: "MockNFT",
  });

  useEffect(() => {
    const fetchCollectible = async (): Promise<void> => {
      if (!yourCollectibleContract) return;

      setLoading(true);

      try {
        const tokenId = BigInt(1);
        const tokenURI = await yourCollectibleContract.read.tokenURI([tokenId]);
        const owner = await yourCollectibleContract.read.ownerOf([tokenId]);

        const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
        const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

        setCollectible({
          id: 1,
          uri: tokenURI,
          owner,
          ...nftMetadata,
        });
      } catch (e) {
        notification.error("Error fetching collectible");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectible();
  }, [yourCollectibleContract]);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      {collectible ? (
        <div className="flex justify-center items-center mt-10">
          <CollectibleView nft={collectible} />
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFT found</div>
        </div>
      )}
    </>
  );
};

export default CollectiblePage;
