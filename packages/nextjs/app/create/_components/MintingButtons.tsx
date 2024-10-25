import { useState } from "react";
// import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { uploadToPinata } from "~~/utils/pinata-upload";
import { notification } from "~~/utils/scaffold-eth";

// Import the Pinata upload function

interface MintingFormProps {
  description: string;
  image: string;
  yourJSON: object;
  resetForm: () => void;
  onPostCreated: () => void;
}

export const MintingButtons: React.FC<MintingFormProps> = ({ yourJSON, resetForm, onPostCreated }) => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("PunkSociety");

  const [loading, setLoading] = useState(false);

  const uploadToIPFS = async () => {
    const notificationId = notification.loading("Uploading to Pinata...");
    try {
      const file = new Blob([JSON.stringify(yourJSON)], { type: "application/json" });
      const fileName = "PunkPostMetadata.json"; // Provide a desired file name
      const modifiedFile = new File([file], fileName, { lastModified: Date.now() });
      const uploadedItem = await uploadToPinata(modifiedFile);
      notification.remove(notificationId);
      notification.success("Metadata uploaded to Pinata");

      return uploadedItem.IpfsHash;
    } catch (error) {
      notification.remove(notificationId);
      notification.error("Failed to upload to Pinata");
      throw error;
    }
  };

  const handleCreatePost = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    setLoading(true);

    try {
      const ipfsPath = await uploadToIPFS();

      const contractResponse = await writeContractAsync({
        functionName: "createPost",
        args: [ipfsPath],
        // value: parseEther("3"),
      });

      if (contractResponse) {
        notification.success("Posted successfully!");
      }
      resetForm();
      onPostCreated();
    } catch (error) {
      console.error("Error during posting:", error);
      notification.error("Posting failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-6 gap-3">
      <div className="flex items-center">
        <button className="cool-button" disabled={loading} onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
    </div>
  );
};
