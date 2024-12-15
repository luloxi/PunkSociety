"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ErrorComponent } from "../../../components/punk-society/ErrorComponent";
import { LoadingBars } from "../../../components/punk-society/LoadingBars";
import { NewsFeed } from "../../../components/punk-society/NewsFeed";
import EditProfile from "../_components/EditProfile";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { PencilIcon } from "@heroicons/react/24/outline";
import Modal from "~~/components/punk-society/Modal";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  postId?: number;
  uri: string;
  user: string;
  date?: string;
}

const ProfilePage: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [page, setPage] = useState(1); // Start from page 1 to get the last post first
  const [activeTab, setActiveTab] = useState("Minted");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [isAnimating, setIsAnimating] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const defaultProfilePicture = "/guest-profile.jpg";

  const pathname = usePathname();
  const address = pathname.split("/").pop();

  const { address: connectedAddress } = useAccount();

  const { data: usdcBalance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  const formattedUsdcBalance = usdcBalance ? (Number(usdcBalance.toString()) / 1e6).toFixed(2) : "0.00";

  const closeModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsEditing(false);
    }, 300); // Adjust the timeout to match your animation duration
  };

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const { data: punkProfile } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "profiles",
    args: [address],
    watch: true,
  });

  const {
    data: createEvents,
    // isLoading: createIsLoadingEvents,
    error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PunkSociety",
    eventName: "PostCreated",
    // fromBlock: 18350669n,
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
            const { args } = event;
            const user = args?.user;
            const tokenURI = args?.tokenURI;

            if (args?.user !== address) continue;
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
    [createEvents, address],
  );

  useEffect(() => {
    setLoading(true);
    fetchPosts(page).finally(() => setLoading(false));
  }, [page, fetchPosts]);

  const lastPostElementRef = useCallback(
    (node: any) => {
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

  // Ensure the address is available before rendering the component
  if (!address) {
    return <p>Inexistent address, try again...</p>;
  }

  if (loading && page === 1) {
    return <LoadingBars />;
  }

  if (createErrorReadingEvents) {
    return <ErrorComponent message={createErrorReadingEvents?.message || "Error loading events"} />;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        {/* User Profile Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-lg shadow-md w-full m-2">
          {/* Profile Picture */}
          {/* <div className="avatar "> */}
          {/* <ProfilePictureUpload
                isEditing={isEditing}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
              /> */}
          <Image
            src={punkProfile?.[2] ? punkProfile?.[2] : defaultProfilePicture}
            alt="Profile Picture"
            className="rounded-full object-cover w-32 h-32"
            width={128}
            height={128}
          />
          {/* </div> */}
          {/* User Info Section */}
          <div className="flex flex-col justify-center items-center">
            {(isEditing || isAnimating) && (
              <Modal isOpen={isEditing} onClose={closeModal}>
                <EditProfile />
              </Modal>
            )}

            <>
              <h2 className="text-2xl font-bold">{punkProfile?.[0] || "Guest user"}</h2>

              {punkProfile?.[1] && <p className="text-base-content">{punkProfile?.[1]}</p>}

              <div className="mt-2">
                <div className="flex flex-col justify-center items-center">
                  <Address address={address} />
                  <div className="flex flex-row items-center gap-2">
                    <span>Balance: </span>
                    <span className="hidden lg:flex items-center justify-center gap-1 text-blue-600 font-bold">
                      <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                      {formattedUsdcBalance}
                    </span>
                    <Balance address={address} />
                  </div>
                </div>
              </div>
            </>
          </div>
          <div> </div>

          {/* Edit/Cancel Button */}
          {address === connectedAddress && (
            <>
              {isEditing ? (
                <button className="absolute top-4 right-4 btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
                  X Cancel
                </button>
              ) : (
                <button className="absolute top-4 right-4 btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                  <PencilIcon className="h-5 w-5" />
                  Edit
                </button>
              )}
              {isEditing && <div className="mt-2 flex items-center gap-2"></div>}
            </>
          )}
        </div>
      </div>
      {/* {loading && <LoadingBars />} */}

      <div className="flex flex-col items-center justify-center">
        <div className="tabs-bar ">
          <button
            className={`tab text-gray-500 ${activeTab === "Featured" ? "active" : ""}`}
            onClick={() => handleTabClick("Featured")}
          >
            Featured
          </button>
          <button className={`tab ${activeTab === "Minted" ? "active" : ""}`} onClick={() => handleTabClick("Minted")}>
            Shared
          </button>
          <button
            className={`tab text-gray-500 ${activeTab === "Shared" ? "active" : ""}`}
            onClick={() => handleTabClick("Shared")}
          >
            Liked
          </button>
          <button
            className={`tab text-gray-500 ${activeTab === "Revenue" ? "active" : ""}`}
            onClick={() => handleTabClick("Revenue")}
          >
            Revenue
          </button>
        </div>
      </div>
      <div>
        <NewsFeed posts={posts} isGrid={false} />
        <div ref={lastPostElementRef}></div>
        {loadingMore && <LoadingBars />}
      </div>
    </>
  );
};

export default ProfilePage;
