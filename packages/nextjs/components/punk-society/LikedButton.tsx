import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface LikeButtonProps {
  postId: bigint;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const [likedPost, setLikedPost] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("PunkSociety");

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

  const handleLikePost = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    setLikedPost(true); // Optimistically update the state
    setLikeCount(prevCount => prevCount + 1); // Optimistically update the like count

    try {
      await writeContractAsync({
        functionName: "likePost",
        args: [postId],
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
      });
      notification.success("Unliked successfully!");
    } catch (error) {
      console.error("Error during unliking:", error);
      notification.error("Unliking failed, please try again.");
      setLikedPost(true); // Revert the state if the transaction fails
      setLikeCount(prevCount => prevCount + 1); // Revert the like count
    }
  };

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
