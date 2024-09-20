"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { TextAreaBase } from "./TextAreaBase";
import generateTokenURI from "./generateTokenURI";
import { SimpleMintDescription } from "./simpleMintDescription";
import type { NextPage } from "next";
// import useSWRMutation from "swr/mutation";
import { useAccount, useSignTypedData } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { EIP_712_DOMAIN, EIP_712_TYPES__START_COLLECTION } from "~~/utils/eip712";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

// import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata";
// import { postMutationFetcher } from "~~/utils/swr";

const LazyReactJson = dynamic(() => import("react-json-view"), { ssr: false });

export const SimpleMint: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { signTypedDataAsync } = useSignTypedData(); // Hook for signing the data

  const [collectionName, setCollectionName] = useState("");
  const [collectionSymbol, setCollectionSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [animationUrl, setAnimationUrl] = useState("");
  const [attributes, setAttributes] = useState<{ traitType: string; value: string }[]>([]);
  const [usdPrice, setUsdPrice] = useState("");
  const [maxSupply, setMaxSupply] = useState("");

  const [yourJSON, setYourJSON] = useState<object>({});
  const [loading, setLoading] = useState(false);
  const [uploadedIpfsPath, setUploadedIpfsPath] = useState("");

  const [isGaslessMinting, setIsGaslessMinting] = useState(false); // New toggle state

  const { writeContractAsync } = useScaffoldWriteContract("SimpleMint");

  const handleToggle = () => {
    setIsGaslessMinting(!isGaslessMinting); // Toggle between gasless and paid
  };

  // Function to handle changes in the input fields for trait type and value
  const handleAttributeChange = (index: number, field: "traitType" | "value", value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  // Function to add a new attribute field
  const addAttribute = () => {
    setAttributes([...attributes, { traitType: "", value: "" }]);
  };

  // Function to remove an attribute by index
  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(newAttributes);
  };

  // Used for database: Check if this is working properly
  // const { trigger: postCollectionData } = useSWRMutation("/api/collections/new", postMutationFetcher); // SWR for API call

  // Automatically update the JSON whenever the fields change
  useEffect(() => {
    // Function that generates the token URI and updates the JSON
    const generateTokenURIString = () => {
      const tokenURI = generateTokenURI(collectionName, description, image, animationUrl, attributes);
      setYourJSON(JSON.parse(atob(tokenURI.split(",")[1])));
    };

    generateTokenURIString();
  }, [collectionName, description, image, animationUrl, attributes]);

  const handleMPaidMint = async () => {
    const notificationId = notification.loading("Uploading to IPFS");

    try {
      const uploadedItem = await addToIPFS(yourJSON);
      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");

      // Log IPFS path before sending to contract
      console.log("IPFS Path:", uploadedItem.path);

      if (!connectedAddress) {
        throw new Error("No connected address found.");
      }

      const contractResponse = await writeContractAsync({
        functionName: "startCollection",
        args: [
          collectionName,
          collectionSymbol,
          uploadedItem.path,
          connectedAddress,
          BigInt(Math.floor(parseInt(usdPrice) * 1e6).toString()),
          BigInt(maxSupply),
        ],
      });

      if (!contractResponse) {
        throw new Error("Contract response is null or undefined.");
      }

      console.log("Contract Response:", contractResponse);
      notification.success("Collection started successfully!");
    } catch (error) {
      notification.remove(notificationId);

      // Type guard to narrow the type of 'error'
      if (error instanceof Error) {
        console.error("Error during minting:", error);

        if (error.message.includes("gasLimit")) {
          notification.error("Minting failed due to gas limit issue, please check your network and wallet setup.");
        } else {
          notification.error("Minting failed, please try again.");
        }
      } else {
        console.error("An unknown error occurred:", error);
        notification.error("An unknown error occurred.");
      }
    }
  };

  const handleSimpleMint = async () => {
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
    <div className="min-h-screen flex flex-col justify-between">
      <SimpleMintDescription />

      {/* <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0 bg-base-100 py-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">NFT Preview</h3>
      </div> */}

      <div className="flex flex-col md:flex-row items-start flex-grow">
        {/* Input Fields Section */}
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0 py-6 top-0">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">Enter your NFT details here</h3>
            <span className="text-red-500">* required fields</span>
          </div>
          <div className="flex flex-row items-center justify-evenly">
            <div className="py-2 w-full pr-4">
              <span className="font-bold p-3 mt-64">
                Collection name <span className="text-red-500">*</span>
              </span>
              <InputBase placeholder="Picca Who?" value={collectionName} onChange={setCollectionName} />
            </div>
            <div className="py-2">
              <span className="font-bold p-3">
                Symbol <span className="text-red-500">*</span>
              </span>
              <InputBase placeholder="PW" value={collectionSymbol} onChange={setCollectionSymbol} />
            </div>
          </div>
          <div className="py-2">
            <span className="font-bold p-3">
              Description <span className="text-red-500">*</span>
            </span>

            <TextAreaBase
              name="description"
              value={description}
              onChange={setDescription}
              placeholder="Enter description"
            />
          </div>

          <div className="py-2">
            <span className="font-bold p-3">
              Image URL <span className="text-red-500">*</span>
            </span>
            <InputBase placeholder="https:// or ipfs://" value={image} onChange={setImage} />
          </div>
          <div className="py-2">
            <span className="font-bold p-3">Audio/Video URL</span>
            <InputBase placeholder="https:// or ipfs://" value={animationUrl} onChange={setAnimationUrl} />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Attributes</h3>

            {/* Button to add a new attribute */}
            <button onClick={addAttribute} className="mb-4 flex items-center bg-green-600 text-white p-2 rounded">
              <span className="mr-2">Add Attribute</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            {attributes.map((attr, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                {/* Button to remove the attribute */}
                <button onClick={() => removeAttribute(index)} className="ml-2 bg-red-500 text-white p-2 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div>
                  <span className="font-bold p-3">Trait Type:</span>
                  <InputBase
                    placeholder="Trait type"
                    value={attr.traitType}
                    onChange={value => handleAttributeChange(index, "traitType", value)}
                  />
                </div>

                <div>
                  <span className="font-bold p-3">Trait Value:</span>
                  <InputBase
                    placeholder="Value for trait"
                    value={attr.value}
                    onChange={value => handleAttributeChange(index, "value", value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* JSON Display Section */}
        <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0 bg-base-100 py-6 rounded-lg mb-10">
          <h3 className="text-2xl font-bold mb-4 text-center">NFT Preview</h3>

          {/* Flex container for media and text */}
          <div className="flex flex-row items-start space-x-4 mb-4">
            {/* Media Section */}
            {/* Media Section */}
            <div className="flex items-center justify-center w-44 h-44 bg-gray-200 rounded-lg shadow-lg relative">
              {image ? (
                <img src={image} alt="NFT Preview" className="w-full h-auto rounded-lg" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500 text-white font-bold text-center p-2 rounded-lg">
                  No image provided
                </div>
              )}
            </div>

            {/* Text Section */}
            <div className="text-left flex-1 lg:pl-3">
              <p>
                <strong>Collection Name:</strong>{" "}
                {collectionName ? (
                  <span className="text-green-600">{collectionName}</span>
                ) : (
                  <span className="text-red-500">Not provided</span>
                )}
              </p>
              <p>
                <strong>Symbol:</strong>{" "}
                {collectionSymbol ? (
                  <span className="text-green-600">{collectionSymbol}</span>
                ) : (
                  <span className="text-red-500">Not provided</span>
                )}
              </p>
              <p className="break-words">
                <strong>Description:</strong>{" "}
                {description ? (
                  <span className="text-green-600">{description}</span>
                ) : (
                  <span className="text-red-500">Not provided</span>
                )}
              </p>

              {/* Conditionally render the attributes section only if there are valid attributes */}
              {attributes.length > 0 && attributes.some(attr => attr.traitType && attr.value) && (
                <>
                  <p>
                    <strong>Attributes:</strong>
                  </p>
                  <ul className="list-disc ml-4">
                    {attributes.map(
                      (attr, index) =>
                        attr.traitType &&
                        attr.value && (
                          <li key={index} className="text-green-600">
                            {attr.traitType}: {attr.value}
                          </li>
                        ),
                    )}
                  </ul>
                </>
              )}

              {/* Conditionally render a music player if there is an animationUrl */}
              {animationUrl && (
                <video controls className="w-full h-12 my-2">
                  <source src={animationUrl} type="audio/mpeg" />
                </video>
              )}
            </div>
          </div>

          <div className="self-center w-full collapse bg-base-300">
            <input type="checkbox" />
            <div className="collapse-title text-center text-xl font-medium ">
              View <strong className="text-green-500">raw metadata</strong>
            </div>
            <div className="collapse-content">
              <LazyReactJson
                style={{ padding: "1rem", borderRadius: "0.75rem" }}
                src={yourJSON}
                theme="solarized"
                enableClipboard={false}
                onEdit={edit => setYourJSON(edit.updated_src)}
                onAdd={add => setYourJSON(add.updated_src)}
                onDelete={del => setYourJSON(del.updated_src)}
              />
            </div>
          </div>

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

          <div className="flex flex-col justify-center items-center mt-6 gap-3">
            {/* Toggle Button for Gasless Mint */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className={`toggle toggle-primary ${
                  isGaslessMinting ? "checked:bg-yellow-600 hover:bg-green-600" : "bg-green-600 hover:bg-yellow-600"
                }`}
                // className="toggle toggle-primary bg-red-500"
                checked={isGaslessMinting}
                onChange={handleToggle}
              />
              <span className={`ml-2 ${isGaslessMinting ? "text-yellow-600" : "text-green-600"}`}>
                {isGaslessMinting ? "Gasless Minting" : "Paid Minting"}
              </span>
            </label>

            {isGaslessMinting ? (
              <button
                className={`btn btn-primary hover:bg-yellow-500 py-3 px-6 bg-yellow-200 dark:bg-yellow-800 border-0 ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
                onClick={handleSimpleMint}
              >
                Propose NFT collection
              </button>
            ) : (
              <button
                className={`btn btn-primary py-3 px-6 bg-green-200 dark:bg-green-800 hover:bg-green-500 border-0 ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
                onClick={handleMPaidMint}
              >
                Start NFT collection
              </button>
            )}
          </div>

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
  );
};

// export default SimpleMint;
