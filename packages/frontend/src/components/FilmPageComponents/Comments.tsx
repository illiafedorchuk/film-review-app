import React, { useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";

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
          <div
            key={comment.id}
            className="flex items-start space-x-4 bg-[var(--input-bg-color)] p-4 rounded-lg shadow"
          >
            <img
              src={comment.avatarUrl}
              alt={comment.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-violet-600">{comment.name}</h3>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-color)" }}
                >
                  {comment.timestamp}
                </span>
              </div>
              <p className="mt-2" style={{ color: "var(--text-color)" }}>
                {comment.text}
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center text-green-500 focus:outline-none"
                >
                  <BiLike className="w-5 h-5 mr-1" />
                  {comment.likes}
                </button>
                <button
                  onClick={() => handleDislike(comment.id)}
                  className="flex items-center text-red-500 focus:outline-none"
                >
                  <BiDislike className="w-5 h-5 mr-1" />
                  {comment.dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <textarea
          value={newComment}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2"
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
          disabled={!newComment.trim()}
          className={`mt-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
            newComment.trim() ? "hover:bg-blue-600" : "cursor-not-allowed"
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

interface PaginationProps {
  totalComments: number;
  commentsPerPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalComments,
  commentsPerPage,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={`py-2 px-3 leading-tight ${
                number === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300"
              }`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Comments;
