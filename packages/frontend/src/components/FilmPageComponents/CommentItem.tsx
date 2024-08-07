// CommentItem.tsx

import React, { useEffect, useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import {
  fetchLikesAndDislikes,
  likeCommentApi,
  dislikeCommentApi,
} from "../../lib/api";

export const useLikeComment = (token: string) => {
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likeComment = async (commentId: number) => {
    if (liked) return; // Prevent multiple likes

    try {
      const like_count = await likeCommentApi(commentId, token);
      setLikeCount(like_count);
      setLiked(true);
      setError(null);
    } catch (err) {
      console.error("Failed to like the comment:", err);
      setError("Failed to like the comment");
    }
  };

  return { likeCount, liked, error, likeComment, setLiked };
};

export const useDislikeComment = (token: string) => {
  const [dislikeCount, setDislikeCount] = useState<number | null>(null);
  const [disliked, setDisliked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dislikeComment = async (commentId: number) => {
    if (disliked) return; // Prevent multiple dislikes

    try {
      const dislike_count = await dislikeCommentApi(commentId, token);
      setDislikeCount(dislike_count);
      setDisliked(true);
      setError(null);
    } catch (err) {
      console.error("Failed to dislike the comment:", err);
      setError("Failed to dislike the comment");
    }
  };

  return { dislikeCount, disliked, error, dislikeComment, setDisliked };
};

interface CommentItemProps {
  id: number;
  name: string;
  avatarUrl: string;
  timestamp: string;
  text: string;
  likes: number;
  dislikes: number;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  token: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  id,
  name,
  avatarUrl,
  timestamp,
  text,
  likes,
  dislikes,
  onLike,
  onDislike,
  token,
}) => {
  const [currentLikes, setCurrentLikes] = useState<number>(likes);
  const [currentDislikes, setCurrentDislikes] = useState<number>(dislikes);
  const { likeCount, liked, likeComment, setLiked } = useLikeComment(token);
  const { dislikeCount, disliked, dislikeComment, setDisliked } =
    useDislikeComment(token);

  useEffect(() => {
    const loadLikesAndDislikes = async () => {
      try {
        const { like_count, dislike_count } = await fetchLikesAndDislikes(id);
        setCurrentLikes(like_count);
        setCurrentDislikes(dislike_count);
      } catch (err) {
        console.error("Failed to fetch likes and dislikes:", err);
      }
    };

    loadLikesAndDislikes();
  }, [id]);

  useEffect(() => {
    if (likeCount !== null) {
      setCurrentLikes(likeCount);
    }
  }, [likeCount]);

  useEffect(() => {
    if (dislikeCount !== null) {
      setCurrentDislikes(dislikeCount);
    }
  }, [dislikeCount]);

  const handleLike = async () => {
    await likeComment(id);
    onLike(id);
    setLiked(false);
    setDisliked(false);
    const { like_count, dislike_count } = await fetchLikesAndDislikes(id);
    setCurrentLikes(like_count);
    setCurrentDislikes(dislike_count);
  };

  const handleDislike = async () => {
    await dislikeComment(id);
    onDislike(id);
    setLiked(false);
    setDisliked(false);
    const { like_count, dislike_count } = await fetchLikesAndDislikes(id);
    setCurrentLikes(like_count);
    setCurrentDislikes(dislike_count);
  };

  return (
    <div className="flex items-start space-x-4 bg-[var(--input-bg-color)] p-4 rounded-lg shadow">
      <img
        src={avatarUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-violet-600">{name}</h3>
          <span className="text-sm" style={{ color: "var(--text-color)" }}>
            {timestamp}
          </span>
        </div>
        <p
          className="mt-2 break-words"
          style={{
            color: "var(--text-color)",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </p>
        <div className="flex items-center mt-2 space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center focus:outline-none ${
              liked ? "text-gray-500" : "text-green-500"
            }`}
            disabled={liked}
          >
            <BiLike className="w-5 h-5 mr-1" />
            {currentLikes}
          </button>
          <button
            onClick={handleDislike}
            className={`flex items-center focus:outline-none ${
              disliked ? "text-gray-500" : "text-red-500"
            }`}
            disabled={disliked}
          >
            <BiDislike className="w-5 h-5 mr-1" />
            {currentDislikes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
