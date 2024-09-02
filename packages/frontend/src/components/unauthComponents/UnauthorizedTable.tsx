import React from "react";
import { useNavigate } from "react-router-dom";

interface UnauthorizedTableProps {
  pageName: string;
  text?: string;
}

const UnauthorizedTable: React.FC<UnauthorizedTableProps> = ({
  pageName,
  text = "You need to be logged in to access this page.",
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/signin`);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="fixed inset-0 bg-[var(--bg-color)] text-[var(--text-color)] flex items-center justify-center">
      <div className="bg-[var(--input-bg-color)] shadow-lg rounded-xl p-8 md:p-12 lg:p-16 text-center max-w-lg mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-violet-600">
          {pageName}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-6">{text}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleNavigate}
            className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-300"
          >
            Log in
          </button>
          <button
            onClick={handleBack}
            className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedTable;
