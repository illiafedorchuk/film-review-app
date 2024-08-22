/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import { fetchRatedMovies } from "../../lib/api";
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

const MovieRatings: React.FC<{ token: string }> = ({ token }) => {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRatedMovies = async () => {
      try {
        const response = await fetchRatedMovies(token);
        if (response && Array.isArray(response.ratedMovies)) {
          const mappedMovies = response.ratedMovies.map((movie: any) => ({
            id: movie.movie_movie_id,
            movie_id: movie.movie_movie_id,
            title: movie.movie_title,
            poster_path: movie.movie_poster_path,
            vote_average: parseFloat(movie.movierating),
          }));

          setRatedMovies(mappedMovies);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Failed to load rated movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRatedMovies();
  }, [token]);

  console.log("Rated Movies State:", ratedMovies);

  const handleShowMore = () => {
    navigate("/profile/me/ratedMovies");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Movie Ratings</h2>
      {ratedMovies.length > 0 ? (
        <>
          <div className="flex gap-4">
            {ratedMovies.map((movie) => (
              <div key={movie.id} className="">
                <FilmCard movie={movie} />
                <p className="text-gray-600 mt-2 text-center">
                  {movie.vote_average}/10
                </p>
              </div>
            ))}
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
        <p className="text-gray-600">You haven't rated any movies yet.</p>
      )}
    </div>
  );
};

export default MovieRatings;
