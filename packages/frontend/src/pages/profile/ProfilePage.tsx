/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import ProfileDetails from "../../components/ProfileComponents/ProfileDetails";
import UserActivity from "../../components/ProfileComponents/UserActivity";
import FavoriteMovies from "../../components/ProfileComponents/FavoriteMovies";
import Watchlist from "../../components/ProfileComponents/Watchlist";
import MovieRatings from "../../components/ProfileComponents/MovieRatings";
import Settings from "../../components/ProfileComponents/Settings";
import { fetchCurrentUser } from "../../lib/api";
import { User } from "../../types/types";

function ProfilePage() {
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

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[6%] sm:pl-[15%] md:px-[13%] lg:px-[20%] lg:pr-[15%]  md:pr-[3%] py-10">
          <div className="sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileDetails />
              <div className="space-y-8">
                <UserActivity />
                <FavoriteMovies token={token} />
              </div>
            </div>
            <Watchlist token={token} />
            <MovieRatings token={token} />
            <Settings />
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default ProfilePage;
