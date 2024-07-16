import React, { useState } from "react";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MoviePosterProps {
  movie: {
    poster_path: string;
  };
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  return (
    <div className="lg:w-72 mx-auto md:w-56 relative ">
      <div
        className="absolute top-2 right-2 duration-300"
        onMouseEnter={() => setIsBookmarkHovered(true)}
        onMouseLeave={() => setIsBookmarkHovered(false)}
        onClick={() => setIsBooked((prev) => !prev)}
      >
        {isBookmarkHovered || isBooked ? (
          <BiSolidBookmark className="text-yellow-400 text-4xl duration-300" />
        ) : (
          <BiBookmark className="text-yellow-400 text-4xl duration-300" />
        )}
      </div>
      <img
        src={`${BASE_URL}${movie.poster_path}`}
        alt="Movie Poster"
        className="rounded-xl shadow-lg w-full object-cover"
      />
    </div>
  );
};

export default MoviePoster;
