"use client";

import { useEffect, useState } from "react";
import { AttributesForm } from "./_components/AttributesForm";
import { ImageUploader } from "./_components/ImageUploader";
import { JSONViewer } from "./_components/JSONViewer";
import { MetadataForm } from "./_components/MetadataForm";
import { MintingForm } from "./_components/MintingButtons";
import generateTokenURI from "./_components/generateTokenURI";
import type { NextPage } from "next";

export const Create: NextPage = () => {
  const [description, setDescription] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState<{ traitType: string; value: string }[]>([]);
  const [yourJSON, setYourJSON] = useState<object>({});
  const [uploadedImageIpfsPath, setUploadedImageIpfsPath] = useState(""); // NEW: For image IPFS path

  const resetForm = () => {
    setYourJSON({});
    setUploadedImageIpfsPath("");
    setDescription("");
    setAnimationUrl("");
    setAttributes([]);
  };

  useEffect(() => {
    const generateTokenURIString = () => {
      const fullImageUrl = `https://ipfs.io/ipfs/${uploadedImageIpfsPath}`;
      const tokenURI = generateTokenURI(description, fullImageUrl, animationUrl, attributes);
      setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
    };

    generateTokenURIString();
  }, [description, uploadedImageIpfsPath, animationUrl, attributes]);

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
              {/* Media Preview */}
              <ImageUploader
                image={uploadedImageIpfsPath}
                setUploadedImageIpfsPath={setUploadedImageIpfsPath} // NEW: Set the uploaded image IPFS path here
              />
              <div className="text-left flex-1">
                <MetadataForm
                  description={description}
                  setDescription={setDescription}
                  animationUrl={animationUrl}
                  setAnimationUrl={setAnimationUrl}
                />
                {animationUrl && (
                  <video controls className="h-20 w-full pb-4">
                    <source src={animationUrl} type="audio/mpeg" />
                  </video>
                )}
                <AttributesForm attributes={attributes} setAttributes={setAttributes} />
              </div>
            </div>

            {/* JSON Viewer */}
            <JSONViewer yourJSON={yourJSON} setYourJSON={setYourJSON} />

            <MintingForm
              description={description}
              image={uploadedImageIpfsPath} // Pass the uploaded image IPFS path to MintingForm
              animationUrl={animationUrl}
              attributes={attributes}
              yourJSON={yourJSON}
              resetForm={resetForm}
            />

            {/* {uploadedIpfsPath && enableDebug && (
              <div className="mt-4">
                <a href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`} target="_blank" rel="noreferrer">
                  {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
                </a>
              </div>
            )}

            {uploadedImageIpfsPath && enableDebug && (
              <div className="mt-4">
                <a href={`https://ipfs.io/ipfs/${uploadedImageIpfsPath}`} target="_blank" rel="noreferrer">
                  {`https://ipfs.io/ipfs/${uploadedImageIpfsPath}`}
                </a>
              </div>
            )} */}
            {/* <div className="flex flex-col justify-center items-center mt-6 gap-3">
              <div className="flex items-center">
                <button className="cool-button mt-4" onClick={() => setEnableDebug(!enableDebug)}>
                  Debug IPFS uploads
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
