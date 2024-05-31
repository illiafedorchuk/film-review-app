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

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const genres = movie.genre_ids
    ? movie.genre_ids.map((id) => genreMap[id]).join(" · ")
    : "N/A";

  return (
    <div className="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 max-w-xs sm:max-w-sm mx-2 group">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-64 w-48 object-cover rounded-lg shadow-xl brightness-[.85]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-semibold p-2 opacity-0 group-hover:transition-opacity duration-300">
          <p>{genres}</p>
        </div>
      </div>
      {movie.vote_average !== undefined && (
        <div className="absolute top-0 left-0 bg-violet-500 text-white text-sm font-semibold p-2 rounded-br-lg">
          {movie.vote_average.toFixed(1)}
        </div>
      )}
      <div
        className="absolute top-0 right-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <BiSolidBookmark className="text-yellow-400 text-3xl" />
        ) : (
          <BiBookmark className="text-yellow-400 text-3xl" />
        )}
      </div>
      <h2 className="text-md mb-1 text-center">{movie.title}</h2>
      <div className="text-gray-500 text-center text-xs truncate max-w-xs mx-auto">
        <p>{releaseYear}</p>
      </div>
    </div>
  );
};

export default FilmPreviewCard;
