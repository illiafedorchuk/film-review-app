/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { BiSolidStar } from "react-icons/bi";
import ReviewModal from "./ReviewModal/ReviewModal";
import { fetchUserReview } from "../../lib/api";

interface ReviewProps {
  rating: number;
  details: any;
  token: string;
}

const YourReviewArea: React.FC<ReviewProps> = ({ details, token }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);
  const [hasRated, setHasRated] = useState<boolean>(false);

  useEffect(() => {
    const loadUserReview = async () => {
      try {
        const reviews = await fetchUserReview(details.id, token);
        if (reviews && reviews.length > 0) {
          const review = reviews[0];
          setUserReview({
            ratings: review.criteriaRatings || {},
            text: review.comment || "",
            rating: review.rating || 0,
          });
          setHasRated(true);
        } else {
          // Initialize with default ratings
          setUserReview({
            ratings: {
              Cast: 5,
              Plot: 5,
              Direction: 5,
              Cinematography: 5,
              "Writing/Script": 5,
              "Themes/Idea": 5,
            },
            text: "",
            rating: 0,
          });
          setHasRated(false);
        }
        console.log("User Review Loaded:", reviews); // Debug log
      } catch (error) {
        console.error("Error loading user review:", error);
        setUserReview({
          ratings: {
            Cast: 5,
            Plot: 5,
            Direction: 5,
            Cinematography: 5,
            "Writing/Script": 5,
            "Themes/Idea": 5,
          },
          text: "",
          rating: 0,
        });
        setHasRated(false);
      }
    };

    loadUserReview();
  }, [details.id, token]);

  const handleClose = () => setModalOpen(false);

  const userRating =
    typeof userReview?.rating === "number"
      ? userReview.rating
      : parseFloat(userReview?.rating || "0");

  return (
    <div className="relative pl-0 py-10 md:pl-14 lg:w-[70%] md:w-full cursor-pointer">
      {isModalOpen && (
        <ReviewModal
          open={isModalOpen}
          onClose={handleClose}
          hasReview={hasRated}
          movieDetails={{
            movie_Id: details.id,
            title: details.title,
            release_date: details.release_date,
            backdropUrl: `https://image.tmdb.org/t/p/original${details.backdrop_path}`,
            vote_average: details.vote_average,
            posterUrl: `https://image.tmdb.org/t/p/original${details.poster_path}`,
            genre_ids: [],
            review: userReview,
          }}
          token={token}
        />
      )}
      <div
        className="rounded-lg bg-violet-500"
        onClick={() => setModalOpen(true)}
      >
        <div className="rounded-lg bg-[var(--link-hover-color)] relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="bg-[var(--button-bg-color)] rounded-lg w-full h-full flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-[0_0_30px_3px_rgba(100,0,300,0.3)]">
            <h1 className="text-lg font-bold mb-2 text-white">Your Review</h1>
            <div className="flex items-center mb-2">
              {hasRated ? (
                <>
                  <span className="text-lg font-semibold text-white">
                    You rated this film
                  </span>
                  <span className="font-bold text-xl ml-2 text-yellow-300">
                    {userRating.toFixed(1)}
                  </span>
                  <span className="ml-1 text-xl font-bold text-yellow-300">
                    / 10
                  </span>
                  <BiSolidStar className="text-yellow-300 text-2xl ml-2" />
                </>
              ) : (
                <span className="text-xl text-white font-bold">
                  You haven't rated this film yet.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourReviewArea;
