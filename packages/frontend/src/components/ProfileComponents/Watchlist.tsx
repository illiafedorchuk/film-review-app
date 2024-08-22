import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
import MovieCarousel from "./MovieCarousel";
import { fetchWatchLaterMovies } from "../../lib/api";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  movie_id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

const Watchlist: React.FC<{ token: string }> = ({ token }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const data = await fetchWatchLaterMovies(token);
        setWatchlist(data.watchLaterMovies);
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
    return <p className="text-center">Loading your watchlist...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  const handleShowMore = () => {
    navigate("/profile/me/watchlist");
  };

  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      {watchlist.length > 0 ? (
        <>
          <div className="hidden lg:grid grid-cols-6 gap-4">
            {watchlist.slice(0, 5).map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="lg:hidden">
            <MovieCarousel movies={watchlist.slice(0, 5)} />
          </div>
          <div className="flex justify-end">
            <button
              className="text-violet-500 hover:underline"
              onClick={handleShowMore}
            >
              Show more →
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
