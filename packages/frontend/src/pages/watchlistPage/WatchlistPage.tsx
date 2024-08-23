/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import FilmPreviewCard from "../../components/MainPageComponents/FilmPreviewCard";
import { GENRE_MAP } from "../../lib/constants";
import { fetchWatchLaterMovies } from "../../lib/api"; // Import the fetchWatchlist function

interface Movie {
  id: number;
  movie_id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

const genreMap: { [key: number]: string } = GENRE_MAP;

function WatchlistPage() {
  const token = "";
  const [watchlist, setWatchlist] = useState<Movie[]>([]); // State to store the watchlist
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <h1 className="text-4xl font-bold mb-4 pb-10 text-center">
            My Watchlist
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <FilmPreviewCard
                  key={movie.movie_id}
                  movie={movie}
                  genreMap={genreMap}
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
