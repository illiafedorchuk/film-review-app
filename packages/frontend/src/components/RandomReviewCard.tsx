import React, { useState, useEffect } from "react";
import ModalReview from "./ModalReview";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface Review {
  author: string;
  author_details: {
    avatar_path: string | null;
    name: string;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface RandomReviewCardProps {
  reviews: Review[];
}

const RandomReviewCard: React.FC<RandomReviewCardProps> = ({ reviews }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleNextReview = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 500); // Sync with animation duration
  };

  const handlePreviousReview = () => {
    setAnimate(true);
    setTimeout(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
    }, 500); // Sync with animation duration
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (animate) {
      setTimeout(() => setAnimate(false), 1000); // Sync with animation duration
    }
  }, [currentReviewIndex, animate]);

  const truncateContent = (content: string, length: number) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  const currentReview = reviews[currentReviewIndex];

  return (
    <>
      <div className="ml-10 bg-violet-300 w-[280px] rounded-lg relative max-lg:hidden">
        <div
          className={`duration-300 bg-violet-200 rounded-lg w-full h-full flex flex-col items-center justify-center p-4 hover:shadow-[0_0_30px_3px_rgba(100,0,300,0.3)] cursor-pointer ${
            animate ? "animate-full-turn" : "rotate-6 hover:rotate-0"
          }`}
          onClick={handleOpenModal}
        >
          {reviews.length === 0 ? (
            <>
              <span className="text-6xl">😢</span>
              <p className="text-violet-950 font-bold mb-2 text-lg">
                We don't have a review for this film
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-white rounded-full overflow-hidden mb-4">
                <img
                  src={
                    currentReview.author_details.avatar_path
                      ? "https://image.tmdb.org/t/p/original" +
                        currentReview.author_details.avatar_path
                      : "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-violet-950 font-bold mb-2 text-l md:text-sm">
                {currentReview.author}
              </p>
              <p className="text-violet-950 cursor-pointer mb-4 text-xs">
                {truncateContent(currentReview.content, 100)}
              </p>
              <div className="flex items-center space-x-2 text-violet-950">
                <button
                  onClick={handlePreviousReview}
                  className="bg-white text-black p-1 rounded-full"
                >
                  <BiChevronLeft size={24} />
                </button>
                <span className="text-violet-950">
                  {currentReviewIndex + 1} / {reviews.length}
                </span>
                <button
                  onClick={handleNextReview}
                  className="bg-white text-black p-1 rounded-full"
                >
                  <BiChevronRight size={24} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <ModalReview
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          content={currentReview.content}
          author={currentReview.author}
          authorAvatar={currentReview.author_details.avatar_path}
        />
      )}
    </>
  );
};

export default RandomReviewCard;
