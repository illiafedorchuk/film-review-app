/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import ReviewChart from "./ReviewChart";

interface ReviewDetailsProps {
  movie_Id: number;
  ratings: { [key: string]: number };
  text: string;
  backdropUrl: string;
  posterUrl: string;
  title: string;
  onEdit: () => void;
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({
  movie_Id,
  ratings = {},
  text,
  backdropUrl,
  posterUrl,
  title,
  onEdit,
}) => {
  console.log("id:", movie_Id);
  const backdropFullUrl = "https://image.tmdb.org/t/p/original" + backdropUrl;
  const posterFullUrl = "https://image.tmdb.org/t/p/original" + posterUrl;

  const averageScore =
    Object.values(ratings).reduce((sum, value) => sum + value, 0) /
    (Object.keys(ratings).length || 1); // Prevent division by zero

  const reviewRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={reviewRef}>
      <div className="relative mb-4">
        <img
          src={backdropFullUrl}
          alt=""
          className="rounded-xl w-full h-48 sm:h-64 md:h-72 lg:h-96 bg-cover bg-center brightness-50"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center">
          <img
            src={posterFullUrl}
            alt=""
            className="w-24 h-32 sm:w-32 sm:h-44 md:w-36 md:h-52 lg:w-48 lg:h-64 bg-cover bg-center rounded-md shadow-lg"
          />
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ml-4">
            {title}
          </h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center w-full mt-10">
        Your <span className="text-violet-600">scores</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {Object.keys(ratings).map((key) => (
          <ReviewChart key={key} score={ratings[key]} label={key} />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between mb-4 rounded-lg p-4">
        <div className="w-full sm:w-2/3 mt-4 sm:mt-0 bg-[var(--input-bg-color)] p-3 rounded-lg max-h-48 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2 ">Your Review</h2>
          <p className="break-words">
            {text || "Cmon bro, write there something..."}{" "}
          </p>
        </div>
        <div className="w-full sm:w-1/3 flex flex-col items-center justify-center md:ml-4 mt-10 rotate-6">
          <div className="rounded-t-xl bg-violet-500 text-[var(--button-text-color)] px-4 py-2 w-full text-center">
            Total Score
          </div>
          <div className="rounded-b-xl bg-white dark:bg-[#2c2c2c] text-violet-600 text-3xl font-bold text-center px-4 py-2 w-full">
            {averageScore.toFixed(1)}/10
          </div>
        </div>
      </div>

      <button
        className="bg-violet-500 text-white py-2 px-4 rounded-md"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
};

export default ReviewDetails;
