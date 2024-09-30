"use client";

import { useEffect, useState } from "react";
import { ImageUploader } from "./_components/ImageUploader";
import { MintingButtons } from "./_components/MintingButtons";
import { TextInput } from "./_components/TextInput";
import generateTokenURI from "./_components/generateTokenURI";

// import type { NextPage } from "next";

const Create = ({ onClose }: { onClose: any }) => {
  const [description, setDescription] = useState("");
  const [yourJSON, setYourJSON] = useState<object>({});
  const [uploadedImageIpfsPath, setUploadedImageIpfsPath] = useState(""); // NEW: For image IPFS path

  const resetForm = () => {
    setYourJSON({});
    setUploadedImageIpfsPath("");
    setDescription("");
  };

  const handlePostCreated = () => {
    resetForm();
    onClose();
    window.location.reload();
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
      <div className="w-full  md:w-2/3 md:mx-auto rounded-lg px-0">
        {/* <div className="flex  flex-col md:flex-row items-start flex-grow"> */}
        <div className="w-full px-10 bg-base-100 rounded-lg py-4 ">
          <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-2xl font-bold ">Create a new post</h3>
          </div>

          {/* Metadata and Attributes Forms */}
          <div className="flex flex-col gap-3 md:flex-row items-center justify-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <ImageUploader
                image={uploadedImageIpfsPath}
                setUploadedImageIpfsPath={setUploadedImageIpfsPath} // NEW: Set the uploaded image IPFS path here
              />
            </div>
            <div className="text-left flex-shrink-0 w-full">
              <TextInput description={description} setDescription={setDescription} />
            </div>
          </div>

          {/* JSON Viewer */}
          {/* <JSONViewer yourJSON={yourJSON} setYourJSON={setYourJSON} /> */}

          <MintingButtons
            description={description}
            image={uploadedImageIpfsPath} // Pass the uploaded image IPFS path to MintingForm
            yourJSON={yourJSON}
            resetForm={resetForm}
            onPostCreated={handlePostCreated}
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Create;
