import { useEffect, useState } from "react";
import Image from "next/image";
// import { parseEther } from "viem";
import { useAccount } from "wagmi";
import Modal from "~~/components/punk-society/Modal";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface LikeButtonProps {
  postId: bigint;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const [likedPost, setLikedPost] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
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

  const { data: isLikedPost } = useScaffoldReadContract({
    contractName: "PunkSociety",
    functionName: "userToPostLikes",
    args: [connectedAddress, postId],
    watch: true,
  });

  const { data: postLikes } = useScaffoldReadContract({
    contractName: "PunkSociety",
    functionName: "postToLikes",
    args: [postId],
    watch: true,
  });

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

  const handleLikePost = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    if (allowance === undefined || parseInt(allowance.toString()) < 1 * 1e6) {
      setShowModal(true);
      return;
    }

    setLikedPost(true); // Optimistically update the state
    setLikeCount(prevCount => prevCount + 1); // Optimistically update the like count

    try {
      await writeContractAsync({
        functionName: "likePost",
        args: [postId],
        // value: parseEther("1"),
      });
      notification.success("Liked successfully!");
    } catch (error) {
      setLikedPost(false); // Revert the optimistic update if the transaction fails
      setLikeCount(prevCount => prevCount - 1); // Revert the like count
      notification.error("Liking failed, please try again.");
    }
  };

  const handleUnlikePost = async () => {
    setLikedPost(false); // Optimistically update the state
    setLikeCount(prevCount => prevCount - 1); // Optimistically update the like count

    try {
      await writeContractAsync({
        functionName: "unlikePost",
        args: [postId],
        // value: parseEther("0.5"),
      });
      notification.success("Unliked successfully!");
    } catch (error) {
      console.error("Error during unliking:", error);
      notification.error("Unliking failed, please try again.");
      setLikedPost(true); // Revert the state if the transaction fails
      setLikeCount(prevCount => prevCount + 1); // Revert the like count
    }
  };

  // useEffect(() => {
  //   if (allowance !== undefined && parseInt(allowance.toString()) < 1 * 1e6) {
  //     setShowModal(true);
  //   }
  // }, [allowance]);

  useEffect(() => {
    if (isLikedPost !== undefined) {
      setLikedPost(isLikedPost);
    }
  }, [isLikedPost]);

  useEffect(() => {
    if (postLikes !== undefined) {
      setLikeCount(Number(postLikes));
    }
  }, [postLikes]);

  return (
    <div className="like-button-container">
      <button
        onClick={likedPost ? handleUnlikePost : handleLikePost}
        className={`like-button ${likedPost ? "liked" : "unliked"}`}
      >
        {likedPost ? "❤️" : "🩶"}
      </button>
      <span className="like-counter">{likeCount}</span>

      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div className="flex flex-col items-center gap-3">
            <h2 className="mt-2 text-xl font-bold">Insufficient USDC Allowance!</h2>
            <span className="text-red-600">Please increase your USDC allowance to like the post.</span>
            <span className="flex flex-row items-center justify-center gap-2">
              Current Balance:{" "}
              <span className="flex items-center justify-center gap-1 text-lg text-blue-600 font-bold">
                <Image src="/usdc-logo.png" alt="USDC" width={20} height={20} className="inline-block" />
                {formattedUsdcBalance}
              </span>
            </span>
            <InputBase placeholder="USDC value here (1.00)" value={allowanceAmount} onChange={setAllowanceAmount} />
            <div className="flex items-center mb-2">
              <button className="cool-button" onClick={handleAllowanceChange}>
                Increase allowance
              </button>
            </div>
          </div>
        </Modal>
      )}
      <style jsx>{`
        .like-button-container {
          display: flex;
          align-items: center;
        }
        .like-button {
          font-size: 24px; /* Adjust the size of the heart icon */
          border: none;
          background: none;
          cursor: pointer;
        }
        .like-counter {
          margin-left: 8px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default LikeButton;
