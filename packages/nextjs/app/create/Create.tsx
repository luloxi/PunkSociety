"use client";

import { useEffect, useState } from "react";
import { AttributesForm } from "./_components/AttributesForm";
import { Description } from "./_components/Description";
import { ImageUploader } from "./_components/ImageUploader";
import { JSONViewer } from "./_components/JSONViewer";
import { MetadataForm } from "./_components/MetadataForm";
import { MintingForm } from "./_components/MintingButtons";
import { RestoreDescriptionButton } from "./_components/RestoreDescriptionButton";
import generateTokenURI from "./_components/generateTokenURI";
import type { NextPage } from "next";
import { InputBase } from "~~/components/scaffold-eth";

export const Create: NextPage = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState<{ traitType: string; value: string }[]>([]);
  const [usdPrice, setUsdPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [yourJSON, setYourJSON] = useState<object>({});
  const [uploadedImageIpfsPath, setUploadedImageIpfsPath] = useState(""); // NEW: For image IPFS path
  const [descriptionVisible, setDescriptionVisible] = useState(true);
  // const [enableDebug, setEnableDebug] = useState(false);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("CreateDescriptionVisible");
    setDescriptionVisible(savedVisibility !== "false");
  }, []);

  const handleRestore = () => {
    setDescriptionVisible(true);
    localStorage.setItem("CreateDescriptionVisible", "true");
  };

  const resetForm = () => {
    setYourJSON({});
    setUploadedImageIpfsPath("");
    setCollectionName("");
    setCollectionSymbol("");
    setDescription("");
    setAnimationUrl("");
    setAttributes([]);
    setUsdPrice("");
    setMaxSupply("");
  };

  useEffect(() => {
    const generateTokenURIString = () => {
      const fullImageUrl = `https://ipfs.io/ipfs/${uploadedImageIpfsPath}`;
      const tokenURI = generateTokenURI(collectionName, description, fullImageUrl, animationUrl, attributes);
      setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
    };

    generateTokenURIString();
  }, [collectionName, description, uploadedImageIpfsPath, animationUrl, attributes]);

  return (
    <>
      {descriptionVisible && <Description />}
      <div className="w-full md:w-2/3 md:mx-auto px-0">
        <div className="flex flex-col md:flex-row items-start flex-grow">
          <div className="w-full px-8 mt-4 bg-base-100 py-6 rounded-lg ">
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-2xl font-bold mb-2">Create a new NFT</h3>
              <span className="text-red-500">* required fields</span>
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
                  collectionName={collectionName}
                  setCollectionName={setCollectionName}
                  collectionSymbol={collectionSymbol}
                  setCollectionSymbol={setCollectionSymbol}
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

            <div className="flex flex-row justify-evenly">
              <div className="py-2">
                <span className="font-bold p-3">
                  USD Price <span className="text-red-500">*</span>
                </span>
                <InputBase placeholder="10" value={usdPrice} onChange={setUsdPrice} />
              </div>
              <div className="py-2">
                <span className="font-bold p-3">
                  Max Supply <span className="text-red-500">*</span>
                </span>
                <InputBase placeholder="25" value={maxSupply} onChange={setMaxSupply} />
              </div>
            </div>

            <MintingForm
              collectionName={collectionName}
              collectionSymbol={collectionSymbol}
              description={description}
              image={uploadedImageIpfsPath} // Pass the uploaded image IPFS path to MintingForm
              animationUrl={animationUrl}
              attributes={attributes}
              usdPrice={usdPrice}
              maxSupply={maxSupply}
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

      {!descriptionVisible && <RestoreDescriptionButton handleRestore={handleRestore} />}
    </>
  );
};
