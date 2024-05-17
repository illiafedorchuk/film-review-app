/* eslint-disable @typescript-eslint/no-unused-vars */
import GenreButton from "../../components/GenreButton";
import AppLayout from "../../components/layouts/AppLayout";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";
import ActiveSlider from "../../components/ActiveSlider";

// const getPopularMovies = async () => {
//   try {
//     const response = await fetch(
//       "https://api.themoviedb.org/3/movie/popular?api_key=25827bdb07a5e10047fca31922e36d9e"
//     );
//     const data = await response.json();
//     const firstMovie = data.results[1];

//     if (firstMovie && firstMovie.backdrop_path) {
//       const imageUrl =
//         "https://image.tmdb.org/t/p/original" + firstMovie.backdrop_path;
//       console.log("Image URL of the first movie:", imageUrl);
//     } else {
//       console.log("No image available for the first movie.");
//     }
//   } catch (error) {
//     console.error("Failed to fetch popular movies", error);
//   }
// };

export const MainPage = () => {
  function handleGenreClick(arg0: string) {
    throw new Error("Function not implemented.");
  }
  //getPopularMovies();
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
        <div className="bg-white w-3/5 m-5 rounded-lg"></div>
        <div className="bg-white w-1/5 m-5 rounded-lg"></div>
      </div>
      <div className="flex mt-3 px-44 font-bold text-xl">Special for you</div>
      <ActiveSlider />;
    </AppLayout>
  );
};
