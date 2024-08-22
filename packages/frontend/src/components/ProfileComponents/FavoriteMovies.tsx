import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import { fetchBookmarkedMovies } from "../../lib/api";

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

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const response = await fetchBookmarkedMovies(token);
        console.log("Fetched favorite movies:", response);
        setFavoriteMovies(response.bookmarkedMovies || response);
      } catch (error) {
        console.error("Failed to load favorite movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoriteMovies();
  }, [token]);

  console.log("Favorite Movies State:", favoriteMovies);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <div className="flex gap-4">
          {favoriteMovies.slice(0, 3).map((movie) => (
            <div key={movie.id + "-" + movie.movie_id} className="">
              <FilmCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You don't have any favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;
