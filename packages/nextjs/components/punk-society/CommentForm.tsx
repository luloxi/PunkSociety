import { useState } from "react";
import { useAccount } from "wagmi";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface CommentFormProps {
  postId: bigint;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync } = useScaffoldWriteContract("PunkSociety");

  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (!connectedAddress) {
      notification.error("Please connect your wallet");
      return;
    }

    if (comment.trim() === "") {
      notification.error("Comment cannot be empty");
      return;
    }

    if (comment.length > 250) {
      notification.error("Comment must be less than 250 characters");
      return;
    }

    try {
      await writeContractAsync({
        functionName: "commentOnPost",
        args: [postId, comment],
      });
      notification.success("Comment added successfully!");
      setComment(""); // Clear the comment input
    } catch (error) {
      notification.error("Failed to add comment, please try again.");
    }
  };

  return (
    <div className="comment-input-container">
      <input
        type="text"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
        className="comment-input"
      />
      <button onClick={handleAddComment} className="comment-button">
        <PaperAirplaneIcon className="comment-icon" />
      </button>
    </div>
  );
};

export default CommentForm;
