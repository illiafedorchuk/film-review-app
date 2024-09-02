/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import ProfileDetails from "../../components/ProfileComponents/ProfileDetails";
import UserActivity from "../../components/ProfileComponents/UserActivity";
import FavoriteMovies from "../../components/ProfileComponents/FavoriteMovies";
import Watchlist from "../../components/ProfileComponents/Watchlist";
import MovieRatings from "../../components/ProfileComponents/MovieRatings";
import Settings from "../../components/ProfileComponents/Settings";
import UnauthorizedTable from "../../components/unauthComponents/UnauthorizedTable";
import { fetchCurrentUser } from "../../lib/api";
import { User } from "../../types/types";
import Footer from "../../components/Footer";

function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [error, setError] = useState<string | null>(null); // State to manage error
  const token = "";

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setUser(userData);
      } catch (error) {
        setError("Unauthorized");
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }
  if (error === "Unauthorized") {
    return (
      <DarkModeProvider>
        <AppLayout>
          <div className="px-[7%] sm:pl-[15%] md:px-[14%] lg:px-[20%] lg:pr-[15%] md:pr-[5%] py-10">
            <UnauthorizedTable
              pageName="Profile"
              text="You need to log in to access your profile."
            />
          </div>
        </AppLayout>
      </DarkModeProvider>
    );
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[7%] sm:pl-[15%] md:px-[14%] lg:px-[20%] lg:pr-[15%] md:pr-[5%] py-10">
          <div className="sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProfileDetails />
              <div className="space-y-8">
                <UserActivity activities={user?.recentActivity || []} />
                <FavoriteMovies />
              </div>
            </div>
            <Watchlist token={token} />
            <MovieRatings token={token} />
            <Settings />
          </div>
        </div>
        <Footer />
      </AppLayout>
    </DarkModeProvider>
  );
}

export default ProfilePage;
