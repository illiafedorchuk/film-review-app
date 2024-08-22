/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchRatedMovies } from "../../lib/api";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import MoviePlate from "../../components/RatedMoviesComponents/MoviePlate";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Movie {
  movie_movie_id: number;
  movie_title: string;
  movie_poster_path: string;
  movierating: number;
  backdropUrl: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  review?: {
    ratings: { [key: string]: number };
    text: string;
    rating: number;
  };
}

function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = "";
    fetchRatedMovies(token)
      .then((data: { ratedMovies: Movie[] }) => {
        setRatedMovies(data.ratedMovies);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError("Failed to fetch rated movies");
        setLoading(false);
      });
  }, []);

  const handlePlateClick = (movie_id: number) => {
    navigate(`/movie/${movie_id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[5%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[8%] lg:pr-[2%] md:pr-[5%] py-10 text-center">
          <h1 className=" text-4xl font-bold pb-10">
            Rated <span className="text-violet-500">Movies</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center">
            {ratedMovies.length > 0 ? (
              ratedMovies.map((movie) => (
                <MoviePlate
                  key={movie.movie_movie_id}
                  movie_title={movie.movie_title}
                  movierating={movie.movierating}
                  movie_poster_path={movie.movie_poster_path}
                  onClick={() => handlePlateClick(movie.movie_movie_id)} // Navigate on click
                />
              ))
            ) : (
              <div>No rated movies found.</div>
            )}
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default RatedMovies;
