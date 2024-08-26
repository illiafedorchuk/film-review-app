import React from "react";

interface UserActivityProps {
  activities: string[]; // Array of activity strings
}

const UserActivity: React.FC<UserActivityProps> = ({ activities }) => {
  return (
    <div className="bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg w-full">
      <h2 className="text-xl font-bold">Recent Activity</h2>
      <div className="mt-2">
        {activities.length > 0 ? (
          activities.map((activity, index) => <p key={index}>{activity}</p>)
        ) : (
          <p className="text-gray-600">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default UserActivity;
