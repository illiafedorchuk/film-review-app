import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  author: string;
  authorAvatar: string | null;
}

const ModalReview: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  author,
  authorAvatar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 p-8 rounded-lg max-w-lg w-full relative shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-700"
        >
          X
        </button>
        <div className="flex items-center mb-4">
          <img
            src={
              authorAvatar
                ? "https://image.tmdb.org/t/p/original" + authorAvatar
                : "https://via.placeholder.com/50"
            }
            alt={author}
            className="w-14 h-14 rounded-full mr-4 border-2 border-white"
          />
          <h2 className="text-2xl font-bold text-white text-black">{author}</h2>
        </div>
        <div className="max-h-60 overflow-y-auto bg-gray-200 p-4 rounded-lg">
          <p className="text-black text-lg leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalReview;
