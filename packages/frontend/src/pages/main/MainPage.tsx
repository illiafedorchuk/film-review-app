/* eslint-disable @typescript-eslint/no-unused-vars */
import GenreButton from "../../components/GenreButton";
import AppLayout from "../../components/layouts/AppLayout";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import ActiveSlider from "../../components/ActiveSlider";
import { SetStateAction, useEffect, useState } from "react";
import { get } from "react-hook-form";
import { useApiGet } from "../../hooks/useApi";
import RandomReviewCard from "../../components/RandomReviewCard";

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

  function handleGenreClick(arg0: string) {
    throw new Error("Function not implemented.");
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
      <div className="flex flex-wrap justify-center">
        <div className="grid mt-10 w-4/5 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {genreButtonsArr.map((genre) => (
            <GenreButton
              genre={genre}
              key={genre}
              onClick={() => handleGenreClick(genre)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-3 h-96 px-12">
        <div className="bg-white w-3/5 m-5 rounded-xl max-lg:w-[85%]">
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

          <div className="absolute top-1/3 left-52">
            {selectedMovie && (
              <div>
                <h1 className="text-white font-bold text-3xl max-md:text-md">
                  {selectedMovie.original_title}
                </h1>
                <p className="text-white text-md w-[50%] py-5 max-md:text-sm">
                  {selectedMovie.overview}
                </p>
              </div>
            )}
          </div>
        </div>
        {reviewsData && reviewsData.results && (
          <RandomReviewCard reviews={reviewsData.results} />
        )}
      </div>
      <div className="flex mt-3 px-44 font-bold text-xl">Special for you</div>
      {randomMovieList && randomMovieList.results && (
        <ActiveSlider movies={randomMovieList.results} />
      )}
    </AppLayout>
  );
};
