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
}

const FilmCard: React.FC<FilmCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.movie_id}`);
  };

  return (
    <div
      className="rounded-lg flex flex-wrap justify-center w-full overflow-hidden duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/200x300?text=No+Image"
          }
          alt={movie.title}
          className="h-48 w-42 object-cover rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default FilmCard;
