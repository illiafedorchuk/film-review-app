import React from "react";

const YourComments: React.FC = () => {
  return (
    <div className="bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-bold">Your comments</h2>
      <div className="mt-4">
        <div className="border p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Movie Title</h3>
          <p className="text-gray-600 mt-2">
            This is a review of the movie. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
        </div>
        {/* Repeat for more reviews */}
      </div>
    </div>
  );
};

export default YourComments;
