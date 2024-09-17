"use client";

import { lazy, useEffect, useState } from "react";
import generateTokenURI from "./generateTokenURI";
import { SimpleMintDescription } from "./simpleMintDescription";
import type { NextPage } from "next";
// import useSWRMutation from "swr/mutation";
import { useAccount, useSignTypedData } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { EIP_712_DOMAIN, EIP_712_TYPES__START_COLLECTION } from "~~/utils/eip712";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

// import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
// import { postMutationFetcher } from "~~/utils/swr";

const LazyReactJson = lazy(() => import("react-json-view"));

const SimpleMint: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { signTypedDataAsync } = useSignTypedData(); // Hook for signing the data

  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState([{ traitType: "", value: "" }]);

  const [yourJSON, setYourJSON] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");
  // const [mounted, setMounted] = useState(false);

  // Check if this is working properly
  // const { trigger: postCollectionData } = useSWRMutation("/api/collections/new", postMutationFetcher); // SWR for API call

  // Automatically update the JSON whenever the fields change
  useEffect(() => {
    generateTokenURIString();
  }, [collectionName, description, image, animationUrl, attributes]);

  // Function that generates the token URI and updates the JSON
  const generateTokenURIString = () => {
    const tokenURI = generateTokenURI(collectionName, description, image, animationUrl, attributes);
    setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
  };

  // Is this necessary?
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // Attributes handling
  type AttributeField = "traitType" | "value";

  const handleAttributeChange = (index: number, field: AttributeField, value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { traitType: "", value: "" }]);
  };

  const handleSignAndUpload = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    // Validate inputs
    if (!collectionName || !collectionSymbol || !description || !image) {
      notification.error("Please fill all the required fields");
      return;
    }

    setLoading(true);
    const notificationId = notification.loading("Uploading and Signing...");

    try {
      // 1. Upload metadata to IPFS
      const uploadedItem = await addToIPFS(yourJSON);

      if (!uploadedItem || !uploadedItem.path) {
        throw new Error("Failed to upload metadata to IPFS");
      }

      // 2. Generate signature using EIP-712
      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__START_COLLECTION,
        primaryType: "StartCollection",
        message: {
          collectionName: collectionName,
          collectionSymbol: collectionSymbol,
          description: description,
          image: image,
          // image: uploadedItem.path, // To be replaced when image can be uploaded with IPFS
          animationUrl: animationUrl,
          attributes: JSON.stringify(attributes), // Convert attributes to string
          artist: connectedAddress, // Use 'artist' for consistency
        },
      });

      // await postCollectionData({
      //   collectionName,
      //   collectionSymbol, // Add this field
      //   description,
      //   image, // Add this field
      //   attributes: JSON.stringify(attributes), // Convert attributes to string and send
      //   signature,
      //   signer: connectedAddress,
      // });

      // 3. Display success message
      notification.remove(notificationId);
      notification.success("Metadata uploaded and signed!");

      // 4. Set uploaded IPFS path
      setUploadedIpfsPath(uploadedItem.path);

      // Optionally log the signature and IPFS path
      console.log("IPFS Path:", uploadedItem.path);
      console.log("Signature:", signature);
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Error uploading or signing metadata");
      console.error("Error during upload/sign:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SimpleMintDescription />
      <div className="flex flex-col md:flex-row items-center flex-grow pt-10">
        {/* Input Fields Section */}
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

        {/* JSON Display Section */}
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0">
          <LazyReactJson
            style={{ padding: "1rem", borderRadius: "0.75rem" }}
            src={yourJSON}
            theme="solarized"
            enableClipboard={false}
            onEdit={edit => setYourJSON(edit.updated_src)}
            onAdd={add => setYourJSON(add.updated_src)}
            onDelete={del => setYourJSON(del.updated_src)}
          />

          <button
            className={`btn btn-secondary mt-4 ${loading ? "loading" : ""}`}
            disabled={loading}
            onClick={handleSignAndUpload}
          >
            Upload metadata & Sign
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
