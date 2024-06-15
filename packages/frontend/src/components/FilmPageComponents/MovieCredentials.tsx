/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

interface MovieCredentialsProps {
  movieDetails: {
    genres: Array<{ name: string }>;
    tagline: ReactNode;
    original_title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
  };
  actorsData: {
    crew: Array<{ name: string; job: string }>;
    cast: Array<{ name: string }>;
  };
}

function MovieCredentials({ movieDetails, actorsData }: MovieCredentialsProps) {
  const director = actorsData.crew.find((person) => person.job === "Director");
  const starCast = actorsData.cast
    .slice(0, 3)
    .map((person) => person.name)
    .join(", ");

  return (
    <div className="pl-14 w-2/3">
      <h1 className="font-bold text-4xl mb-2">{movieDetails.original_title}</h1>
      <h2 className="text-xl mb-4">{movieDetails.tagline}</h2>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Genre: </span>
        {movieDetails.genres.map((el) => el.name).join(", ")}
      </p>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Rating IMDB:</span>{" "}
        {Math.round(movieDetails.vote_average * 100) / 100}/10 (
        {movieDetails.vote_count} votes)
      </p>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Duration:</span>{" "}
        {movieDetails.runtime} minutes
      </p>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Director:</span>{" "}
        {director?.name}
      </p>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Star cast:</span> {starCast}{" "}
        ...
      </p>
      <p className="text-[var(--text-color)] mb-2">
        <span className="font-bold text-violet-600">Release Date:</span>{" "}
        {movieDetails.release_date}
      </p>
      <div className="flex pt-3 space-x-4">
        <button className="bg-violet-600 text-white px-4 py-2 rounded-full">
          Watch Trailer
        </button>
        <button className="bg-[var(--input-bg-color)] text-[var(--text-color)] px-4 py-2 rounded-full border border-[var(--input-border-color)]">
          Favourite
        </button>
        <button className="bg-[var(--input-bg-color)] text-[var(--text-color)] px-4 py-2 rounded-full border border-[var(--input-border-color)]">
          Watch later
        </button>
      </div>
      <p className="pt-5 text-[var(--text-color)] mb-4">
        <span className="font-bold text-violet-600">Overview:</span>{" "}
        {movieDetails.overview}
      </p>
    </div>
  );
}

export default MovieCredentials;
