"use client";

import { useEffect, useState } from "react";
import { CollectiblesList } from "./_components/CollectiblesList";
import { ErrorComponent } from "./_components/ErrorComponent";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const Explore = () => {
  const { address: isConnected, isConnecting } = useAccount();
  const [listedCollectibles, setListedCollectibles] = useState<Collectible[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    data: createEvents,
    isLoading: createIsLoadingEvents,
    error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PunkPosts",
    eventName: "PostCreated",
    fromBlock: 0n,
    watch: true,
  });

  useEffect(() => {
    setLoading(false); // Stop loading after collectibles are updated
  }, [listedCollectibles]);

  useEffect(() => {
    const fetchListedNFTs = async () => {
      if (!createEvents) return;

      const collectiblesUpdate: Collectible[] = [];

      for (const event of createEvents || []) {
        try {
          const { args } = event;
          const user = args?.user;
          const tokenURI = args?.tokenURI;

          if (!tokenURI) continue;

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          collectiblesUpdate.push({
            listingId: undefined,
            uri: tokenURI,
            user: user || "",
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching collection started NFTs");
          console.error(e);
        }
      }

      setListedCollectibles(collectiblesUpdate);
    };

    fetchListedNFTs();
  }, [createEvents]);

  // const filteredCollectibles = listedCollectibles.filter(collectible => {
  //   return true;
  // });

  if (createIsLoadingEvents) {
    return <LoadingSpinner />;
  }

  if (createErrorReadingEvents) {
    return <ErrorComponent message={createErrorReadingEvents?.message || "Error loading events"} />;
  }

  return (
    <>
      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      {listedCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <CollectiblesList filteredCollectibles={listedCollectibles} />
      )}
    </>
  );
};
