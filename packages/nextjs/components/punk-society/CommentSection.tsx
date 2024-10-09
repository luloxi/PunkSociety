import CommentForm from "./CommentForm";

interface CommentSectionProps {
  postId: bigint;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  return (
    <div className="comment-section-container">
      <CommentForm postId={postId} />
    </div>
  );
};

export default CommentSection;
