"use client";

import { useEffect, useState } from "react";
import { NFTCard } from "./NFTCard";
import { MarketplaceDescription } from "./marketplaceDescription";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldContract, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId?: number; // For listed collectibles, optional
  uri: string;
  owner: string;
  price?: string;
  payableCurrency?: string;
  isAuction?: boolean;
  date?: string;
  highestBidder?: string;
  maxTokenId?: number; // New field for the maximum token ID (from CollectionStarted event)
}

export const Marketplace = () => {
  const { address: isConnected, isConnecting } = useAccount();
  const [listedCollectibles, setListedCollectibles] = useState<Collectible[]>([]);

  // Fetch the collectible contract
  const { data: yourCollectibleContract } = useScaffoldContract({
    contractName: "MockNFT",
  });

  // Fetch Marketplace ListingCreated events
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "Marketplace",
    eventName: "ListingCreated",
    fromBlock: 0n,
    watch: true,
  });

  // Fetch Marketplace Purchase events
  const {
    data: purchaseEvents,
    isLoading: purchaseIsLoadingEvents,
    error: purchaseErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "Marketplace",
    eventName: "Purchase",
    fromBlock: 0n,
    watch: true,
  });

  // Fetch SimpleMint CollectionStarted events
  const {
    data: simpleMintEvents,
    isLoading: simpleMintIsLoadingEvents,
    error: simpleMintErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "SimpleMint",
    eventName: "CollectionStarted",
    fromBlock: 0n,
    watch: true,
  });

  useEffect(() => {
    const fetchListedNFTs = async () => {
      if (!events || !yourCollectibleContract) return;

      const collectiblesUpdate: Collectible[] = [];

      // Process Marketplace ListingCreated events
      for (const event of events) {
        try {
          const { args } = event;
          const listingId = args?.listingId;
          const nftId = args?.nftId;
          const seller = args?.seller;
          const price = args?.price;
          const payableCurrency = args?.payableCurrency === 0 ? "ETH" : "USDC"; // USDC for non-ETH
          const isAuction = args?.isAuction;
          const date = new Date(Number(args?.date) * 1000).toLocaleDateString();
          const highestBidder = args?.highestBidder;

          // Fetch the tokenURI for the NFT
          const tokenURI = await yourCollectibleContract.read.tokenURI([nftId ? BigInt(nftId) : 0n]);
          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          // Add the NFT to the collectibles array
          collectiblesUpdate.push({
            listingId: listingId !== undefined ? parseInt(listingId.toString()) : 0, // Default to 0 or any other value
            uri: tokenURI,
            owner: seller || "",
            price: price?.toString(),
            payableCurrency: payableCurrency,
            isAuction: !!isAuction,
            date,
            highestBidder,
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching listed collectibles");
          console.error(e);
        }
      }

      // Process SimpleMint CollectionStarted events
      for (const event of simpleMintEvents || []) {
        try {
          const { args } = event;
          const artist = args?.artist;
          const tokenURI = args?.tokenURI;
          const usdPrice = args?.usdPrice;
          const maxTokenId = args?.maxTokenId;

          // Ensure tokenURI is defined
          if (!tokenURI) continue;

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          // Add the NFT collection to the collectibles array
          collectiblesUpdate.push({
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

      // Debugging: Log the Purchase Events
      // console.log("Purchase Events:", purchaseEvents);

      // Debugging: Log the listed collectibles before filtering
      // console.log("Listed Collectibles before filtering:", collectiblesUpdate);

      // Filter out NFTs that have been purchased
      const updatedCollectibles = collectiblesUpdate.filter(collectible => {
        const hasBeenPurchased = purchaseEvents?.some(purchase => {
          const purchaseItemId = Number(purchase.args.itemId); // Convert itemId from Purchase to number
          return purchaseItemId === collectible.listingId; // Ensure both are numbers for comparison
        });
        // console.log(`Collectible ${collectible.listingId} has been purchased:`, hasBeenPurchased);
        return !hasBeenPurchased;
      });

      // Debugging: Log the filtered collectibles
      // console.log("Filtered Collectibles:", updatedCollectibles);

      // Update state with filtered collectibles
      setListedCollectibles(updatedCollectibles);
    };

    fetchListedNFTs();
  }, [events, simpleMintEvents, purchaseEvents, yourCollectibleContract]);

  if (isLoadingEvents || simpleMintIsLoadingEvents || purchaseIsLoadingEvents) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (errorReadingEvents || simpleMintErrorReadingEvents || purchaseErrorReadingEvents) {
    return <div>Error fetching events: {errorReadingEvents?.message || purchaseErrorReadingEvents?.message}</div>;
  }

  return (
    <>
      <MarketplaceDescription />
      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      {listedCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 my-4 px-5 justify-center">
          {listedCollectibles.map(item => (
            <NFTCard nft={item} key={item.uri} />
          ))}
        </div>
      )}
    </>
  );
};
