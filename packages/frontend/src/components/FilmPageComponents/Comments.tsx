import React, { useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Pagination from "./Pagination";

interface Comment {
  id: number;
  name: string;
  avatarUrl: string;
  timestamp: string;
  text: string;
  likes: number;
  dislikes: number;
}

interface CommentsProps {
  comments: Comment[];
  commentsPerPage: number;
}

const Comments: React.FC<CommentsProps> = ({ comments, commentsPerPage }) => {
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [commentData, setCommentData] = useState(comments);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: commentData.length + 1,
        name: "New User",
        avatarUrl: "https://via.placeholder.com/48",
        timestamp: new Date().toLocaleString(),
        text: newComment,
        likes: 0,
        dislikes: 0,
      };
      setCommentData([...commentData, newCommentData]);
      setNewComment("");
    }
  };

  const handleLike = (id: number) => {
    setCommentData((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleDislike = (id: number) => {
    setCommentData((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment
      )
    );
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentData.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className="w-full my-8 p-6 rounded-lg"
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
    >
      <h2 className="text-3xl font-extrabold mb-6">Comments</h2>
      <div className="space-y-6">
        {currentComments.map((comment) => (
          <CommentItem
            key={comment.id}
            id={comment.id}
            name={comment.name}
            avatarUrl={comment.avatarUrl}
            timestamp={comment.timestamp}
            text={comment.text}
            likes={comment.likes}
            dislikes={comment.dislikes}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
      </div>
      <CommentForm
        newComment={newComment}
        onInputChange={handleInputChange}
        onPostComment={handlePostComment}
      />
      <div className="mt-6 flex justify-center">
        <Pagination
          totalComments={comments.length}
          commentsPerPage={commentsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Comments;
