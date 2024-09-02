/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import { fetchCurrentUser, fetchWatchLaterMovies } from "../../lib/api"; // Import the fetchWatchlist function
import FilmCard from "../../components/ProfileComponents/FilmCard";
import { Movie } from "../../types/types";
import UnauthorizedTable from "../../components/unauthComponents/UnauthorizedTable";
import { AuthContext } from "../../lib/AuthContext";

function WatchlistPage() {
  const token = "";
  const [watchlist, setWatchlist] = useState<Movie[]>([]); // State to store the watchlist
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const user = useContext(AuthContext);
  console.log("12312" + user);
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setCurrentUser(userData);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setShowUnauthorized(true);
        } else {
          setError("Unauthorized");
        }
      }
    };
    loadCurrentUser();
  });

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await fetchWatchLaterMovies(token);
        setWatchlist(data.watchLaterMovies); // Assuming the API returns { watchLaterMovies: Movie[] }
      } catch (error) {
        setError("Failed to load watchlist. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error == "Unauthorized") {
    return (
      <DarkModeProvider>
        <AppLayout>
          <UnauthorizedTable
            pageName="Restricted Access"
            text="You need to be logged in to view your favourite movies."
          />
        </AppLayout>
      </DarkModeProvider>
    );
  }
  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] pl-[5%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <h1 className="text-4xl font-bold mb-4 pb-10 text-center">
            My Watchlist
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <FilmCard
                  key={movie.movie_id}
                  movie={movie}
                  height="h-[100%]"
                  width="w-[100%]"
                />
              ))
            ) : (
              <div>No movies in your watchlist</div>
            )}
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default WatchlistPage;
