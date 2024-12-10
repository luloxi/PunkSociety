"use client";

import { useEffect, useState } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { useAccount } from "wagmi";
import { TextInput } from "~~/components/punk-society/TextInput";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState<string>("");

  const defaultProfilePicture = "/guest-profile.jpg";

  const { address: connectedAddress } = useAccount();

  const { writeContractAsync: punkProfileWriteAsync } = useScaffoldWriteContract("PunkProfile");

  const { data: punkProfile } = useScaffoldReadContract({
    contractName: "PunkProfile",
    functionName: "profiles",
    args: [connectedAddress],
    watch: true,
  });

  useEffect(() => {
    if (punkProfile) {
      setUsername(punkProfile?.[0] ? punkProfile?.[0] : "");
      setBio(punkProfile?.[1] ? punkProfile?.[1] : "");
      setProfilePicture(punkProfile?.[2] ? punkProfile?.[2] : "");
    }
  }, [punkProfile]);

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
      window.location.reload();
    } catch (error) {
      console.error("Error during editing profile:", error);

      // Log the error and notify the user
      notification.error("Editing profile, please try again.");
    }
  };

  return (
    <>
      <div className="w-full  md:w-2/3 md:mx-auto rounded-lg px-0">
        <div className="w-full px-10 bg-base-100 rounded-lg py-4 ">
          <div className="flex flex-col justify-center items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold ">Edit your profile info</h3>
            <ProfilePictureUpload
              isEditing={true}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
            />
            <InputBase placeholder="Your Name" value={username} onChange={setUsername} />
            <TextInput placeholder="Your Bio" description={bio} setDescription={setBio} />
            <button className="cool-button" onClick={handleEditProfile}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
