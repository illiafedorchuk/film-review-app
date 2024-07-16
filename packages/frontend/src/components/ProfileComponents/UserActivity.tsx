import React from "react";

const UserActivity: React.FC = () => {
  return (
    <div className="bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-bold">Recent Activity</h2>
      <div className="mt-2">
        <p className="text-gray-600">You rated "Inception" 5 stars</p>
        <p className="text-gray-600">You reviewed "The Dark Knight"</p>
      </div>
    </div>
  );
};

export default UserActivity;
