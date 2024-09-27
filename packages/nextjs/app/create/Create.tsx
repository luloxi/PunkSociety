"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "./_components/ImageUploader";
import { MetadataForm } from "./_components/MetadataForm";
import { MintingButtons } from "./_components/MintingButtons";
import generateTokenURI from "./_components/generateTokenURI";
import type { NextPage } from "next";

export const Create: NextPage = () => {
  const [description, setDescription] = useState("");
  const [yourJSON, setYourJSON] = useState<object>({});
  const [uploadedImageIpfsPath, setUploadedImageIpfsPath] = useState(""); // NEW: For image IPFS path

  const resetForm = () => {
    setYourJSON({});
    setUploadedImageIpfsPath("");
    setDescription("");
  };

  useEffect(() => {
    const generateTokenURIString = () => {
      const fullImageUrl = `https://ipfs.io/ipfs/${uploadedImageIpfsPath}`;
      const tokenURI = generateTokenURI(description, fullImageUrl);
      setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
    };

    generateTokenURIString();
  }, [description, uploadedImageIpfsPath]);

  return (
    <>
      <div className="w-full md:w-2/3 md:mx-auto px-0">
        <div className="flex flex-col md:flex-row items-start flex-grow">
          <div className="w-full px-8 mt-4 bg-base-100 py-6 rounded-lg ">
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-2xl font-bold mb-2">Create a new post</h3>
            </div>

            {/* Metadata and Attributes Forms */}
            <div className="flex flex-col gap-3 md:flex-row items-center justify-center space-x-4 mb-4">
              <div className="text-left w-full">
                <MetadataForm description={description} setDescription={setDescription} />
              </div>
              <ImageUploader
                image={uploadedImageIpfsPath}
                setUploadedImageIpfsPath={setUploadedImageIpfsPath} // NEW: Set the uploaded image IPFS path here
              />
            </div>

            {/* JSON Viewer */}
            {/* <JSONViewer yourJSON={yourJSON} setYourJSON={setYourJSON} /> */}

            <MintingButtons
              description={description}
              image={uploadedImageIpfsPath} // Pass the uploaded image IPFS path to MintingForm
              yourJSON={yourJSON}
              resetForm={resetForm}
            />
          </div>
        </div>
      </div>
    </>
  );
};
