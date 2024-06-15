import React from "react";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MoviePosterProps {
  movie: {
    poster_path: string;
  };
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  return (
    <div className="w-1/3">
      <img
        src={`${BASE_URL}${movie.poster_path}`}
        alt="Movie Poster"
        className="rounded-xl shadow-lg w-full h-full object-cover"
      />
    </div>
  );
};

export default MoviePoster;
