"use client";

import { useEffect, useState } from "react";
import { NFTCard } from "./NFTCard";
// import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId: number;
  uri: string;
  owner: string;
  price: string;
  payableCurrency: string;
  isAuction: boolean;
  date: string;
  highestBidder?: string;
}

export const Marketplace = () => {
  // const { address: connectedAddress } = useAccount();
  const [listedCollectibles, setListedCollectibles] = useState<Collectible[]>([]);

  const { data: yourCollectibleContract } = useScaffoldContract({
    contractName: "MockNFT",
  });

  // Fetch listing events from the Marketplace contract
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

  useEffect(() => {
    const fetchListedNFTs = async () => {
      if (!events || !yourCollectibleContract) return;

      const collectiblesUpdate: Collectible[] = [];

      for (const event of events) {
        try {
          const { args } = event;
          const listingId = args?.listingId;
          // Display on the info tab and or add to the collectible interface
          // const nftContract = args?.nftContract;
          const nftId = args?.nftId;
          const seller = args?.seller;
          const price = args?.price;
          const payableCurrency = args?.payableCurrency === 0 ? "ETH" : "USDC";
          const isAuction = args?.isAuction;
          const date = new Date(Number(args?.date) * 1000).toLocaleDateString(); // Convert timestamp to readable date
          const highestBidder = args?.highestBidder;

          const tokenURI = await yourCollectibleContract.read.tokenURI([nftId ? BigInt(nftId) : 0n]);
          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          collectiblesUpdate.push({
            listingId: parseInt(listingId ? listingId.toString() : ""),
            uri: tokenURI,
            owner: seller ? seller : "",
            price: price ? price.toString() : "",
            payableCurrency,
            isAuction: isAuction ? true : false,
            date,
            highestBidder,
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching listed collectibles");
          console.error(e);
        }
      }

      setListedCollectibles(collectiblesUpdate);
    };

    fetchListedNFTs();
  }, [events, yourCollectibleContract]);

  if (isLoadingEvents) {
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (errorReadingEvents) {
    return <div>Error fetching events: {errorReadingEvents.message}</div>;
  }

  return (
    <>
      {listedCollectibles.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No NFTs found</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
          {listedCollectibles.map(item => (
            <NFTCard nft={item} key={item.listingId} />
          ))}
        </div>
      )}
    </>
  );
};
