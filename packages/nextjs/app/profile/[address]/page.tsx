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
import { Address, FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
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
  const [website, setWebsite] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [page, setPage] = useState(1); // Start from page 1 to get the last post first
  const [loadingProfile, setLoadingProfile] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const { address: connectedAddress } = useAccount();

  const pathname = usePathname();
  const address = pathname.split("/").pop();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [address],
    watch: true,
  });

  // Function to normalize URLs
  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const { writeContractAsync: profileInfoWriteAsync } = useScaffoldWriteContract("ProfileInfo");

  const {
    data: createEvents,
    // isLoading: createIsLoadingEvents,
    error: createErrorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PunkPosts",
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

      await profileInfoWriteAsync({
        functionName: "setProfile",
        args: [username, bio, profilePicture, website],
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
    if (!isEditing && profileInfo) {
      setUsername(profileInfo[0] || "");
      setBio(profileInfo[1] || "");
      setProfilePicture(profileInfo[2] ? profileInfo[2] : defaultProfilePicture);
      setWebsite(profileInfo[3] || "");
      setLoadingProfile(false);
    }
  }, [profileInfo, isEditing]);

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
                  {website && (
                    <a href={normalizeUrl(website)} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      {website}
                    </a>
                  )}
                  <div className="mt-2">
                    {address == connectedAddress ? (
                      <>
                        <RainbowKitCustomConnectButton />
                        <FaucetButton />
                      </>
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
                  <InputBase placeholder="Your Website" value={website} onChange={setWebsite} />
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

      <div>
        <NewsFeed posts={posts} />
        <div ref={lastPostElementRef}></div>
        {loadingMore && <LoadingBars />}
      </div>
    </>
  );
};

export default ProfilePage;
