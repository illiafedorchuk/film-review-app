import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";

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
}) => (
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
          onClick={() => onLike(id)}
          className="flex items-center text-green-500 focus:outline-none"
        >
          <BiLike className="w-5 h-5 mr-1" />
          {likes}
        </button>
        <button
          onClick={() => onDislike(id)}
          className="flex items-center text-red-500 focus:outline-none"
        >
          <BiDislike className="w-5 h-5 mr-1" />
          {dislikes}
        </button>
      </div>
    </div>
  </div>
);

export default CommentItem;
