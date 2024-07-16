/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import MovieInfo from "./MovieInfo";

interface MovieCredentialsProps {
  movieDetails: {
    original_language: string;
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
  const navigate = useNavigate();

  const handleWatchTrailerClick = () => {
    document.getElementById("trailer")?.scrollIntoView({ behavior: "smooth" });
  };

  function handleWatchLaterClick() {
    setWatchLater((prev) => !prev);
  }
  const [watchLater, setWatchLater] = useState(false);
  const director = actorsData.crew.find((person) => person.job === "Director");
  const starCast = actorsData.cast
    .slice(0, 3)
    .map((person) => person.name)
    .join(", ");

  const releaseDate = new Date(movieDetails.release_date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="sx:pl-0 md:pl-10 lg:pl-10 lg:w-full">
      <h1 className="font-bold text-4xl mb-2">{movieDetails.original_title}</h1>
      <h2 className="text-xl mb-4 text-gray-400">{movieDetails.tagline}</h2>
      <MovieInfo
        label="Genre: "
        value={movieDetails.genres.map((el) => el.name).join(", ")}
      />
      <MovieInfo
        label="Rating IMDB: "
        value={`${Math.round(movieDetails.vote_average * 100) / 100}/10 (${
          movieDetails.vote_count
        } votes)`}
      />
      <MovieInfo
        label="Original language: "
        value={movieDetails.original_language}
      />
      <MovieInfo label="Duration: " value={`${movieDetails.runtime} minutes`} />
      <MovieInfo label="Director: " value={director?.name} />
      <MovieInfo label="Star cast: " value={`${starCast} ...`} />
      <MovieInfo label="Release Date: " value={releaseDate} />
      <div className="flex flex-wrap pt-3 gap-4">
        <Button onClick={handleWatchTrailerClick}>Watch Trailer</Button>
        <Button watchLater={watchLater} onClick={handleWatchLaterClick}>
          Watch later
        </Button>
      </div>
    </div>
  );
}

export default MovieCredentials;
