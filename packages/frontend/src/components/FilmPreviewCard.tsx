// components/FilmPreviewCard.tsx
import React from "react";

interface FilmPreviewCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
}

const FilmPreviewCard: React.FC<FilmPreviewCardProps> = ({ movie }) => {
  const { title, poster_path, release_date, vote_average } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="film-preview-card bg-white shadow-md rounded-lg overflow-hidden m-4 w-60">
      <img src={posterUrl} alt={title} className="w-full h-80 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-600">Release Date: {release_date}</p>
        <p className="text-gray-600">Rating: {vote_average}</p>
      </div>
    </div>
  );
};

export default FilmPreviewCard;
