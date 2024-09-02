import React, { useState } from "react";
import CustomSlider from "./CustomSlider";
import {
  createReview,
  updateReview,
  addMovieToDatabase,
} from "../../../lib/api";

interface ReviewFormProps {
  movie_Id: number;
  backdrop_path: string;
  posterUrl: string;
  title: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: number[];
  initialRatings: { [key: string]: number };
  initialText: string;
  onSubmit: (ratings: { [key: string]: number }, text: string) => void;
  hasExistingReview: boolean;
  onReviewUpdated: (
    updatedRatings: { [key: string]: number },
    updatedText: string
  ) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  movie_Id,
  backdrop_path,
  posterUrl,
  title,
  releaseDate,
  voteAverage,
  genreIds,
  initialRatings,
  initialText,

  hasExistingReview,
  onReviewUpdated,
}) => {
  const [ratings, setRatings] = useState(initialRatings);
  const [text, setText] = useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);

  const handleRatingChange = (key: string, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [key]: value,
    }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setText(value);
      setTextLength(value.length);
    }
  };

  const handleSubmit = async () => {
    try {
      const criteriaRatings = {
        Cast: ratings["Cast"],
        Plot: ratings["Plot"],
        Direction: ratings["Direction"],
        Cinematography: ratings["Cinematography"],
        "Writing/Script": ratings["Writing/Script"],
        "Themes/Idea": ratings["Themes/Idea"],
      };

      const overallRating =
        Object.values(criteriaRatings).reduce((a, b) => a + b, 0) /
        Object.values(criteriaRatings).length;

      // Add the movie to the database first
      await addMovieToDatabase({
        id: movie_Id,
        title,
        poster_path: posterUrl.replace(
          "https://image.tmdb.org/t/p/original",
          ""
        ),
        backdrop_path: backdrop_path.replace(
          "https://image.tmdb.org/t/p/original",
          ""
        ),
        release_date: releaseDate,
        vote_average: voteAverage,
        genre_ids: genreIds,
      });

      if (hasExistingReview) {
        // If there's an existing review, update it
        await updateReview(movie_Id, overallRating, text, criteriaRatings);
      } else {
        // If no existing review, create a new one
        await createReview(
          movie_Id,
          overallRating,
          text,
          criteriaRatings,
          title,
          posterUrl.replace("https://image.tmdb.org/t/p/original", ""),
          releaseDate,
          voteAverage,
          genreIds
        );
      }

      // Call the parent callback with updated data
      onReviewUpdated(ratings, text);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <>
      <div className="relative mb-4">
        <img
          src={backdrop_path}
          alt=""
          className="rounded-xl w-full h-48 sm:h-64 md:h-72 lg:h-96 bg-cover bg-center brightness-50"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 flex items-center">
          <img
            src={posterUrl}
            alt=""
            className="w-24 h-32 sm:w-32 sm:h-44 md:w-36 md:h-52 lg:w-48 lg:h-64 bg-cover bg-center rounded-md shadow-lg"
          />
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ml-4">
            {title}
          </h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center my-5">
        Rate <span className="text-violet-600"> this movie</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 font-semibold">
        {Object.keys(ratings).map((key) => (
          <div
            key={key}
            className="flex flex-col items-center mb-4 bg-[var(--input-bg-color)] rounded-xl p-5"
          >
            <p className="mb-2 pb-6">{key}</p>
            <CustomSlider
              value={ratings[key as keyof typeof ratings]}
              onChange={(_, value) => handleRatingChange(key, value as number)}
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
      <h1 className="mb-4 text-2xl font-bold text-center">
        Additional <span className="text-violet-600">Information</span>
      </h1>
      <div className="h-48">
        <textarea
          className="w-full h-40 mb-2 p-3 rounded-2xl focus:outline-none focus:ring-2 resize-none"
          placeholder="Write your review..."
          value={text}
          onChange={handleTextChange}
          style={{
            backgroundColor: "var(--input-bg-color)",
            borderColor: "var(x--input-border-color)",
            color: "var(--text-color)",
          }}
        ></textarea>
      </div>
      <p className="text-right mb-4">{textLength}/500</p>

      <button
        className="bg-violet-500 text-white py-2 px-4 rounded-md w-full mt-4"
        onClick={handleSubmit}
      >
        Give feedback
      </button>
    </>
  );
};

export default ReviewForm;
