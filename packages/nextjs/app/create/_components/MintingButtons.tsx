import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
// import { parseEther } from "viem";
import Modal from "~~/components/punk-society/Modal";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState<number>();

  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("PunkSociety");
  const { writeContractAsync: USDCwriteContractAsync } = useScaffoldWriteContract("MockUSDC");

  const { data: punkSocietyContractData } = useDeployedContractInfo("PunkSociety");

  const { data: allowance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "allowance",
    args: [connectedAddress, punkSocietyContractData?.address],
    watch: true,
  });

  const { data: balanceOf } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const formattedUsdcBalance = balanceOf ? (Number(balanceOf.toString()) / 1e6).toFixed(2) : "0.00";

  useEffect(() => {
    // console.log("Allowance:", allowance?.toString());
    if (allowance !== undefined && parseInt(allowance.toString()) < 3 * 1e6) {
      // console.log("Setting showModal to true");
      setShowModal(true);
    }
  }, [allowance]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAllowanceChange = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    try {
      const contractResponse = await USDCwriteContractAsync({
        functionName: "approve",
        args: [punkSocietyContractData?.address, allowanceAmount ? BigInt(allowanceAmount * 1e6) : BigInt(0)],
      });

      if (contractResponse) {
        notification.success("Allowance increased successfully!");
      }
    } catch (error) {
      console.error("Error increasing allowance:", error);
      notification.error("Increasing allowance failed, please try again.");
    } finally {
      setShowModal(false);
    }
  };

  const uploadToIPFS = async () => {
    // const notificationId = notification.loading("Uploading to Pinata...");
    try {
      const file = new Blob([JSON.stringify(yourJSON)], { type: "application/json" });
      const fileName = "PunkPostMetadata.json"; // Provide a desired file name
      const modifiedFile = new File([file], fileName, { lastModified: Date.now() });
      const uploadedItem = await uploadToPinata(modifiedFile);
      // notification.remove(notificationId);
      // notification.success("Metadata uploaded to Pinata");

      return uploadedItem.IpfsHash;
    } catch (error) {
      // notification.remove(notificationId);
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
    <>
      <div className="flex flex-col justify-center items-center mt-6 gap-3">
        <div className="flex items-center">
          {/* <span>{allowance?.toString()}</span> */}
          <button className="cool-button" disabled={loading} onClick={handleCreatePost}>
            Create Post ($3)
          </button>
        </div>
      </div>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="mt-2 text-xl font-bold">Insufficient USDC Allowance!</h2>
            <span className="text-red-600">Please increase your USDC allowance to use the platform.</span>
            <span className="flex flex-row items-center justify-center gap-2">
              Current Balance:{" "}
              <span className="flex items-center justify-center gap-1 text-lg text-blue-600 font-bold">
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                {formattedUsdcBalance}
              </span>
            </span>
            <InputBase placeholder="USDC value here (3.00)" value={allowanceAmount} onChange={setAllowanceAmount} />
            <div className="flex items-center mb-2">
              <button className="cool-button" disabled={loading} onClick={handleAllowanceChange}>
                Increase allowance
              </button>
            </div>
            {/* <button onClick={handleCloseModal}>Close</button> */}
            {/* Add your logic to increase the allowance here */}
          </div>
        </Modal>
      )}
    </>
  );
};
