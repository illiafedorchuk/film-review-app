import React, { useState } from "react";

const reactions = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
];

const FastReaction: React.FC = () => {
  const [reactionCounts, setReactionCounts] = useState(
    Array(reactions.length).fill(0)
  );

  const handleReactionClick = (index: number) => {
    const newCounts = [...reactionCounts];
    newCounts[index] += 1;
    setReactionCounts(newCounts);
  };

  return (
    <div className="mt-4 w-full ">
      <h2 className="text-xl font-bold mb-2">Reactions</h2>
      <div className="flex justify-around">
        {reactions.map((reaction, index) => (
          <div key={index} className="text-center">
            <button
              onClick={() => handleReactionClick(index)}
              className="text-3xl"
            >
              {reaction.emoji}
            </button>
            <div className="text-sm">{reactionCounts[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FastReaction;
