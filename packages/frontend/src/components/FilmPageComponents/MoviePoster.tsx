import React from "react";

interface MoviePosterProps {
  movie: {
    poster_path: string;
    title: string;
  };
}

function MoviePoster({ movie }: MoviePosterProps) {
  console.log(movie);
  return (
    <div>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={movie.title}
        className="h-96 w-72 object-cover rounded-3xl shadow-xl"
      />
    </div>
  );
}

export default MoviePoster;
