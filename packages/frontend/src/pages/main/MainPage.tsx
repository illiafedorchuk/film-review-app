/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { useApiGet } from "../../hooks/useApi";
import ActiveSlider from "../../components/ActiveSlider";
import RandomReviewCard from "../../components/RandomReviewCard";
import GenreButtonsContainer from "../../components/GenreButtonsContainer";
import MovieDetailsCarousel from "../../components/MovieDetailsCarousel";
import FilmPreviewCard from "../../components/FilmPreviewCard";
import MovieSearch from "../../components/MovieSearch";
import Pagination from "../../components/Pagination";
import FilterDropdown from "../../components/FilterDropdown";
import SortDropdown from "../../components/SortDropdown"; // Import the new component
import YearDropdown from "../../components/YearDropdown"; // Import the new component
import Footer from "../../components/Footer";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

export const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [rating, setRating] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const genreMap: { [key: number]: string } = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const API_KEY = "25827bdb07a5e10047fca31922e36d9e";

  const { data: popularMoviesData } = useApiGet(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );

  useEffect(() => {
    if (popularMoviesData && popularMoviesData.results) {
      const movieList = popularMoviesData.results.slice(0, 8);
      setMovies(movieList);

      const fetchReviews = async () => {
        const reviewPromises = movieList.map((movie: { id: any }) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${API_KEY}`
          ).then((res) => res.json())
        );
        const reviewsArray = await Promise.all(reviewPromises);
        setReviews(reviewsArray.map((reviewData) => reviewData.results || []));
      };
      fetchReviews();
    }
  }, [popularMoviesData]);

  const fetchMovies = async (
    page: number,
    genreIds: number[],
    selectedYears: string[]
  ) => {
    const genreQuery =
      genreIds.length > 0 ? `&with_genres=${genreIds.join(",")}` : "";
    const yearQuery =
      selectedYears.length > 0
        ? selectedYears
            .map((year) =>
              year === "<2000"
                ? "&primary_release_date.lte=1999-12-31"
                : `&primary_release_year=${year}`
            )
            .join("")
        : "";
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}${genreQuery}${yearQuery}`
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies(
        currentPage,
        selectedGenres,
        selectedYears
      );
      setMovies(movieData.results);
    };
    getMovies();
  }, [currentPage, selectedGenres, sortBy, selectedYears]);

  const handleMovieChange = (index: React.SetStateAction<number>) => {
    setCurrentMovieIndex(index);
  };

  const { data: randomMovieList } = useApiGet(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );

  const handleGenreClick = (genre: any) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleYearChange = (years: string[]) => {
    setSelectedYears(years);
  };

  const handleMovieSelect = (movie: Movie) => {
    console.log("Selected movie:", movie);
  };

  const handleGenreChange = (genreIds: number[]) => {
    setSelectedGenres(genreIds);
  };

  const genreButtonsArr = [
    "🍿All",
    "😂Comedy",
    "😨Drama",
    "👻Horror",
    "🧐Fantasy",
    "😎Action",
  ];

  const totalPages = 500;

  return (
    <AppLayout>
      <div className="ml-24 max-w-[640px]:ml-0 mr-4 md:h-[50%]">
        <GenreButtonsContainer
          genres={genreButtonsArr}
          onGenreClick={handleGenreClick}
        />
        <div className="flex flex-col md:flex-row justify-center mt-3 px-4 max-sm:p-0 ">
          <div className="bg-white  lg:w-[56%] md:w-[78%]  max-w-full m-5 rounded-xl relative  ">
            {movies.length > 0 && (
              <MovieDetailsCarousel
                movies={movies}
                onMovieChange={handleMovieChange}
              />
            )}
          </div>
          {reviews.length > 0 && reviews[currentMovieIndex] && (
            <RandomReviewCard reviews={reviews[currentMovieIndex]} />
          )}
        </div>
        <div className="mt-3 px-4 font-bold text-lg text-center">
          Special for you
        </div>
        {randomMovieList && randomMovieList.results && (
          <ActiveSlider movies={randomMovieList.results} />
        )}
        <div className="flex flex-col justify-center mx-auto w-full sm:w-[78%] space-y-4 md:space-y-0 md:grid md:grid-cols-1 lg:flex lg:flex-row bg-violet-300 p-4 rounded-xl my-4 md:gap-4">
          <div className="w-full md:w-full lg:w-2/4 lg:mr-4 ">
            <MovieSearch apiKey={API_KEY} onMovieSelect={handleMovieSelect} />
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-4 lg:flex lg:space-x-4 sm:justify-between md:justify-between">
            <FilterDropdown
              genres={genreMap}
              selectedGenres={selectedGenres}
              onGenreChange={handleGenreChange}
            />
            <SortDropdown sortBy={sortBy} onSortChange={handleSortChange} />
            <YearDropdown
              selectedYears={selectedYears}
              onYearChange={handleYearChange}
            />
          </div>
        </div>

        <div className="grid justify-items-center mt-5 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 w-[81%] md:w-[84%]">
            {movies &&
              movies.map((movie: Movie) => (
                <FilmPreviewCard
                  key={movie.id}
                  movie={movie}
                  genreMap={genreMap}
                />
              ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <Footer />
    </AppLayout>
  );
};

export default MainPage;
