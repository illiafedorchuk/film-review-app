/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAuth } from "../../lib/AuthContext"; // Import the useAuth hook

// Utility function to calculate the time difference
const timeAgo = (date: string): string => {
  const now = new Date();
  const updatedAt = new Date(date);
  const diffInMs = now.getTime() - updatedAt.getTime();

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years}y ago`;
  if (months > 0) return `${months}m ago`;
  if (weeks > 0) return `${weeks}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
};

const ProfileDetails: React.FC = () => {
  const { user, loading, error } = useAuth(); // Use the context to access user data

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg w-full mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 rounded-full overflow-hidden bg-black">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="text-2xl font-bold mt-4">{user.name || "boba"}</h1>
        <p className="mt-2">active {timeAgo(user.updatedAt)}</p>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold">ABOUT ME</h2>
        <p className="mt-2">
          {user.aboutMe || "I don't have any information yet."}
        </p>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-thumbs-up text-violet-500"></i>
          <p>1 Likes</p>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <i className="fas fa-map-marker-alt text-violet-500"></i>
          <p>{user.country || "I need to set country"}</p>
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
