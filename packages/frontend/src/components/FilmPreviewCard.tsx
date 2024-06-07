/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi"; // Import BiIcons

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

interface FilmPreviewCardProps {
  movie: Movie;
  genreMap: { [key: number]: string };
}

const FilmPreviewCard: React.FC<FilmPreviewCardProps> = ({
  movie,
  genreMap,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const genres = movie.genre_ids
    ? movie.genre_ids.map((id) => genreMap[id]).join(" · ")
    : "N/A";

  const getRatingBgColor = (rating: number) => {
    if (rating >= 7) return "bg-green-500";
    if (rating >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div
      className="rounded-lg w-full overflow-hidden duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-64 w-48 object-cover rounded-lg shadow-xl"
        />
        {movie.vote_average !== undefined && (
          <div
            className={`absolute top-0 left-0 ${getRatingBgColor(
              movie.vote_average
            )} text-white text-sm font-semibold p-2 rounded-br-lg bg-opacity-70`}
          >
            {movie.vote_average.toFixed(1)}
          </div>
        )}
        <div
          className={`absolute top-2 right-2 p-2 ${
            isHovered ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onMouseEnter={() => setIsBookmarkHovered(true)}
          onMouseLeave={() => setIsBookmarkHovered(false)}
        >
          {isBookmarkHovered ? (
            <BiSolidBookmark className="text-yellow-400 text-3xl" />
          ) : (
            <BiBookmark className="text-yellow-400 text-3xl" />
          )}
        </div>
      </div>
      <h2 className="text-md mb-1 text-center mt-2 w-48">{movie.title}</h2>
      <div className="text-gray-500 text-center text-xs truncate w-48 mx-auto">
        <p>{releaseYear}</p>
      </div>
    </div>
  );
};

export default FilmPreviewCard;
