"use client";

import { useEffect, useState } from "react";
import { CollectiblesList } from "./_components/CollectiblesList";
import { Description } from "./_components/Description";
import { ErrorComponent } from "./_components/ErrorComponent";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { RestoreDescriptionButton } from "./_components/RestoreDescriptionButton";
import { Tabs } from "./_components/Tabs";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  nftAddress?: string;
  listingId?: number;
  uri: string;
  owner: string;
  price?: string;
  payableCurrency?: string;
  isAuction?: boolean;
  date?: string;
  highestBidder?: string;
  maxTokenId?: number;
}

export const Explore = () => {
  const { address: isConnected, isConnecting } = useAccount();
  const [listedCollectibles, setListedCollectibles] = useState<Collectible[]>([]);
  const [activeTab, setActiveTab] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(true);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("marketplaceDescriptionVisible");
    setDescriptionVisible(savedVisibility !== "false");
  }, []);

  const handleRestore = () => {
    setDescriptionVisible(true);
    localStorage.setItem("marketplaceDescriptionVisible", "true");
  };

  const {
    data: createEvents,
    isLoading: createIsLoadingEvents,
    error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "SimpleMint",
    eventName: "CollectionStarted",
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
          const nftAddress = args?.nft;
          const artist = args?.artist;
          const tokenURI = args?.tokenURI;
          const usdPrice = args?.usdPrice;
          const maxTokenId = args?.maxTokenId;

          if (!tokenURI) continue;

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          collectiblesUpdate.push({
            nftAddress,
            listingId: undefined,
            uri: tokenURI,
            owner: artist || "",
            price: usdPrice ? usdPrice.toString() : undefined,
            payableCurrency: usdPrice ? "USDC" : undefined,
            maxTokenId: maxTokenId ? Number(maxTokenId) : undefined,
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

  const filteredCollectibles = listedCollectibles.filter(collectible => {
    if (activeTab === "on-sale") {
      return collectible.listingId && collectible.price;
    }
    if (activeTab === "mintables") {
      return collectible.maxTokenId;
    }
    return true;
  });

  if (createIsLoadingEvents) {
    return <LoadingSpinner />;
  }

  if (createErrorReadingEvents) {
    return <ErrorComponent message={createErrorReadingEvents?.message || "Error loading events"} />;
  }

  return (
    <>
      {descriptionVisible && <Description />}
      <div className="mt-2 md:px-4 w-full rounded-lg">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      {filteredCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <CollectiblesList filteredCollectibles={filteredCollectibles} />
      )}

      {!descriptionVisible && <RestoreDescriptionButton handleRestore={handleRestore} />}
    </>
  );
};
