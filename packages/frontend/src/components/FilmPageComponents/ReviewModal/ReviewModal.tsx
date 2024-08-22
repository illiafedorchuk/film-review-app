/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewDetails from "./ReviewDetails";
import { BiX } from "react-icons/bi";
import { deleteReview } from "../../../lib/api"; // Import the deleteReview function

interface ReviewModalProps {
  open: boolean;
  reviewId: number;
  onClose: () => void;
  hasReview: boolean;
  movieDetails: {
    movie_Id: number;
    title: string;
    release_date: string;
    backdropUrl: string;
    vote_average: number;
    posterUrl: string;
    genre_ids: number[];
    review?: {
      id: number;
      ratings: { [key: string]: number };
      text: string;
      rating: number;
    };
  };
  token: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  reviewId,
  open,
  onClose,
  hasReview,
  movieDetails,
  token,
}) => {
  console.log("rr" + movieDetails?.review?.id); // Debug log
  const [isEditing, setIsEditing] = useState(false);
  const [currentRatings, setCurrentRatings] = useState(
    movieDetails.review?.ratings || {
      Cast: 5,
      Plot: 5,
      Direction: 5,
      Cinematography: 5,
      "Writing/Script": 5,
      "Themes/Idea": 5,
    }
  );
  const [reviewText, setReviewText] = useState(movieDetails.review?.text || "");

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (
    ratings: { [key: string]: number },
    text: string
  ) => {
    setCurrentRatings(ratings);
    setReviewText(text);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!reviewId) {
      console.log(reviewId);
      alert("No review to delete.");
      return;
    }

    try {
      await deleteReview(reviewId, token); // Call the deleteReview API
      alert("Review deleted successfully");
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      alert("Failed to delete the review.");
    }
  };

  return (
    open && (
      <div className="fixed inset-0 flex justify-center items-center z-50 text-[var(--text-color)]">
        <div
          className="fixed inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        ></div>
        <div className="relative w-[90%] max-w-3xl h-[80%] md:h-[90%] lg:h-[90%] xl:h-[90%] rounded-2xl overflow-hidden shadow-lg z-20 bg-[var(--bg-color)]">
          <div className="p-6 overflow-y-auto h-full flex flex-col custom-scrollbar">
            <div className="flex justify-end">
              <button onClick={onClose} className="text-black">
                <BiX size={28} />
              </button>
            </div>
            {hasReview && !isEditing ? (
              <ReviewDetails
                movie_Id={movieDetails.movie_Id}
                backdropUrl={movieDetails.backdropUrl}
                posterUrl={movieDetails.posterUrl}
                ratings={currentRatings}
                text={reviewText}
                title={movieDetails.title}
                onEdit={handleEdit}
                reviewId={reviewId || 0} // Pass the correct reviewId
                onDelete={handleDelete} // Pass the delete handler
              />
            ) : (
              <ReviewForm
                movie_Id={movieDetails.movie_Id}
                backdropUrl={movieDetails.backdropUrl}
                posterUrl={movieDetails.posterUrl}
                title={movieDetails.title}
                initialRatings={currentRatings}
                initialText={reviewText}
                onSubmit={handleFormSubmit}
                token={token}
                releaseDate={movieDetails.release_date}
                voteAverage={movieDetails.vote_average}
                genreIds={[...movieDetails.genre_ids]}
                hasExistingReview={hasReview}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
