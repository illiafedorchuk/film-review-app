import { useState, useEffect } from "react";
import Button from "./Button";
import MovieInfo from "./MovieInfo";
import {
  addWatchLaterMovie,
  removeWatchLaterMovie,
  fetchWatchlist,
} from "../../lib/api"; // Adjust the path as needed

interface MovieCredentialsProps {
  movieDetails: {
    id: number;
    original_language: string;
    genres: Array<{ id: number; name: string }>;
    tagline: string;
    original_title: string;
    poster_path: string;
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

const MovieCredentials = ({
  movieDetails,
  actorsData,
}: MovieCredentialsProps) => {
  const [watchLater, setWatchLater] = useState(false);

  // Function to fetch the watchlist and check if the movie is in it
  const checkWatchlist = async () => {
    try {
      const data = await fetchWatchlist();
      console.log(data);
      const watchlist = data.watchLaterMovies;
      if (watchlist.includes(movieDetails.id.toString())) {
        setWatchLater(true);
      }
    } catch (error) {
      console.error("Failed to fetch watchlist", error);
    }
  };

  useEffect(() => {
    checkWatchlist();
  }, []);

  const handleWatchTrailerClick = () => {
    document.getElementById("trailer")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteLaterClick = async () => {
    await removeWatchLaterMovie(movieDetails.id);
    setWatchLater(false);
  };

  const handleAddLaterClick = async () => {
    const movie = {
      id: movieDetails.id,
      title: movieDetails.original_title,
      poster_path: movieDetails.poster_path,
      release_date: movieDetails.release_date,
      vote_average: movieDetails.vote_average,
      genre_ids: movieDetails.genres.map((genre) => genre.id),
    };
    await addWatchLaterMovie(movie);
    setWatchLater(true);
  };

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

        {watchLater ? (
          <Button watchLater={watchLater} onClick={handleDeleteLaterClick}>
            Remove from Watch Later
          </Button>
        ) : (
          <Button watchLater={watchLater} onClick={handleAddLaterClick}>
            Watch Later
          </Button>
        )}
      </div>
    </div>
  );
};

export default MovieCredentials;
