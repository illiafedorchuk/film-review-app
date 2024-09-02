import React, { useState } from "react";
import { createComment } from "../../lib/api";

interface CommentFormProps {
  movieId: number; // Assuming you have a movieId prop
}

const CommentForm: React.FC<CommentFormProps> = ({ movieId }) => {
  console.log(movieId);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await createComment(movieId, newComment);
      console.log("Comment created:", response);

      // Clear the textarea after a successful post
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      setError("Failed to post comment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold pb-5">Write your comment here</h1>
      <textarea
        value={newComment}
        onChange={handleInputChange}
        className="w-full p-3 rounded-2xl focus:outline-none focus:ring-2 resize-none"
        rows={4}
        placeholder="Write a comment..."
        style={{
          backgroundColor: "var(--input-bg-color)",
          borderColor: "var(--input-border-color)",
          color: "var(--text-color)",
        }}
      ></textarea>
      <button
        onClick={handlePostComment}
        disabled={isLoading || !newComment.trim()}
        className={`mt-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
          newComment.trim() ? "hover:bg-violet-600" : "cursor-not-allowed"
        }`}
        style={{
          backgroundColor: newComment.trim()
            ? "var(--button-bg-color)"
            : "var(--border-color)",
          color: "var(--button-text-color)",
        }}
      >
        {isLoading ? "Posting..." : "Post Comment"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CommentForm;
