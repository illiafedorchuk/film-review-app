import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import { fetchBookmarkedMovies } from "../../lib/api";
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

const FavoriteMovies: React.FC<{ token: string }> = ({ token }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("favouriteMovies");
  };

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const response = await fetchBookmarkedMovies(token);
        setFavoriteMovies(response.bookmarkedMovies || response);
      } catch (error) {
        console.error("Failed to load favorite movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteMovies();
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>

      {favoriteMovies.length > 0 ? (
        <>
          {/* Extra large and large screen grid layout, maximum 3 columns */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {favoriteMovies.slice(0, 3).map((movie) => (
              <div key={movie.id + "-" + movie.movie_id}>
                <FilmCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Medium screen grid layout, maximum 4 columns */}
          <div className="hidden md:grid lg:hidden grid-cols-4 gap-4">
            {favoriteMovies.slice(0, 4).map((movie) => (
              <div key={movie.id + "-" + movie.movie_id}>
                <FilmCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Small screen grid layout, maximum 3 columns */}
          <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
            {favoriteMovies.slice(0, 3).map((movie) => (
              <div key={movie.id + "-" + movie.movie_id}>
                <FilmCard movie={movie} />
              </div>
            ))}
          </div>

          {/* Extra small screen grid layout, maximum 2 columns */}
          <div className="sm:hidden grid grid-cols-3 gap-4">
            {favoriteMovies.slice(0, 3).map((movie) => (
              <div key={movie.id + "-" + movie.movie_id}>
                <FilmCard movie={movie} />
              </div>
            ))}
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
        <p className="text-gray-600">You don't have any favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;
