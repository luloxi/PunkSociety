import { useState } from "react";
import { useAccount, useSignTypedData } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { EIP_712_DOMAIN, EIP_712_TYPES__START_COLLECTION } from "~~/utils/eip712";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";

interface MintingFormProps {
  collectionName: string;
  collectionSymbol: string;
  description: string;
  image: string;
  animationUrl: string;
  attributes: { traitType: string; value: string }[];
  usdPrice: string;
  maxSupply: string;
  yourJSON: object;
  setUploadedIpfsPath: (path: string) => void;
  resetForm: () => void;
}

export const MintingForm: React.FC<MintingFormProps> = ({
  collectionName,
  collectionSymbol,
  description,
  image,
  animationUrl,
  attributes,
  usdPrice,
  maxSupply,
  yourJSON,
  setUploadedIpfsPath,
  resetForm,
}) => {
  const { address: connectedAddress } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { writeContractAsync } = useScaffoldWriteContract("SimpleMint");

  const [loading, setLoading] = useState(false);
  const [isGaslessMinting, setIsGaslessMinting] = useState(false);

  const handleToggle = () => {
    setIsGaslessMinting(!isGaslessMinting);
  };

  const uploadToIPFS = async () => {
    const notificationId = notification.loading("Uploading to IPFS...");
    try {
      const uploadedItem = await addToIPFS(yourJSON);
      notification.remove(notificationId);
      notification.success("Metadata uploaded to IPFS");

      return uploadedItem.path;
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Failed to upload to IPFS");
      throw error;
    }
  };

  const handlePaidMint = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    setLoading(true);

    try {
      const ipfsPath = await uploadToIPFS();
      setUploadedIpfsPath(ipfsPath);

      const contractResponse = await writeContractAsync({
        functionName: "startCollection",
        args: [
          collectionName,
          collectionSymbol,
          ipfsPath,
          connectedAddress,
          BigInt(Math.floor(parseInt(usdPrice) * 1e6).toString()),
          BigInt(maxSupply),
        ],
      });

      if (contractResponse) {
        notification.success("Collection started successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error during minting:", error);
      notification.error("Minting failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimpleMint = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    if (!collectionName || !collectionSymbol || !description || !image) {
      notification.error("Please fill all the required fields");
      return;
    }

    setLoading(true);
    const notificationId = notification.loading("Uploading and Signing...");

    try {
      const ipfsPath = await uploadToIPFS();
      setUploadedIpfsPath(ipfsPath);

      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__START_COLLECTION,
        primaryType: "StartCollection",
        message: {
          collectionName,
          collectionSymbol,
          description,
          image,
          animationUrl,
          attributes: JSON.stringify(attributes),
          artist: connectedAddress,
        },
      });

      notification.success("Metadata uploaded and signed!");
      console.log("IPFS Path:", ipfsPath);
      console.log("Signature:", signature);
    } catch (error) {
      notification.error("Error uploading or signing metadata");
      console.error("Error during upload/sign:", error);
    } finally {
      notification.remove(notificationId);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 gap-3">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={`toggle toggle-primary ${
            isGaslessMinting ? "checked:bg-yellow-600 hover:bg-green-600" : "bg-green-600 hover:bg-yellow-600"
          }`}
          checked={isGaslessMinting}
          onChange={handleToggle}
        />
        <span className={`ml-2 ${isGaslessMinting ? "text-yellow-600" : "text-green-600"}`}>
          {isGaslessMinting ? "Gasless Minting" : "Paid Minting"}
        </span>
      </label>

      {isGaslessMinting ? (
        <div className="flex items-center">
          <button className="cool-button" disabled={loading} onClick={handleSimpleMint}>
            Propose NFT Collection
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <button className="cool-button" disabled={loading} onClick={handlePaidMint}>
            Start NFT Collection
          </button>
        </div>
      )}
    </div>
  );
};
