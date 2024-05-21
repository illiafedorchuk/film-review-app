import React, { useState } from "react";
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

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const currentReview = reviews[currentReviewIndex];

  // Truncate review content if it exceeds 100 characters
  const truncateContent = (content: string, length: number) => {
    return content.length > length
      ? content.substring(0, length) + "..."
      : content;
  };

  return (
    <>
      <div className="bg-violet-300 w-full lg:w-1/5 m-5 rounded-lg relative">
        <div className="bg-violet-200 rounded-lg w-full h-full rotate-6 flex flex-col items-center justify-center p-4">
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
          <p className="text-violet-950 font-bold mb-2 text-l">
            {currentReview.author}
          </p>
          <p
            className="text-violet-950 text-sm cursor-pointer mb-4 text-md"
            onClick={handleOpenModal}
          >
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
        </div>
      </div>

      <ModalReview
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={currentReview.content}
        author={currentReview.author}
        authorAvatar={currentReview.author_details.avatar_path}
      />
    </>
  );
};

export default RandomReviewCard;
