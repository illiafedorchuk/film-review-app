import React from "react";
import FilmCard from "./FilmCard";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

const favoriteMovies: Movie[] = [
  // Add your favorite movies here or fetch from a data source
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
];

const FavoriteMovies: React.FC = () => {
  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Favorite Movies</h2>
      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {favoriteMovies.map((movie) => (
            <FilmCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You don't have any favorite movies yet.</p>
      )}
    </div>
  );
};

export default FavoriteMovies;
