import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../lib/api";
import { User } from "../../types/types";
const ProfileDetails: React.FC = () => {
  const [user, setUser] = useState<User>();
  const token = "";

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    loadUser();
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg w-full  mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-black">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
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
          <p>{user.location || "United States"}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <i className="fas fa-calendar-alt text-violet-500"></i>
          <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
