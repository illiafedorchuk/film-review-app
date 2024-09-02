import React, { useState, useEffect } from "react";
import ReviewForm from "./ReviewForm";
import ReviewDetails from "./ReviewDetails";
import { BiX } from "react-icons/bi";
import { deleteReview, fetchUserReview } from "../../../lib/api";

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
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  reviewId,
  open,
  onClose,
  hasReview,
  movieDetails,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [reviewData, setReviewData] = useState<
    | {
        id: number;
        ratings: { [key: string]: number };
        text: string;
        rating: number;
      }
    | undefined
  >(movieDetails.review);

  useEffect(() => {
    if (open && hasReview) {
      fetchReviewData(); // Fetch review data when modal is open
    }
  }, [open, hasReview]);

  const fetchReviewData = async () => {
    try {
      const data = await fetchUserReview(movieDetails.movie_Id);
      if (data && data.length > 0) {
        setReviewData({
          id: data[0].id,
          ratings: data[0].criteriaRatings || {},
          text: data[0].comment || "",
          rating: data[0].rating || 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch review data:", error);
    }
  };

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
    try {
      if (!reviewId) {
        console.error("No review to delete");
        return;
      }

      await deleteReview(reviewId);

      setReviewData(undefined);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const handleReviewUpdated = (
    updatedRatings: { [key: string]: number },
    updatedText: string
  ) => {
    setReviewData((prevData) => ({
      ...prevData!,
      ratings: updatedRatings,
      text: updatedText,
    }));
    setIsEditing(false);
  };

  const handleReviewSubmission = async () => {
    // Callback for when review form submission is complete
    setIsEditing(false);
    await fetchReviewData(); // Fetch updated review data after submission
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

            {hasReview && !isEditing && reviewData ? (
              <ReviewDetails
                movie_Id={movieDetails.movie_Id}
                backdrop_path={backdropFullUrl || ""}
                posterUrl={posterFullUrl || ""}
                ratings={reviewData.ratings}
                text={reviewData.text || "No review text"}
                title={movieDetails.title}
                onEdit={handleEdit}
                reviewId={reviewId}
                onDelete={handleDelete}
              />
            ) : (
              <ReviewForm
                movie_Id={movieDetails.movie_Id}
                backdrop_path={backdropFullUrl || ""}
                posterUrl={posterFullUrl || ""}
                title={movieDetails.title}
                initialRatings={
                  reviewData?.ratings || {
                    Cast: 5,
                    Plot: 5,
                    Direction: 5,
                    Cinematography: 5,
                    "Writing/Script": 5,
                    "Themes/Idea": 5,
                  }
                }
                initialText={reviewData?.text || ""}
                onSubmit={handleReviewUpdated}
                releaseDate={movieDetails.release_date}
                voteAverage={movieDetails.vote_average}
                genreIds={movieDetails.genre_ids}
                hasExistingReview={hasReview}
                onReviewUpdated={handleReviewSubmission}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
