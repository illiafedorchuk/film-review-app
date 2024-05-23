/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/MainPage.tsx
import React from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { useApiGet } from "../../hooks/useApi";
import ActiveSlider from "../../components/ActiveSlider";
import RandomReviewCard from "../../components/RandomReviewCard";
import GenreButtonsContainer from "../../components/GenreButtonsContainer";

export const MainPage = () => {
  const { data, isLoading } = useApiGet(
    "https://api.themoviedb.org/3/movie/popular",
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    }
  );

  const randomMovieIndex =
    data && data.results ? Math.floor(Math.random() * data.results.length) : 0;
  const selectedMovie =
    data && data.results ? data.results[randomMovieIndex] : null;
  const selectedMovieId = selectedMovie ? selectedMovie.id : null;

  const { data: reviewsData, isLoading: isReviewsLoading } = useApiGet(
    selectedMovieId
      ? `https://api.themoviedb.org/3/movie/${selectedMovieId}/reviews`
      : null,
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    },
    [selectedMovieId]
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <AppLayout>
      <GenreButtonsContainer
        genres={genreButtonsArr}
        onGenreClick={handleGenreClick}
      />
      <div className="flex justify-center mt-3 h-96 px-12 max-sm:p-0 max-sm:h-[60%]">
        <div className="bg-white w-3/5 m-5 rounded-xl max-lg:w-[85%] relative">
          {selectedMovie && (
            <img
              src={
                "https://image.tmdb.org/t/p/original" +
                selectedMovie.backdrop_path
              }
              alt={selectedMovie.title}
              className="w-full h-full rounded-lg object-cover brightness-50"
            />
          )}

          <div className="absolute top-1/4 sm:top-1/3 sm:left-10 lg:left-10 xl:left-20 p-4 sm:p-0 text-left">
            {selectedMovie && (
              <div>
                <h1 className="text-white font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {selectedMovie.original_title}
                </h1>
                <p className="text-white text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl py-3 sm:py-5">
                  {truncateText(selectedMovie.overview, 150)}
                </p>
              </div>
            )}
          </div>
        </div>
        {reviewsData && reviewsData.results && (
          <RandomReviewCard reviews={reviewsData.results} />
        )}
      </div>
      <div className=" mt-3 px-4 sm:px-10 md:px-20 lg:px-44 font-bold text-lg sm:text-xl text-center">
        Special for you
      </div>
      {randomMovieList && randomMovieList.results && (
        <ActiveSlider movies={randomMovieList.results} />
      )}
    </AppLayout>
  );
};
