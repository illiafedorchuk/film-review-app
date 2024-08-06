// FastReactions.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const reactions = [
  { emoji: "👍", label: "like" },
  { emoji: "❤️", label: "love" },
  { emoji: "😂", label: "smile" },
  { emoji: "😮", label: "wow" },
  { emoji: "😢", label: "sad" },
  { emoji: "😡", label: "angry" },
];

interface FastReactionProps {
  movieId: number;
  token: string;
}

const FastReaction: React.FC<FastReactionProps> = ({ movieId, token }) => {
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [reactionCounts, setReactionCounts] = useState<{
    [key: string]: number;
  }>({
    like: 0,
    love: 0,
    smile: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });

  useEffect(() => {
    // Fetch initial reaction counts from the server
    axios
      .get(`/api/movies/${movieId}/reactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setReactionCounts(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch reactions:", error);
      });
  }, [movieId, token]);

  const handleReactionClick = (reactionType: string) => {
    const currentReaction = userReaction;
    const newReaction = currentReaction === reactionType ? null : reactionType;

    axios
      .post(
        `/api/movies/${movieId}/react`,
        { reactionType: newReaction },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setUserReaction(newReaction);
        setReactionCounts(response.data);
      })
      .catch((error) => {
        console.error("Failed to update reaction:", error);
      });
  };

  return (
    <div className="mt-4 w-full ">
      <h2 className="text-xl font-bold mb-2">Reactions</h2>
      <div className="flex justify-around">
        {reactions.map((reaction, index) => (
          <div key={index} className="text-center">
            <button
              onClick={() => handleReactionClick(reaction.label)}
              className={`text-3xl ${
                userReaction === reaction.label ? "text-blue-500" : ""
              }`}
            >
              {reaction.emoji}
            </button>
            <div className="text-sm">{reactionCounts[reaction.label]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastReaction;
