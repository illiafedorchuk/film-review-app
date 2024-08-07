import React, { useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import axios from "axios";

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
  token: string; // Pass the token to the component
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
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes
    try {
      const response = await axios.post(
        `http://localhost:3000/comment/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setCurrentLikes(response.data.like_count);
      setLiked(true);
      setDisliked(false);
      onLike(id);
    } catch (error) {
      console.error("Failed to like the comment:", error);
    }
  };

  const handleDislike = async () => {
    console.log("token" + token);
    if (disliked) return; // Prevent multiple dislikes
    try {
      const response = await axios.post(
        `http://localhost:3000/comment/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      setCurrentDislikes(response.data.dislike_count);
      setDisliked(true);
      setLiked(false);
      onDislike(id);
    } catch (error) {
      console.error("Failed to dislike the comment:", error);
    }
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
