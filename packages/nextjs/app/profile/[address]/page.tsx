"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ErrorComponent } from "../../../components/punk-society/ErrorComponent";
import { LoadingBars } from "../../../components/punk-society/LoadingBars";
import { NewsFeed } from "../../../components/punk-society/NewsFeed";
import ProfilePictureUpload from "../_components/ProfilePictureUpload";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Post extends Partial<NFTMetaData> {
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

const defaultProfilePicture = "/guest-profile.jpg";

const ProfilePage: NextPage = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [page, setPage] = useState(1); // Start from page 1 to get the last post first
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState("Minted");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const observer = useRef<IntersectionObserver | null>(null);

  const { address: connectedAddress } = useAccount();

  const pathname = usePathname();
  const address = pathname.split("/").pop();

  const { data: punkProfile } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "profiles",
    args: [address],
    watch: true,
  });

  const { writeContractAsync: punkProfileWriteAsync } = useScaffoldWriteContract("PunkProfile");

  const {
    data: createEvents,
    // isLoading: createIsLoadingEvents,
    error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PunkSociety",
    eventName: "PostCreated",
    fromBlock: 0n,
    watch: true,
  });

  const handleEditProfile = async () => {
    try {
      // Check if the current profile picture is the default one
      if (profilePicture === defaultProfilePicture) {
        // Unset the current profile picture before editing the profile
        setProfilePicture("");
      }

      await punkProfileWriteAsync({
        functionName: "setProfile",
        args: [username, bio, profilePicture],
      });

      notification.success("Profile Edited Successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error during editing profile:", error);

      // Log the error and notify the user
      notification.error("Editing profile, please try again.");
    }
  };

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

  useEffect(() => {
    if (!isEditing && punkProfile) {
      setUsername(punkProfile[0] || "");
      setBio(punkProfile[1] || "");
      setProfilePicture(punkProfile[2] ? punkProfile[2] : defaultProfilePicture);
      setLoadingProfile(false);
    }
  }, [punkProfile, isEditing]);

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
        {loadingProfile ? (
          <div className="relative flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-lg shadow-md w-full m-2">
            <div className="flex items-center justify-center w-full h-full">
              <LoadingBars />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-lg shadow-md w-full m-2">
            {/* Profile Picture */}
            <div className="avatar ">
              <ProfilePictureUpload
                isEditing={isEditing}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
              />
            </div>
            {/* User Info Section */}
            <div className="flex flex-col justify-center items-center">
              {isEditing ? (
                <InputBase placeholder="Your Name" value={username} onChange={setUsername} />
              ) : (
                <>
                  <h2 className="text-2xl font-bold">{username || "Guest user"}</h2>

                  {bio && <p className="text-base-content">{bio}</p>}

                  <div className="mt-2">
                    {address == connectedAddress ? (
                      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                        <div>
                          <RainbowKitCustomConnectButton />
                        </div>
                        <button className="btn btn-primary bg-red-600 hover:bg-red-700 border-0">+ Add funds</button>
                      </div>
                    ) : (
                      <div className="text-base-content">
                        <Address address={address} />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Div to align info in the center */}
            <div></div>
            {/* User Bio */}{" "}
            {isEditing ? (
              <div className="flex-grow text-center md:mx-auto mt-4 md:mt-0">
                <>
                  <InputBase placeholder="Your Bio" value={bio} onChange={setBio} />
                </>
              </div>
            ) : (
              <></>
            )}
            {/* Edit/Cancel Button */}
            {address === connectedAddress && (
              <>
                {isEditing ? (
                  <button
                    className="absolute top-4 right-4 btn btn-secondary btn-sm"
                    onClick={() => setIsEditing(false)}
                  >
                    X Cancel
                  </button>
                ) : (
                  <button className="absolute top-4 right-4 btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
                    <PencilIcon className="h-5 w-5" />
                    Edit
                  </button>
                )}
                {isEditing && (
                  <div className="mt-2 flex items-center gap-2">
                    <button className="cool-button" onClick={handleEditProfile}>
                      Save changes
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {/* {loading && <LoadingBars />} */}

      <div className="flex flex-col items-center justify-center">
        <div className="tabs-bar ">
          <button
            className={`tab text-red-600 ${activeTab === "Featured" ? "active" : ""}`}
            onClick={() => handleTabClick("Featured")}
          >
            Featured
          </button>
          <button className={`tab ${activeTab === "Minted" ? "active" : ""}`} onClick={() => handleTabClick("Minted")}>
            Minted
          </button>
          <button
            className={`tab text-red-600 ${activeTab === "Shared" ? "active" : ""}`}
            onClick={() => handleTabClick("Shared")}
          >
            Shared
          </button>
          <button
            className={`tab text-red-600 ${activeTab === "Revenue" ? "active" : ""}`}
            onClick={() => handleTabClick("Revenue")}
          >
            Revenue
          </button>
        </div>
        <NewsFeed posts={posts} />
        <div ref={lastPostElementRef}></div>
        {loadingMore && <LoadingBars />}
      </div>
    </>
  );
};

export default ProfilePage;
