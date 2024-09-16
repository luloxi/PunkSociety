"use client";

import { lazy, useEffect, useState } from "react";
import generateTokenURI from "./generateTokenURI";
import type { NextPage } from "next";
// import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";

const LazyReactJson = lazy(() => import("react-json-view"));

const SimpleMint: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState([{ traitType: "", value: "" }]);

  const [yourJSON, setYourJSON] = useState<object>(nftsMetadata[0]);
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");
  const [mounted, setMounted] = useState(false);

  // Automatically update the JSON whenever the fields change
  useEffect(() => {
    generateTokenURIString();
  }, [collectionName, description, image, animationUrl, attributes]);

  useEffect(() => {
    setMounted(true);
  }, []);

  type AttributeField = "traitType" | "value";

  const handleAttributeChange = (index: number, field: AttributeField, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { traitType: "", value: "" }]);
  };

  // Function that generates the token URI and updates the JSON
  const generateTokenURIString = () => {
    const tokenURI = generateTokenURI(collectionName, description, image, animationUrl, attributes);
    setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
  };

  const handleIpfsUpload = async () => {
    setLoading(true);
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(yourJSON);

      notification.remove(notificationId);
      notification.success("Uploaded to IPFS");

      setUploadedIpfsPath(uploadedItem.path);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error uploading to IPFS");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          New to Simple Mint? <strong>Click here! </strong>
        </div>
        <div className="collapse-content">
          <p className="text-center">
            Simple Mint allows you to upload your art <strong>without needing to pay</strong>.
            <br />
            <span className="py-2">
              {" "}
              Instead, you upload it and sign a message to <strong>prove you own it</strong>.
            </span>
            <br />
            <br />
            When someone decides to first buy it, they pay for the price <strong>plus the minting costs.</strong>
            <br />
            First minters <strong>get a share of the royalties</strong> of all the NFTs minted in that collection.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center flex-grow pt-10">
        {/* Input Fields Section (Left on large screens, full width on mobile) */}

        <div className="w-full md:w-1/2 px-4">
          <span className="font-bold p-3">Collection name:</span>
          <InputBase placeholder="Piccawho?" value={collectionName} onChange={setCollectionName} />
          <span className="font-bold p-3">Collection symbol:</span>
          <InputBase placeholder="PW" value={collectionSymbol} onChange={setCollectionSymbol} />
          <span className="font-bold p-3">Description:</span>
          <InputBase placeholder="House music for the soul" value={description} onChange={setDescription} />
          <span className="font-bold p-3">Image URL (can be IPFS):</span>
          <InputBase placeholder="https:// or ipfs://" value={image} onChange={setImage} />
          <span className="font-bold p-3">Audio/Video URL (can be IPFS):</span>
          <InputBase placeholder="https:// or ipfs://" value={animationUrl} onChange={setAnimationUrl} />

          {attributes.map((attr, index) => (
            <div key={index} className="flex space-x-2">
              <div>
                <span className="font-bold p-3">Trait type:</span>
                <InputBase
                  placeholder="Trait type:"
                  value={attr.traitType}
                  onChange={value => handleAttributeChange(index, "traitType", value)}
                />
              </div>
              <div>
                <span className="font-bold p-3">Trait value:</span>
                <InputBase
                  placeholder="Value for trait"
                  value={attr.value}
                  onChange={value => handleAttributeChange(index, "value", value)}
                />
              </div>
            </div>
          ))}
          <button onClick={addAttribute} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Add Attribute
          </button>
        </div>

        {/* JSON Display Section (Right on large screens, full width on mobile) */}
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
          {mounted && (
            <LazyReactJson
              style={{ padding: "1rem", borderRadius: "0.75rem" }}
              src={yourJSON}
              theme="solarized"
              enableClipboard={false}
              onEdit={edit => {
                setYourJSON(edit.updated_src);
              }}
              onAdd={add => {
                setYourJSON(add.updated_src);
              }}
              onDelete={del => {
                setYourJSON(del.updated_src);
              }}
            />
          )}
          <button
            className={`btn btn-secondary mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
            onClick={handleIpfsUpload}
          >
            Upload metadata to IPFS
          </button>
          <button
            className={`btn btn-secondary mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
            onClick={handleIpfsUpload}
          >
            Sign metadata (gas free)
          </button>
          {uploadedIpfsPath && (
            <div className="mt-4">
              <a href={`https://ipfs.io/ipfs/${uploadedIpfsPath}`} target="_blank" rel="noreferrer">
                {`https://ipfs.io/ipfs/${uploadedIpfsPath}`}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SimpleMint;
