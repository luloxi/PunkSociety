"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoadingBars } from "../../components/punk-society/LoadingBars";
import { NewsFeed } from "../../components/punk-society/NewsFeed";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  postId?: number;
  uri: string;
  user: string;

  date?: string;
}

export const Explore = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState("Global");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data: createEvents,
    // isLoading: createIsLoadingEvents,
    // error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PunkSociety",
    eventName: "PostCreated",
    fromBlock: 0n,
    watch: true,
  });

  const fetchPosts = useCallback(
    async (page: number) => {
      if (!createEvents) return;

      setLoadingMore(true);
      try {
        // Calculate the start and end indices for the current page
        const start = (page - 1) * 8;
        const end = page * 8;
        const eventsToFetch = createEvents.slice(start, end);

        const postsUpdate: Post[] = [];

        for (const event of eventsToFetch) {
          try {
            const user = event.args?.user;
            const tokenURI = event.args?.tokenURI;

            if (!tokenURI) continue;

            const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
            const nftMetadata: NFTMetaData = await getMetadataFromIPFS(ipfsHash);

            postsUpdate.push({
              postId: parseInt(event.args?.postId?.toString() ?? "0"),
              uri: tokenURI,
              user: user || "",
              ...nftMetadata,
            });
          } catch (e) {
            notification.error("Error fetching posts");
            console.error(e);
          }
        }

        setPosts(prevPosts => [...prevPosts, ...postsUpdate]);
      } catch (error) {
        notification.error("Failed to load posts");
      } finally {
        setLoadingMore(false);
      }
    },
    [createEvents],
  );

  useEffect(() => {
    setLoading(true);
    fetchPosts(page).finally(() => setLoading(false));
  }, [page, fetchPosts]);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMore],
  );

  if (loading && page === 0) {
    return (
      <>
        <LoadingBars />
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="tabs-bar ">
        <button className={`tab ${activeTab === "Global" ? "active" : ""}`} onClick={() => handleTabClick("Global")}>
          Global
        </button>
        <button
          className={`tab text-red-600 ${activeTab === "Following" ? "active" : ""}`}
          onClick={() => handleTabClick("Following")}
        >
          Following
        </button>
        <button
          className={`tab text-red-600 ${activeTab === "Groups" ? "active" : ""}`}
          onClick={() => handleTabClick("Groups")}
        >
          Groups
        </button>
      </div>
      <NewsFeed posts={posts} isGrid={false} />
      <div ref={lastPostElementRef}></div>
      {loadingMore && <LoadingBars />}
    </div>
  );
};
