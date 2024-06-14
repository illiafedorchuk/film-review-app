import React from "react";
import FilmPreviewCard from "./FilmPreviewCard";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

interface MovieGridProps {
  movies: Movie[];
  genreMap: { [key: number]: string };
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, genreMap }) => {
  return (
    <div className="grid justify-items-center mt-5 w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
        {movies &&
          movies.map((movie: Movie) => (
            <FilmPreviewCard key={movie.id} movie={movie} genreMap={genreMap} />
          ))}
      </div>
    </div>
  );
};

export default MovieGrid;
