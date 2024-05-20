/* eslint-disable @typescript-eslint/no-unused-vars */
import GenreButton from "../../components/GenreButton";
import AppLayout from "../../components/layouts/AppLayout";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import ActiveSlider from "../../components/ActiveSlider";
import { SetStateAction, useEffect, useState } from "react";
import { get } from "react-hook-form";
import { useApiGet } from "../../hooks/useApi";

const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3?api_key=${process.env.API_KEY}`
    );
    const data = await response.json();
  } catch (error) {
    console.error("Failed to fetch popular movies", error);
  }
};

export const MainPage = () => {
  const { data, isLoading } = useApiGet(
    "https://api.themoviedb.org/3/movie/popular",
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    }
  );

  function handleGenreClick(arg0: string) {
    throw new Error("Function not implemented.");
  }

  const genreButtonsArr = [
    "🍿All",
    "😂Comedy",
    "😨Drama",
    "👻Horror",
    "🧐Fansasy",
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
              className="w-full h-full rounded-lg object-cover brightness-75"
            />
          )}
        </div>
        <div className="bg-violet-300 w-1/5 m-5 rounded-lg ">
          <div className="bg-violet-200 rounded-lg w-full h-full rotate-6"></div>
        </div>
      </div>
      <div className="flex mt-3 px-44 font-bold text-xl">Special for you</div>
      <ActiveSlider />;
    </AppLayout>
  );
};
