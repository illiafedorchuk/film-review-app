import React from "react";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import MoviePlate from "../../components/RatedMoviesComponents/MoviePlate";

function RatedMovies() {
  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[5%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[8%] lg:pr-[2%] md:pr-[5%] py-10 text-center">
          <h1 className=" text-4xl font-bold pb-10">
            Rated <span className="text-violet-500"> movies</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center">
            <MoviePlate />
            <MoviePlate />
            <MoviePlate />
            <MoviePlate />
            <MoviePlate />
            <MoviePlate />
          </div>
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default RatedMovies;
