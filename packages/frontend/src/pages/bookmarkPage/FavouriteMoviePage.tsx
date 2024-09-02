/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import { fetchBookmarkedMovies } from "../../lib/api"; // Import the necessary functions
import FilmCard from "../../components/ProfileComponents/FilmCard";
import UnauthorizedTable from "../../components/unauthComponents/UnauthorizedTable"; // Ensure this import is correct
import { useAuth } from "../../lib/AuthContext"; //
import { Movie } from "../../types/types";
function FavouriteMoviePage() {
  useAuth();
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWatchlist = async () => {
      if (showUnauthorized) return;

      try {
        const data = await fetchBookmarkedMovies();
        setWatchlist(data.bookmarkedMovies); // Assuming the API returns { bookmarkedMovies: Movie[] }
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setShowUnauthorized(true);
        } else {
          setError("Failed to load favourite movies. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadWatchlist();
  }, [showUnauthorized]);

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

  if (error) {
    return (
      <DarkModeProvider>
        <AppLayout>
          <div>{error}</div>
        </AppLayout>
      </DarkModeProvider>
    );
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] pl-[5%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <h1 className="text-4xl font-bold mb-4 pb-10 text-center">
            My Favourite Movies
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
              <div>No favourite movies found</div>
            )}
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default FavouriteMoviePage;
