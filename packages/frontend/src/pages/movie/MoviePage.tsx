/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MoviePoster from "../../components/FilmPageComponents/MoviePoster";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import MovieCredentials from "../../components/FilmPageComponents/MovieCredentials";
import ActorsCarousel from "../../components/FilmPageComponents/ActorsCarousel";
import TrailerVideo from "../../components/FilmPageComponents/TrailerVideo";
import FastReaction from "../../components/FilmPageComponents/FastReaction";
import YourReviewArea from "../../components/FilmPageComponents/YourReviewArea";
import ActiveSlider from "../../components/MainPageComponents/ActiveSlider";
import { PLACEHOLDER_URL } from "../../lib/constants";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import { useMovieTrailers } from "../../hooks/useMovieTrailers";
import Comments from "../../components/FilmPageComponents/Comments";
import UnauthorizedTable from "../../components/unauthComponents/UnauthorizedTable";
import { useAuth } from "../../lib/AuthContext"; // Use the custom hook

const MoviePage: React.FC = () => {
  const { movieId: id } = useParams<{ movieId: string }>();
  const { user } = useAuth();
  const movieId = parseInt(id!, 10);

  const [showUnauthorized, setShowUnauthorized] = useState(false); // State to manage UnauthorizedTable visibility

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

  const handleProtectedClick = () => {
    if (!user) {
      setShowUnauthorized(true); // Show unauthorized message if user is not authenticated
    }
  };

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
          {showUnauthorized && (
            <UnauthorizedTable
              pageName="Restricted Access"
              text="You need to be logged in to perform this action."
            />
          )}
          {!showUnauthorized && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ">
                <div className="flex flex-col space-y-4">
                  <MoviePoster movie={movieDetails} />
                  <div onClick={handleProtectedClick}>
                    <FastReaction
                      movieId={movieId}
                      title={movieDetails.title}
                      poster_path={movieDetails.poster_path}
                      backdrop_path={movieDetails.backdrop_path}
                      release_date={movieDetails.release_date}
                      vote_average={movieDetails.vote_average}
                      genre_ids={movieDetails.genre_ids}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col justify-between">
                  <MovieCredentials
                    movieDetails={{
                      ...movieDetails,
                      runtime: movieDetails.runtime || 0,
                    }}
                    actorsData={{ cast: actorsData, crew: [] }}
                  />
                  <div onClick={handleProtectedClick}>
                    {/* Pass the user to YourReviewArea */}
                    <YourReviewArea
                      rating={5}
                      details={movieDetails}
                      user={user} // Pass user prop here
                    />
                  </div>
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
              <div onClick={handleProtectedClick}>
                <Comments movieId={movieId} commentsPerPage={5} />
              </div>
            </>
          )}
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
};

export default MoviePage;
