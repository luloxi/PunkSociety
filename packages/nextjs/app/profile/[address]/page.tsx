"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ErrorComponent } from "../../explore/_components/ErrorComponent";
import { LoadingSpinner } from "../../explore/_components/LoadingSpinner";
import { NewsFeed } from "../../explore/_components/NewsFeed";
import { ProfilePictureUpload } from "../_components/ProfilePictureUpload";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { getMetadataFromIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export interface Collectible extends Partial<NFTMetaData> {
  listingId?: number;
  uri: string;
  user: string;
  date?: string;
}

const defaultProfilePicture = "/guest-profile.jpg";

const ProfilePage: NextPage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [website, setWebsite] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  const [listedCollectibles, setListedCollectibles] = useState<Collectible[]>([]);
  const [loading, setLoading] = useState(true);

  const { address: connectedAddress, isConnected, isConnecting } = useAccount();

  const pathname = usePathname();
  const address = pathname.split("/").pop();

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [address],
    watch: true,
  });

  const { writeContractAsync: profileInfoWriteAsync } = useScaffoldWriteContract("ProfileInfo");

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

  const handleEditProfile = async () => {
    try {
      await profileInfoWriteAsync({
        functionName: "setProfile",
        args: [name, bio, profilePicture, website],
      });

      notification.success("Profile Edited Successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error during editing profile:", error);

      // Log the error and notify the user
      notification.error("Editing profile, please try again.");
    }
  };

  useEffect(() => {
    const fetchListedNFTs = async () => {
      if (!createEvents) return;

      const collectiblesUpdate: Collectible[] = [];

      for (const event of createEvents || []) {
        try {
          const { args } = event;
          const user = args?.user;
          const tokenURI = args?.tokenURI;

          if (args?.user !== address) continue;
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
  }, [createEvents, address, connectedAddress]);

  useEffect(() => {
    if (!isEditing && profileInfo) {
      setName(profileInfo[0] || "");
      setBio(profileInfo[1] || "");
      setProfilePicture(profileInfo[2] ? profileInfo[2] : defaultProfilePicture);
      setWebsite(profileInfo[3] || "");
    }
  }, [profileInfo, isEditing]);

  useEffect(() => {
    if (listedCollectibles.length > 0) {
      setLoading(false); // Stop loading after collectibles are updated
    }
  }, [listedCollectibles]);

  // const filteredCollectibles = listedCollectibles.filter(collectible => {
  //   return true;
  // });

  // Ensure the address is available before rendering the component
  if (!address) {
    return <p>Inexistent address, try again...</p>;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (createIsLoadingEvents) {
    return <LoadingSpinner />;
  }

  if (createErrorReadingEvents) {
    return <ErrorComponent message={createErrorReadingEvents?.message || "Error loading events"} />;
  }

  // const ensureHttps = (url: string) => {
  //   if (!/^https?:\/\//i.test(url)) {
  //     return `https://${url}`;
  //   }
  //   return url;
  // };

  return (
    <div className="flex flex-col items-center p-2">
      {/* User Profile Section */}
      <div className="relative flex flex-col md:flex-row justify-between items-center bg-base-100 p-6 rounded-lg shadow-md w-full">
        {/* Profile Picture */}
        <div className="avatar ">
          <ProfilePictureUpload
            isEditing={isEditing}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
          />
        </div>
        {/* <div className="avatar mr-4 md:mr-8">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <ProfilePictureUpload profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
          </div>
        </div> */}
        {/* User Info Section */}
        <div className="flex flex-col justify-center items-center">
          {isEditing ? (
            <InputBase placeholder="Your Name" value={name} onChange={setName} />
          ) : (
            <>
              <h2 className="text-2xl font-bold">{name || "Guest user"}</h2>
              <div className="text-base-content">
                <Address address={address} />
              </div>
              <p className={`text-base-content ${bio ? "" : "text-red-600"}`}>{bio || "no biography available"}</p>
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  {website}
                </a>
              )}
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
              <button className="absolute top-4 right-4 btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
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

      <div>
        <>
          <div className="flex justify-center mb-4">
            <div className="flex justify-center">
              {!isConnected || isConnecting ? <RainbowKitCustomConnectButton /> : ""}
            </div>
            {listedCollectibles.length === 0 ? (
              <div className="flex justify-center items-center mt-10">
                <div className="text-2xl text-primary-content">No NFTs found</div>
              </div>
            ) : loading ? (
              <LoadingSpinner />
            ) : (
              <NewsFeed filteredCollectibles={listedCollectibles} />
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default ProfilePage;
