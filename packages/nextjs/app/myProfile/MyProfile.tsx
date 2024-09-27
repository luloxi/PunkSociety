"use client";

import { useEffect, useState } from "react";
import { MyHoldings } from "./_components/MyHoldings";
import { ProfilePictureUpload } from "./_components/ProfilePictureUpload";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const MyProfile: NextPage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [website, setWebsite] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [activeTab, setActiveTab] = useState("your-nfts");

  const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const { writeContractAsync: profileInfoWriteAsync } = useScaffoldWriteContract("ProfileInfo");

  const { data: profileInfo } = useScaffoldReadContract({
    contractName: "ProfileInfo",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  const defaultProfilePicture = "/guest-profile.png";

  // Update state when profileInfo changes and isEditing is false
  useEffect(() => {
    if (!isEditing && profileInfo) {
      setName(profileInfo[0] || "");
      setBio(profileInfo[1] || "");
      setProfilePicture(profileInfo[2] ? profileInfo[2] : defaultProfilePicture);
      setWebsite(profileInfo[3] || "");
    }
  }, [profileInfo, isEditing]);

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
                <Address address={connectedAddress} />
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
        {isEditing ? (
          <div className="mt-2 flex items-center gap-2">
            <button className="cool-button" onClick={handleEditProfile}>
              Save changes
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Tabs Section */}
      <div className="mt-2 md:px-4 w-full rounded-lg">
        <div className="tabs justify-start flex-wrap border-b-2 border-base-300 overflow-x-auto">
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "your-nfts" ? "border-blue-600 font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("your-nfts")}
          >
            Your NFTs
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "created" ? "border-blue-600 font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("created")}
          >
            Created
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "on-sale" ? "border-blue-600 font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("on-sale")}
          >
            On Sale
          </a>
          <a
            className={`tab tab-lifted text-lg whitespace-nowrap ${
              activeTab === "past-sales" ? "border-blue-600 font-bold text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("past-sales")}
          >
            Past Sales
          </a>
        </div>
      </div>

      {/* Content Based on Active Tab */}
      <div>
        {activeTab === "your-nfts" && (
          <>
            <MyHoldings />
            <div className="flex justify-center mb-4">
              {!isConnected || isConnecting ? (
                <RainbowKitCustomConnectButton />
              ) : (
                <div className="flex flex-row gap-3"></div>
              )}
            </div>
          </>
        )}

        {activeTab === "created" && (
          <div className="text-center">
            <p className="text-lg">You have created 0 NFTs so far.</p>
          </div>
        )}

        {activeTab === "on-sale" && (
          <div className="text-center">
            <p className="text-lg">You currently have no NFTs listed for sale.</p>
          </div>
        )}

        {activeTab === "past-sales" && (
          <div className="text-center">
            <p className="text-lg">You have no past sales yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
