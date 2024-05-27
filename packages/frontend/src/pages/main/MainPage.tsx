/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { useApiGet } from "../../hooks/useApi";
import ActiveSlider from "../../components/ActiveSlider";
import RandomReviewCard from "../../components/RandomReviewCard";
import GenreButtonsContainer from "../../components/GenreButtonsContainer";
import MovieDetailsCarousel from "../../components/MovieDetailsCarousel";

export const MainPage = () => {
  const { data: popularMoviesData, isLoading: isPopularMoviesLoading } =
    useApiGet("https://api.themoviedb.org/3/movie/popular", {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    });

  const { data: reviewsData, isLoading: isReviewsLoading } = useApiGet(
    popularMoviesData?.results?.[0]?.id
      ? `https://api.themoviedb.org/3/movie/${popularMoviesData.results[0].id}/reviews`
      : null,
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    },
    [popularMoviesData]
  );

  const { data: randomMovieList, isLoading: isRandomMovieListLoading } =
    useApiGet("https://api.themoviedb.org/3/movie/top_rated", {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    });

  function handleGenreClick(genre: string) {
    console.log("Selected genre:", genre);
  }

  const genreButtonsArr = [
    "🍿All",
    "😂Comedy",
    "😨Drama",
    "👻Horror",
    "🧐Fantasy",
    "😎Action",
  ];

  return (
    <AppLayout>
      <GenreButtonsContainer
        genres={genreButtonsArr}
        onGenreClick={handleGenreClick}
      />
      <div className="flex justify-center mt-3 px-12 max-sm:p-0">
        <div className="bg-white lg:w-[60%] max-w-full m-5 rounded-xl relative h-96 md:w-[85%] sm:w-[90%] max-sm:w-[85%] max-sm:h-[50%] max-md:h-[40%]">
          {popularMoviesData && popularMoviesData.results && (
            <MovieDetailsCarousel movies={popularMoviesData.results} />
          )}
        </div>
        {reviewsData && reviewsData.results && (
          <RandomReviewCard reviews={reviewsData.results} />
        )}
      </div>
      <div className="mt-3 px-4 sm:px-10 md:px-20 lg:px-44 font-bold text-lg sm:text-xl text-center">
        Special for you
      </div>
      {randomMovieList && randomMovieList.results && (
        <ActiveSlider movies={randomMovieList.results} />
      )}
    </AppLayout>
  );
};
