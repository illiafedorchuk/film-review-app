import React, { useState } from "react";
import { BiSolidStar } from "react-icons/bi";
import ReviewModal from "./ReviewModal";

interface ReviewProps {
  rating?: number;
}

const YourReviewArea: React.FC<ReviewProps> = ({ rating }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const movieDetails = {
    title: "Movie Title",
    backdrop_path: "/path/to/backdrop.jpg",
    poster_path: "/path/to/poster.jpg",
  };

  return (
    <div className="relative pl-0 py-10 md:pl-14 lg:w-[70%] md:w-full cursor-pointer">
      {isModalOpen && (
        <ReviewModal
          title={movieDetails.title}
          backdropUrl={`${BASE_URL}${movieDetails.backdrop_path}`}
          posterUrl={`${BASE_URL}${movieDetails.poster_path}`}
          onClose={() => setModalOpen(false)}
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
              {rating && rating > 0 ? (
                <>
                  <span className="text-lg font-semibold text-white">
                    You mark this film
                  </span>
                  <span className="font-bold text-xl ml-2 text-yellow-300">
                    {rating}
                  </span>
                  <span className="ml-1 text-xl font-bold text-yellow-300">
                    / 10
                  </span>
                  <BiSolidStar className="text-yellow-300 text-2xl ml-2" />
                </>
              ) : (
                <span className="text-xl text-white font-bold">
                  Click here to review!
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
