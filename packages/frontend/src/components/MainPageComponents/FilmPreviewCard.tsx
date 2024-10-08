import React, { useState, useEffect } from "react";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number; // vote_average can be undefined
  genre_ids?: number[];
}

interface FilmPreviewCardProps {
  movie: Movie;
  genreMap: { [key: number]: string };
}

const FilmPreviewCard: React.FC<FilmPreviewCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const bookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarkedMovies") || "[]"
    );
    if (bookmarkedMovies.includes(movie.id)) {
      setIsBookmarked(true);
    }
  }, [movie.id]);

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const getRatingBgColor = (rating: number) => {
    if (rating >= 7) return "bg-green-500";
    if (rating >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const bookmarkedMovies = JSON.parse(
      localStorage.getItem("bookmarkedMovies") || "[]"
    );
    if (isBookmarked) {
      const updatedBookmarks = bookmarkedMovies.filter(
        (id: number) => id !== movie.id
      );
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(updatedBookmarks)
      );
    } else {
      bookmarkedMovies.push(movie.id);
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify(bookmarkedMovies)
      );
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div
      className="rounded-lg flex flex-wrap justify-center w-full overflow-hidden duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          className="h-64 w-48 object-cover rounded-lg shadow-xl"
        />
        {typeof movie.vote_average === "number" && (
          <div
            className={`absolute top-0 left-0 ${getRatingBgColor(
              movie.vote_average
            )} text-white text-sm font-semibold p-2 rounded-br-lg bg-opacity-70`}
          >
            {movie.vote_average.toFixed(1)}
          </div>
        )}
        {isBookmarked && (
          <div
            className="absolute top-1 right-2 opacity-100 transition-opacity duration-300"
            onClick={handleBookmarkClick}
          >
            <BiSolidBookmark className="text-yellow-400 text-3xl" />
          </div>
        )}
        {!isBookmarked && isHovered && (
          <div
            className="absolute top-1 right-2 opacity-100 transition-opacity duration-300"
            onClick={handleBookmarkClick}
          >
            <BiBookmark className="text-yellow-400 text-3xl" />
          </div>
        )}
      </div>
      <h2 className="text-md mb-1 text-center mt-2 w-48">{movie.title}</h2>
      <div className="text-gray-500 text-center text-xs truncate w-48 mx-auto">
        <p>{releaseYear}</p>
      </div>
    </div>
  );
};

export default FilmPreviewCard;
