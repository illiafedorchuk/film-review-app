import React, { useState } from "react";
import CustomSlider from "./CustomSlider";

interface ReviewFormProps {
  backdropUrl: string;
  posterUrl: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ backdropUrl, posterUrl }) => {
  const [ratings, setRatings] = useState({
    Atmosphere: 4,
    Plot: 7,
    Puzzles: 6,
    Action: 4,
    Purity: 4,
    Team: 4,
  });

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [key]: value,
    }));
  };

  return (
    <>
      <div
        className="w-full h-44 bg-cover bg-center mb-4 rounded-md"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="w-24 h-36 bg-cover bg-center mt-4 ml-4 rounded-md shadow-lg" style={{ backgroundImage: `url(${posterUrl})` }}></div>
      </div>
      <p className="mb-4">Your feedback</p>
      <textarea
        className="w-full h-40 mb-4 p-3 rounded-2xl focus:outline-none focus:ring-2 resize-none"
        placeholder="Write your review..."
        style={{
          backgroundColor: "var(--input-bg-color)",
          borderColor: "var(--input-border-color)",
          color: "var(--text-color)",
        }}
      ></textarea>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {Object.keys(ratings).map((key) => (
          <div key={key} className="flex flex-col items-center mb-4">
            <p className="mb-2 pb-6">{key}</p>
            <CustomSlider
              value={ratings[key as keyof typeof ratings]}
              onChange={(e, value) => handleRatingChange(key, value as number)}
              step={1}
              min={1}
              max={10}
              valueLabelDisplay="on"
              marks={[
                { value: 1, label: "1" },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 },
                { value: 6 },
                { value: 7 },
                { value: 8 },
                { value: 9 },
                { value: 10, label: "10" },
              ]}
            />
          </div>
        ))}
      </div>
      <button className="bg-violet-500 text-white py-2 px-4 rounded-md w-full mt-4">
        Give feedback
      </button>
    </>
  );
};

export default ReviewForm;
