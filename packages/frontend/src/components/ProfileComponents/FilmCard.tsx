import React from "react";
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

interface FilmCardProps {
  movie: Movie;
  height?: string;
  width?: string;
}

const FilmCard: React.FC<FilmCardProps> = ({
  movie,
  height = "h-48",
  width = "w-42",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.movie_id}`);
  };

  return (
    <div
      className={`rounded-lg flex flex-wrap justify-center w-full overflow-hidden duration-300 hover:scale-105 ${height} ${width}`}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.title || "No Title"}
          className={`object-cover rounded-lg shadow-xl ${height} ${width}`}
        />
      </div>
      {movie.title && (
        <div className="mt-2 text-center">
          <p className="text-sm font-semibold">{movie.title}</p>
        </div>
      )}
    </div>
  );
};

export default FilmCard;
