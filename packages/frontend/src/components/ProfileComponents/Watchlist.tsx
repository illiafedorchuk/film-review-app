import React, { useEffect, useState } from "react";
import FilmCard from "./FilmCard";
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
    <div className="mt-6 bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Watchlist</h2>
      {watchlist.length > 0 ? (
        <>
          {/* Extra large screen grid layout, maximum 6 items */}
          <div className="hidden xl:grid xl:grid-cols-6 justify-items-start gap-4 w-full">
            {watchlist.slice(0, 6).map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Large screen grid layout, maximum 5 items */}
          <div className="hidden lg:grid xl:hidden lg:grid-cols-5 justify-items-start gap-4 w-full">
            {watchlist.slice(0, 5).map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Medium screen grid layout, maximum 4 items */}
          <div className="hidden md:grid lg:hidden grid-cols-4 gap-4 w-full">
            {watchlist.slice(0, 4).map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Small screen grid layout, maximum 3 items */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-4">
              {watchlist.slice(0, 3).map((movie) => (
                <FilmCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="text-violet-500 hover:underline"
              onClick={handleShowMore}
            >
              Show more →
            </button>
          </div>
        </>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
