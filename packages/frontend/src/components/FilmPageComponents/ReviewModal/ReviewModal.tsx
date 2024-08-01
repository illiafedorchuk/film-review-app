import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewDetails from "./ReviewDetails";
import { BiX } from "react-icons/bi";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  hasReview: boolean;
  movieDetails: {
    movie_Id: number;
    title: string;
    backdropUrl: string;
    posterUrl: string;
    review?: {
      ratings: { [key: string]: number };
      text: string;
      rating: number;
    };
  };
  token: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onClose,
  hasReview,
  movieDetails,
  token,
}) => {
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
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ReviewModal;
