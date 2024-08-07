// FastReactions.tsx
import React, { useState, useEffect } from "react";
import { fetchMovieReactions, addFastReaction } from "../../lib/api";

// Define available reactions
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
    const loadReactions = async () => {
      try {
        console.log("Fetching reactions for movieId:", movieId);
        const data = await fetchMovieReactions(movieId, token);
        console.log("Fetched reaction counts:", data);
        setReactionCounts(data);
      } catch (error) {
        console.error("Failed to load reactions:", error);
      }
    };

    loadReactions();
  }, [movieId, token]);

  const handleReactionClick = async (reactionType: string) => {
    try {
      console.log("Adding reaction:", reactionType);
      const newReactionCounts = await addFastReaction(
        movieId,
        reactionType,
        token
      );
      console.log("Updated reaction counts:", newReactionCounts);
      setUserReaction(reactionType === userReaction ? null : reactionType);
      setReactionCounts(newReactionCounts);
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
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
            {/* Display counter below each reaction */}
            <div className="text-sm mt-1">
              {reactionCounts[`${reaction.label}_count`] || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastReaction;
