import React, { useEffect, useState } from "react";
import Image from "next/image";
import { uploadToPinata } from "~~/utils/pinata-upload";
import { notification } from "~~/utils/scaffold-eth";

// Import the Pinata upload function

interface ProfilePictureUploadProps {
  profilePicture: string;
  setProfilePicture: (url: string) => void;
  isEditing: boolean;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  profilePicture,
  setProfilePicture,
  isEditing,
}) => {
  const defaultProfilePicture = "/guest-profile.jpg";

  const [previewImage, setPreviewImage] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (profilePicture) {
      setPreviewImage(profilePicture);
    } else {
      setPreviewImage("");
    }
  }, [profilePicture]);

  // Handle file drop or selection
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string); // Show preview
    reader.readAsDataURL(file); // Convert image to base64 for preview

    // Upload file to Pinata
    setLoading(true);
    const notificationId = notification.loading("Uploading image to Pinata...");

    try {
      const response = await uploadToPinata(file);
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
      notification.success("Image uploaded to Pinata!");
      setProfilePicture(ipfsUrl); // Store IPFS path for later use
      setLoading(false);
      notification.remove(notificationId);
    } catch (error) {
      notification.error("Failed to upload image to Pinata.");
      setLoading(false);
      notification.remove(notificationId);
    }
  };

  // Handle drag-and-drop events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  // Handle click-to-upload file
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setProfilePicture("");
    setPreviewImage("");
  };

  return (
    <div
      className={`relative flex items-center justify-center w-32 h-32 rounded-full shadow-lg ${
        dragActive ? "bg-blue-500 border-2 border-blue-600" : "bg-base-200"
      } ${previewImage ? "" : "bg-base-200"} `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input type="file" onChange={handleFileInputChange} className="hidden" />
      {isEditing ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {previewImage ? (
            <>
              <Image
                src={previewImage}
                alt="Profile Picture"
                className="rounded-full object-cover w-32 h-32"
                width={128}
                height={128}
              />
              <button
                className="absolute top-5 right-5 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
                onClick={handleRemoveImage}
              >
                ✕
              </button>
            </>
          ) : (
            <label className="w-32 h-32 flex flex-col items-center justify-center cursor-pointer text-xs m-0 border border-dashed border-gray-400 rounded-full">
              <span className="text-5xl h-auto rounded-full">+</span>
              <span className="font-bold">Upload image</span>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                className="hidden"
                onChange={handleFileInputChange}
              />
            </label>
          )}
        </div>
      ) : (
        <Image
          src={profilePicture ? profilePicture : defaultProfilePicture}
          alt="Profile Picture"
          className="rounded-full object-cover w-32 h-32"
          width={128}
          height={128}
        />
      )}
      {hovered && previewImage && (
        <button
          className="absolute top-5 right-5 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
          onClick={handleRemoveImage}
        >
          ✕
        </button>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
