import React, { useState } from "react";
import Image from "next/image";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

interface ProfilePictureUploadProps {
  isEditing: boolean;
  profilePicture: string;
  setProfilePicture: (path: string) => void;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  isEditing,
  profilePicture,
  setProfilePicture,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(profilePicture || null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  // File size validation (2MB)
  const MAX_FILE_SIZE_MB = 2 * 1024 * 1024; // 2 MB in bytes

  // Handle file drop or selection
  const handleFileUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE_MB) {
      notification.error("File is too large. Max size is 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string); // Show preview
    reader.readAsDataURL(file); // Convert image to base64 for preview

    // Upload file to IPFS
    setLoading(true);
    const notificationId = notification.loading("Uploading image to IPFS...");

    try {
      const ipfsId = await addToIPFS(file, true);
      const ipfsUrl = `https://ipfs.io/ipfs/${ipfsId.path}`;
      notification.success("Image uploaded to IPFS!");
      setProfilePicture(ipfsUrl); // Store IPFS path for later use
      setLoading(false);
      notification.remove(notificationId);
    } catch (error) {
      notification.error("Failed to upload image to IPFS.");
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
    setPreviewImage(null);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-32 h-32 rounded-full shadow-lg ${
        dragActive ? "bg-blue-100 border-2 border-blue-600" : "bg-gray-200"
      } ${previewImage ? "" : "bg-gray-200"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input type="file" onChange={handleFileInputChange} className="hidden" />
      {previewImage ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={previewImage}
            alt="Profile Picture Preview"
            className="rounded-full object-cover"
            width={128}
            height={128}
          />
          {hovered && isEditing && (
            <button
              className="absolute top-5 right-5 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full"
              onClick={handleRemoveImage}
            >
              ✕
            </button>
          )}
        </div>
      ) : isEditing ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-center p-2">
          <p className="text-xs font-bold m-0">Drag & Drop</p>
          <p className="text-xs m-0">Image Here</p>
          <p className="text-xs m-0">or</p>
          <label className="cursor-pointer text-blue-600 underline text-xs m-0">
            Click to Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange} // Handle file input
            />
          </label>
        </div>
      ) : (
        <Image
          src={profilePicture}
          alt="Profile Picture Preview"
          className="rounded-full object-cover"
          width={128}
          height={128}
        />
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white">
          Uploading...
        </div>
      )}
    </div>
  );
};
