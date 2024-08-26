/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewDetails from "./ReviewDetails";
import { BiX } from "react-icons/bi";
import { deleteReview } from "../../../lib/api";

interface ReviewModalProps {
  open: boolean;
  reviewId: number;
  onClose: () => void;
  hasReview: boolean;
  movieDetails: {
    movie_Id: number;
    title: string;
    release_date: string;
    backdrop_path: string;
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
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const backdropFullUrl = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
    : null;

  const posterFullUrl = movieDetails.posterUrl
    ? `https://image.tmdb.org/t/p/original${movieDetails.posterUrl}`
    : null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (!reviewId) {
        console.error("No review to delete");
        return;
      }

      // Call the deleteReview API function
      await deleteReview(reviewId, token);

      // Clear the review data, close the modal, and reset states after deletion
      movieDetails.review = undefined;
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete review:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReviewUpdated = () => {
    setIsEditing(false); // Switch back to review details after update
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

            {hasReview && !isEditing && movieDetails.review ? (
              <ReviewDetails
                movie_Id={movieDetails.movie_Id}
                backdrop_path={backdropFullUrl || ""}
                posterUrl={posterFullUrl || ""}
                ratings={movieDetails.review.ratings}
                text={movieDetails.review.text || "No review text"}
                title={movieDetails.title}
                onEdit={handleEdit}
                reviewId={reviewId}
                onDelete={handleDelete} // Trigger delete
              />
            ) : (
              <ReviewForm
                movie_Id={movieDetails.movie_Id}
                backdrop_path={backdropFullUrl || ""}
                posterUrl={posterFullUrl || ""}
                title={movieDetails.title}
                initialRatings={movieDetails.review?.ratings || {}}
                initialText={movieDetails.review?.text || ""}
                onSubmit={handleReviewUpdated} // Pass the new callback
                token={token}
                releaseDate={movieDetails.release_date}
                voteAverage={movieDetails.vote_average}
                genreIds={movieDetails.genre_ids}
                hasExistingReview={hasReview}
                onReviewUpdated={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
