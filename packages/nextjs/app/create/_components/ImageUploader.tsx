"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

interface ImageUploaderProps {
  image: string;
  setUploadedImageIpfsPath: (path: string) => void; // For handling IPFS upload
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setUploadedImageIpfsPath }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(image || null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Handle file drop or selection
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string); // Show preview
    reader.readAsDataURL(file); // Convert image to base64 for preview

    // Upload file to IPFS
    setLoading(true);
    const notificationId = notification.loading("Uploading image to IPFS...");

    try {
      const uploadedImage = await addToIPFS(file, true); // Upload image to IPFS
      notification.success("Image uploaded to IPFS!");
      setUploadedImageIpfsPath(uploadedImage.path); // Store IPFS path for later use
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
    setUploadedImageIpfsPath("");
    setPreviewImage(null);
  };

  return (
    <div
      className={`relative flex items-center justify-center w-60 h-72 rounded-lg shadow-lg ${
        dragActive ? "bg-blue-400 border-2 border-blue-600" : ""
      } ${previewImage ? "" : "bg-base-200"}`}
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
            alt="NFT Image Preview"
            className="w-full h-auto rounded-lg object-cover"
            width={300}
            height={300}
          />
          {hovered && (
            <button
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
              onClick={handleRemoveImage}
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* <p className="font-bold">Drag & Drop Image Here</p>
          <p>or</p> */}
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <span className="text-5xl h-auto rounded-full ">+</span>
            <span className="font-bold">Upload image</span>
            <span className="">Max filesize: 5 MB</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange} // Handle file input
            />
          </label>
        </div>
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 text-white">
          Uploading...
        </div>
      )}
    </div>
  );
};
