import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Pagination from "./Pagination";
import { fetchComments } from "../../lib/api";

interface Comment {
  id: number;
  movie_id: number;
  name: string;
  avatarUrl: string;
  timestamp: string;
  text: string;
  likes: number;
  dislikes: number;
}

interface CommentsProps {
  movieId: number;
  token: string;
  commentsPerPage: number;
}

const Comments: React.FC<CommentsProps> = ({
  movieId,
  token,
  commentsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentData, setCommentData] = useState<Comment[]>([]); // Ensure this is an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(movieId, token);
        if (Array.isArray(fetchedComments)) {
          // Check if fetchedComments is an array
          setCommentData(fetchedComments);
        } else {
          throw new Error("Fetched data is not an array");
        }
      } catch (error) {
        setError("Failed to load comments. Please try again later.");
        console.error(error); // Log error for debugging
      }
    };

    loadComments();
  }, [movieId, token]);

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
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          currentComments.map((comment) => (
            <CommentItem
              token={token}
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
          ))
        )}
      </div>
      <CommentForm movieId={movieId} token={token} />
      <div className="mt-6 flex justify-center">
        <Pagination
          totalComments={commentData.length}
          commentsPerPage={commentsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Comments;
