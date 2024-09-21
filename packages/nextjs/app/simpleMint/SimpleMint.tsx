"use client";

import { useEffect, useState } from "react";
import { AttributesForm } from "./_components/AttributesForm";
import { JSONViewer } from "./_components/JSONViewer";
import { MediaPreview } from "./_components/MediaPreview";
import { MetadataForm } from "./_components/MetadataForm";
import { MintingForm } from "./_components/MintingForm";
import { RestoreDescriptionButton } from "./_components/RestoreDescriptionButton";
import generateTokenURI from "./_components/generateTokenURI";
import { SimpleMintDescription } from "./_components/simpleMintDescription";
import type { NextPage } from "next";
import { InputBase } from "~~/components/scaffold-eth";

export const SimpleMint: NextPage = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState<{ traitType: string; value: string }[]>([]);
  const [usdPrice, setUsdPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [yourJSON, setYourJSON] = useState<object>({});
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");
  const [descriptionVisible, setDescriptionVisible] = useState(true);

  useEffect(() => {
    const savedVisibility = localStorage.getItem("simpleMintDescriptionVisible");
    setDescriptionVisible(savedVisibility !== "false");
  }, []);

  const handleRestore = () => {
    setDescriptionVisible(true);
    localStorage.setItem("simpleMintDescriptionVisible", "true");
  };

  useEffect(() => {
    const generateTokenURIString = () => {
      const tokenURI = generateTokenURI(collectionName, description, image, animationUrl, attributes);
      setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
    };

    generateTokenURIString();
  }, [collectionName, description, image, animationUrl, attributes]);

  return (
    <>
      {descriptionVisible && <SimpleMintDescription />}
      <div className="w-full md:w-2/3 md:mx-auto px-0">
        <div className="flex flex-col md:flex-row items-start flex-grow">
          <div className="w-full px-8 mt-4 bg-base-100 py-6 rounded-lg ">
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-2xl font-bold mb-2">Create a new NFT</h3>
              <span className="text-red-500">* required fields</span>
            </div>

            {/* Metadata and Attributes Forms */}
            <div className="flex flex-col gap-3 md:flex-row items-start space-x-4 mb-4">
              <div className="text-left flex-1">
                <MetadataForm
                  collectionName={collectionName}
                  setCollectionName={setCollectionName}
                  collectionSymbol={collectionSymbol}
                  setCollectionSymbol={setCollectionSymbol}
                  description={description}
                  setDescription={setDescription}
                  image={image}
                  setImage={setImage}
                  animationUrl={animationUrl}
                  setAnimationUrl={setAnimationUrl}
                />
                <AttributesForm attributes={attributes} setAttributes={setAttributes} />
              </div>

              {/* Media Preview */}
              <MediaPreview image={image} animationUrl={animationUrl} />
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
              image={image}
              animationUrl={animationUrl}
              attributes={attributes}
              usdPrice={usdPrice}
              maxSupply={maxSupply}
              yourJSON={yourJSON}
              setUploadedIpfsPath={setUploadedIpfsPath}
            />

            {uploadedIpfsPath && (
              <div className="mt-4">
                <a href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`} target="_blank" rel="noreferrer">
                  {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {!descriptionVisible && <RestoreDescriptionButton handleRestore={handleRestore} />}
    </>
  );
};
