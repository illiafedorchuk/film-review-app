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
import Pagination from "../../components/Pagination";
import { BiSearch } from "react-icons/bi"; // Import BiIcons

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
  const [reviews, setReviews] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [rating, setRating] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const moviesPerPage = 20;

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

  const { data: popularMoviesData } = useApiGet(
    "https://api.themoviedb.org/3/movie/popular",
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    }
  );

  useEffect(() => {
    if (popularMoviesData && popularMoviesData.results) {
      const movieList = popularMoviesData.results.slice(0, 8);
      setMovies(movieList);

      const fetchReviews = async () => {
        const reviewPromises = movieList.map((movie: { id: any }) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=25827bdb07a5e10047fca31922e36d9e`
          ).then((res) => res.json())
        );
        const reviewsArray = await Promise.all(reviewPromises);
        setReviews(reviewsArray.map((reviewData) => reviewData.results || []));
      };
      fetchReviews();
    }
  }, [popularMoviesData]);

  const handleMovieChange = (index: React.SetStateAction<number>) => {
    setCurrentMovieIndex(index);
  };

  const { data: randomMovieList } = useApiGet(
    "https://api.themoviedb.org/3/movie/top_rated",
    {
      api_key: "25827bdb07a5e10047fca31922e36d9e",
    }
  );

  const handleGenreClick = (genre: any) => {
    setSelectedGenre(genre);
    console.log("Selected genre:", genre);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const genreButtonsArr = [
    "🍿All",
    "😂Comedy",
    "😨Drama",
    "👻Horror",
    "🧐Fantasy",
    "😎Action",
  ];

  const sortByOptions = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "release_date.desc", label: "Release Date" },
    { value: "vote_average.desc", label: "Rating" },
  ];

  const totalPages = Math.ceil(
    (randomMovieList?.results.length || 0) / moviesPerPage
  );

  const paginatedMovies = randomMovieList?.results.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <AppLayout>
      <div className="ml-16">
        <GenreButtonsContainer
          genres={genreButtonsArr}
          onGenreClick={handleGenreClick}
        />
        <div className="flex flex-col md:flex-row justify-center mt-3 px-12 max-sm:p-0">
          <div className="bg-white w-full lg:w-[60%] max-w-full m-5 rounded-xl relative h-96">
            {movies.length > 0 && (
              <MovieDetailsCarousel
                movies={movies}
                onMovieChange={handleMovieChange}
              />
            )}
          </div>
          {reviews.length > 0 && (
            <RandomReviewCard reviews={reviews[currentMovieIndex]} />
          )}
        </div>
        <div className="mt-3 px-44 sm:px-10 md:px-20 lg:px-44 font-bold text-lg sm:text-xl text-center">
          Special for you
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        {randomMovieList && randomMovieList.results && (
          <ActiveSlider movies={randomMovieList.results} />
        )}
        <div className="flex justify-center items-center w-full mt-5">
          <div className="bg-violet-300 h-auto w-[77%] p-4 rounded-lg shadow-md flex flex-col md:flex-row justify-center px-10 items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-2/4">
              <BiSearch
                className="absolute left-3 top-3 text-gray-500"
                size="1.5em"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="pl-10 p-2 border bg-white w-full h-12 rounded-full"
              />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => handleGenreClick(e.target.value)}
              className="p-2 border rounded-full h-12 bg-white w-56"
            >
              {genreButtonsArr.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="p-2 border rounded-full h-12 bg-white w-56"
            >
              {sortByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="flex items-center flex-wrap justify-center">
              <label htmlFor="rating" className="text-gray-700">
                Rating
              </label>
              <input
                id="rating"
                type="range"
                min="0"
                max="10"
                value={rating}
                onChange={handleRatingChange}
                className="w-72 accent-violet-500"
              />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        <div className="grid justify-items-center mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 w-[81%]">
            {paginatedMovies &&
              paginatedMovies.map((movie: Movie) => (
                <FilmPreviewCard
                  key={movie.id}
                  movie={movie}
                  genreMap={genreMap}
                />
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MainPage;
