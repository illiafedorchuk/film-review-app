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
      api_key: process.env.REACT_APP_TMDB_API_KEY,
    }
  );
  const { data: reviewsData, isLoading: isReviewsLoading } = useApiGet(
    "https://api.themoviedb.org/3/movie/823464/reviews",
    {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
    }
  );

  const { data: randomMovieList, isLoading: isRandomMovieListLoading } =
    useApiGet("https://api.themoviedb.org/3/movie/top_rated", {
      api_key: process.env.REACT_APP_TMDB_API_KEY,
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
      <div className="flex flex-wrap justify-center ">
        <div className="flex justify-around mt-10 w-4/5 gap-8 px-4 ">
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
        <div className="bg-white w-3/5 m-5 rounded-xl">
          {data && data.results && data.results.length > 0 && (
            <img
              src={
                "https://image.tmdb.org/t/p/original" +
                `${data.results[0].backdrop_path}`
              }
              alt=""
              className="w-full h-full rounded-lg object-cover brightness-50"
            />
          )}

          <div className="absolute top-1/3 left-52">
            {data && data.results && data.results.length > 0 && (
              <div>
                <h1 className="text-white font-bold text-3xl">
                  {data.results[0].original_title}
                </h1>
                <p className="text-white text-md w-1/2 py-5">
                  {data.results[0].overview}
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
