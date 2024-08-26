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

  const handleShowMore = () => {
    navigate("/profile/me/ratedMovies");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Movie Ratings</h2>
      {ratedMovies.length > 0 ? (
        <>
          {/* Extra large screen grid layout, maximum 6 items */}
          <div className="hidden xl:grid xl:grid-cols-6 justify-items-start gap-4 w-full">
            {ratedMovies.slice(0, 6).map((movie) => (
              <div key={movie.id}>
                <FilmCard movie={movie} />
                <p className="text-gray-600 mt-2 text-center">
                  {movie.vote_average}/10
                </p>
              </div>
            ))}
          </div>

          {/* Large screen grid layout, maximum 5 items */}
          <div className="hidden lg:grid xl:hidden lg:grid-cols-5 justify-items-start gap-4 w-full">
            {ratedMovies.slice(0, 5).map((movie) => (
              <div key={movie.id}>
                <FilmCard movie={movie} />
                <p className="text-gray-600 mt-2 text-center">
                  {movie.vote_average}/10
                </p>
              </div>
            ))}
          </div>

          {/* Medium screen grid layout, maximum 4 items */}
          <div className="hidden md:grid lg:hidden grid-cols-4 gap-4 w-full">
            {ratedMovies.slice(0, 4).map((movie) => (
              <div key={movie.id}>
                <FilmCard movie={movie} />
                <p className="text-gray-600 mt-2 text-center">
                  {movie.vote_average}/10
                </p>
              </div>
            ))}
          </div>

          {/* Small screen grid layout, maximum 3 items */}
          <div className="md:hidden">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 sm:gap-4">
              {ratedMovies.slice(0, 3).map((movie) => (
                <div key={movie.id}>
                  <FilmCard movie={movie} />
                  <p className="text-gray-600 mt-2 text-center">
                    {movie.vote_average}/10
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Show the "Show more" button */}
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
        <p className="text-gray-600">You haven't rated any movies yet.</p>
      )}
    </div>
  );
};

export default MovieRatings;
