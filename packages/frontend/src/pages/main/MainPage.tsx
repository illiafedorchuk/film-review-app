/* eslint-disable @typescript-eslint/no-unused-vars */
import GenreButton from "../../components/GenreButton";
import AppLayout from "../../components/layouts/AppLayout";
import { Link } from "react-router-dom";
import axios from "../../lib/axios";

const popular = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=25827bdb07a5e10047fca31922e36d9e`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTgyN2JkYjA3YTVlMTAwNDdmY2EzMTkyMmUzNmQ5ZSIsInN1YiI6IjY2MmI3NTNhOWFjNTM1MDExZDhmNDI3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qyi8WLt1tYDQkgIirCkcCffhVivVScHULIBLZiFUAi4`,
        accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  const data = res.data;
  console.log(data);
};

export const MainPage = () => {
  function handleGenreClick(arg0: string) {
    throw new Error("Function not implemented.");
  }
  popular();
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
      <div className="flex flex-wrap justify-center">
        <div className="flex justify-around mt-10  w-4/5">
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
    </AppLayout>
  );
};
