import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Pagination from "./Pagination";
import { fetchComments } from "../../lib/api";
import { User } from "../../types/types";

interface Comment {
  id: number;
  movie_id: number;
  text: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  user: User | null;
}

interface CommentsProps {
  movieId: number;
  commentsPerPage: number;
}

const Comments: React.FC<CommentsProps> = ({ movieId, commentsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentData, setCommentData] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(movieId);
        setCommentData(fetchedComments);
      } catch (error) {
        setError("Failed to load comments. Please try again later.");
        console.error(error);
      }
    };

    loadComments();
  }, [movieId]);

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

  const handleDelete = (id: number) => {
    setCommentData((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
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
              key={comment.id}
              id={comment.id}
              userId={comment.user!.id}
              name={comment.user!.name}
              avatarUrl={comment.user!.avatarUrl}
              timestamp={new Date(comment.createdAt).toLocaleString()}
              text={comment.text}
              likes={comment.likes}
              dislikes={comment.dislikes}
              onLike={handleLike}
              onDislike={handleDislike}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
      <CommentForm movieId={movieId} />
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
