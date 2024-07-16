import React from "react";
import FilmCard from "./FilmCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
}

const ratedMovies: Movie[] = [
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 10,
  },
  {
    id: 2,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 10,
  },
  {
    id: 3,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8,
  },
];

const MovieRatings: React.FC = () => {
  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Movie Ratings</h2>
      {ratedMovies.length > 0 ? (
        <div className="flex gap-4 ">
          {ratedMovies.map((movie) => (
            <div key={movie.id} className="">
              <FilmCard movie={movie} />
              <p className="text-gray-600 mt-2 text-center">
                {movie.rating}/10
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">You haven't rated any movies yet.</p>
      )}
    </div>
  );
};

export default MovieRatings;
