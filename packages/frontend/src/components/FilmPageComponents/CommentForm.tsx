import React from "react";

interface CommentFormProps {
  newComment: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPostComment: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  newComment,
  onInputChange,
  onPostComment,
}) => (
  <div className="mt-6">
    <h1 className="text-xl font-bold pb-5">Write your comment here</h1>
    <textarea
      value={newComment}
      onChange={onInputChange}
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
      onClick={onPostComment}
      disabled={!newComment.trim()}
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
      Post Comment
    </button>
  </div>
);

export default CommentForm;
