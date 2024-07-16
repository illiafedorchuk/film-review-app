// Watchlist.tsx
import React from "react";
import FilmCard from "./FilmCard";
import MovieCarousel from "./MovieCarousel";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

const watchlist: Movie[] = [
  {
    id: 4,
    title: "Avatar",
    poster_path: "/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg",
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
  {
    id: 6,
    title: "The Matrix",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 7,
    title: "Inception",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 8,
    title: "Interstellar",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 9,
    title: "The Dark Knight",
    poster_path: "/qOd3JgQLp1nA4BWak8cMB8Kmcda.jpg",
  },
];

const Watchlist: React.FC = () => {
  return (
    <div className="mt-6 w-full bg-[var(--input-bg-color)] p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      {watchlist.length > 0 ? (
        <>
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {watchlist.slice(0, 5).map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="lg:hidden">
            <MovieCarousel movies={watchlist.slice(0, 5)} />
          </div>
        </>
      ) : (
        <p className="text-gray-600">Your watchlist is empty.</p>
      )}
    </div>
  );
};

export default Watchlist;
