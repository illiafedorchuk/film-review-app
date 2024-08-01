/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { addMovieToDatabase } from "../../lib/api";
import MoviePoster from "../../components/FilmPageComponents/MoviePoster";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import MovieCredentials from "../../components/FilmPageComponents/MovieCredentials";
import ActorsCarousel from "../../components/FilmPageComponents/ActorsCarousel";
import TrailerVideo from "../../components/FilmPageComponents/TrailerVideo";
import Comments from "../../components/FilmPageComponents/Comments";
import FastReaction from "../../components/FilmPageComponents/FastReaction";
import YourReviewArea from "../../components/FilmPageComponents/YourReviewArea";
import ActiveSlider from "../../components/MainPageComponents/ActiveSlider";
import { PLACEHOLDER_URL } from "../../lib/constants";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useMovieTrailers } from "../../hooks/useMovieTrailers";

const sampleComments = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "https://via.placeholder.com/48",
    timestamp: "2 hours ago",
    text: "Great movie! Highly recommended.",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "https://via.placeholder.com/48",
    timestamp: "1 day ago",
    text: "I loved the acting and the storyline.",
    likes: 0,
    dislikes: 0,
  },
];

const MoviePage: React.FC = () => {
  const { movieId: id } = useParams<{ movieId: string }>();
  const movieId = parseInt(id!, 10);

  // Use cookies to get the access token
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  // State to prevent multiple adds
  const [isMovieAdded, setIsMovieAdded] = useState<boolean>(false);

  const {
    movieDetails,
    actorsData,
    movieImages,
    movieVideos,
    similarMovies,
    loading: movieDetailsLoading,
  } = useMovieDetails(movieId);

  const {
    trailers,
    loading: trailersLoading,
    error: trailersError,
  } = useMovieTrailers(movieDetails?.id || null);

  const similarMoviesWithDefaults = similarMovies.map((movie) => ({
    ...movie,
    title: movie.original_title,
  }));

  const findTrailerKey = (trailers: any[]): string | null => {
    if (!trailers || trailers.length === 0) return null;
    const trailer = trailers.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  };

  const trailerKey = findTrailerKey(trailers);

  // Automatically add movie to the database on component mount
  useEffect(() => {
    const addMovie = async () => {
      if (movieDetails && !isMovieAdded && token) {
        try {
          const response = await addMovieToDatabase(movieDetails, token);
          console.log(response.message); // Log success message
          setIsMovieAdded(true); // Set the flag to prevent further additions
        } catch (error) {
          console.error("Failed to add movie:", error);
        }
      }
    };

    addMovie();
  }, [movieDetails, token, isMovieAdded]); // Dependency on isMovieAdded prevents repeated addition

  if (movieDetailsLoading || trailersLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (
    !movieDetails ||
    !actorsData ||
    !movieImages ||
    !movieVideos ||
    !similarMovies ||
    trailersError
  ) {
    return <div className="text-center py-20">Failed to load data</div>;
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[6%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[15%] lg:pr-[10%] md:pr-[5%] py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ">
            <div className="flex flex-col space-y-4">
              <MoviePoster movie={movieDetails} token={""} />
              <FastReaction />
            </div>
            <div className="md:col-span-2 flex flex-col justify-between">
              <MovieCredentials
                movieDetails={{
                  ...movieDetails,
                  runtime: movieDetails.runtime || 0,
                }}
                actorsData={{ cast: actorsData, crew: [] }}
                token={""}
              />
              <YourReviewArea rating={5} details={movieDetails} />
            </div>
          </div>
          <div className="pt-5 text-[var(--text-color)] mb-4">
            <p className="font-bold text-3xl text-center pb-5">Overview</p>
            <p className="whitespace-pre-line text-xl">
              {movieDetails.overview}
            </p>
          </div>
          <ActorsCarousel actors={actorsData} />
          {trailerKey && (
            <div id="trailer" className="my-2">
              <h2 className="font-bold text-3xl text-center pb-5">
                Watch Trailer
              </h2>
              <TrailerVideo trailerKey={trailerKey} />
            </div>
          )}
          <h1 className="text-4xl font-bold text-center py-6">Images</h1>
          <ActiveSlider
            movies={movieImages.map((image) => ({
              id: image.file_path,
              title: "",
              overview: "",
              backdrop_path: image.file_path,
            }))}
          />
          <h1 className="text-4xl font-bold text-center py-6">
            Similar movies
          </h1>
          <ActiveSlider
            movies={similarMoviesWithDefaults.map((movie) => ({
              ...movie,
              backdrop_path: movie.backdrop_path ?? PLACEHOLDER_URL,
            }))}
          />
          <Comments comments={sampleComments} commentsPerPage={5} />
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
};

export default MoviePage;
