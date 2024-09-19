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
          // This could be used to interact with the SimpleMinted contract
          // const nftAddress = args?.nft;
          const artist = args?.artist;
          const tokenURI = args?.tokenURI;
          const usdPrice = args?.usdPrice;
          const maxTokenId = args?.maxTokenId;

          // Ensure tokenURI is defined
          if (!tokenURI) {
            console.warn("Skipping event because tokenURI is undefined");
            continue;
          }

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          // Add the NFT collection to the collectibles array
          collectiblesUpdate.push({
            listingId: undefined, // Not applicable for SimpleMint NFTs
            uri: tokenURI,
            owner: artist || "",
            price: usdPrice ? usdPrice.toString() : undefined, // Set price as USD price from the event
            payableCurrency: usdPrice ? "USDC" : undefined, // Set payableCurrency to USDC if usdPrice is present
            maxTokenId: maxTokenId ? Number(maxTokenId) : undefined, // Add maxTokenId
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching collection started NFTs");
          console.error(e);
        }
      }

      // Update state with merged collectibles
      setListedCollectibles(collectiblesUpdate);
    };

    fetchListedNFTs();
  }, [events, simpleMintEvents, yourCollectibleContract]);

  if (isLoadingEvents || simpleMintIsLoadingEvents) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (errorReadingEvents || simpleMintErrorReadingEvents) {
    return <div>Error fetching events: {errorReadingEvents?.message || simpleMintErrorReadingEvents?.message}</div>;
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
        <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
          {listedCollectibles.map(item => (
            <NFTCard nft={item} key={item.uri} />
          ))}
        </div>
      )}
    </>
  );
};
