"use client";

import { useEffect, useState } from "react";
import { ErrorComponent } from "./_components/ErrorComponent";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { NewsFeed } from "./_components/NewsFeed";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

export const Explore = () => {
  const { address: isConnected, isConnecting } = useAccount();
  const [listedPosts, setListedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  // const {
  //   data: deleteEvents,
  //   isLoading: deleteIsLoadingEvents,
  //   error: deleteErrorReadingEvents,
  // } = useScaffoldEventHistory({
  //   contractName: "PunkPosts",
  //   eventName: "PostDeleted",
  //   fromBlock: 0n,
  //   watch: true,
  // });

  useEffect(() => {
    const fetchListedNFTs = async () => {
      if (!createEvents) return;

      const postsUpdate: Post[] = [];

      for (const event of createEvents || []) {
        try {
          const { args } = event;
          const user = args?.user;
          const tokenURI = args?.tokenURI;

          if (!tokenURI) continue;

          const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
          const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

          // Temporary fix for V1
          // Check if the image attribute is valid and does not point to [object Object]
          if (nftMetadata.image === "https://ipfs.io/ipfs/[object Object]") {
            console.warn(`Skipping post with invalid image URL: ${nftMetadata.image}`);
            continue;
          }

          postsUpdate.push({
            listingId: undefined,
            uri: tokenURI,
            user: user || "",
            ...nftMetadata,
          });
        } catch (e) {
          notification.error("Error fetching posts");
          console.error(e);
        }
      }

      setListedPosts(postsUpdate);
    };

    fetchListedNFTs();
  }, [createEvents]);

  useEffect(() => {
    if (listedPosts.length > 0) {
      setLoading(false); // Stop loading after Posts are updated
    }
  }, [listedPosts]);

  // const filteredPosts = listedPosts.filter(Post => {
  //   return true;
  // });

  if (createIsLoadingEvents) {
    return <LoadingSpinner />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (createErrorReadingEvents) {
    return <ErrorComponent message={createErrorReadingEvents?.message || "Error loading events"} />;
  }

  return (
    <>
      <div className="flex justify-center">{!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}</div>
      {listedPosts.length === 0 ? (
        <div className="flex justify-center items-center mt-10">
          <div className="text-2xl text-primary-content">No posts found</div>
        </div>
      ) : loading ? (
        <LoadingSpinner />
      ) : (
        <NewsFeed filteredPosts={listedPosts} />
      )}
    </>
  );
};
