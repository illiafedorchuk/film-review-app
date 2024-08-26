/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import { fetchBookmarkedMovies } from "../../lib/api"; // Import the fetchWatchlist function
import FilmCard from "../../components/ProfileComponents/FilmCard";

interface Movie {
  id: number;
  movie_id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

function FavouriteMoviePage() {
  const token = "";
  const [watchlist, setWatchlist] = useState<Movie[]>([]); // State to store the watchlist
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await fetchBookmarkedMovies(token);
        setWatchlist(data.bookmarkedMovies); // Assuming the API returns { bookmarkedMovies: Movie[] }
      } catch (error) {
        setError("Failed to load favourite movies. Please try again later.");
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

  if (error) {
    return <div>{error}</div>;
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
