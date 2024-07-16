import React from "react";

const ProfileDetails: React.FC = () => {
  return (
    <div className="bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg w-full  mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-black"></div>
        <h1 className="text-2xl font-bold mt-4">ADMIN</h1>
        <p className="text-gray-600 mt-2">active 11 hours ago</p>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold">ABOUT ME</h2>
        <p className="mt-2 text-gray-600">
          Welcome to my page. If you like my content, please consider
          supporting. Any donation will be well received.
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-thumbs-up text-violet-500"></i>
          <p>1 Likes</p>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <i className="fas fa-map-marker-alt text-violet-500"></i>
          <p>United States</p>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <i className="fas fa-calendar-alt text-violet-500"></i>
          <p>Member since Dec 05, 2022</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
