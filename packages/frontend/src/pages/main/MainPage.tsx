/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import AppLayout from "../../components/layouts/AppLayout";
import { useApiGet } from "../../hooks/useApi";
import ActiveSlider from "../../components/MainPageComponents/ActiveSlider";
import RandomReviewCard from "../../components/MainPageComponents/RandomReviewCard";
import GenreButtonsContainer from "../../components/MainPageComponents/GenreButtonsContainer";
import MovieDetailsCarousel from "../../components/MainPageComponents/MovieDetailsCarousel";
import Footer from "../../components/Footer";
import MovieGrid from "../../components/MainPageComponents/MovieGrid";
import Pagination from "../../components/MainPageComponents/Pagination";
import SearchAndFilterSection from "../../components/MainPageComponents/SearchAndFilterSection";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  overview?: string;
  backdrop_path?: string;
}

const API_KEY = "25827bdb07a5e10047fca31922e36d9e";

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

const genreButtonsArr = [
  { id: 0, name: "🍿All" },
  { id: 35, name: "😂Comedy" },
  { id: 18, name: "😨Drama" },
  { id: 27, name: "👻Horror" },
  { id: 14, name: "🧐Fantasy" },
  { id: 28, name: "😎Action" },
];

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [moviesCarousel, setMoviesCarousel] = useState<Movie[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>("🍿All");
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const { data: popularMoviesData } = useApiGet(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );

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
    return response.json();
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

  useEffect(() => {
    const getMoviesForCarousel = async () => {
      if (selectedGenres.length > 0) {
        const movieData = await fetchMovies(1, selectedGenres, []);
        setMoviesCarousel(movieData.results.slice(0, 8));
      } else if (popularMoviesData?.results) {
        setMoviesCarousel(popularMoviesData.results.slice(0, 8));
      }
    };
    getMoviesForCarousel();
  }, [selectedGenres, popularMoviesData]);

  useEffect(() => {
    if (moviesCarousel.length > 0) {
      const fetchReviews = async () => {
        const reviewPromises = moviesCarousel.map((movie) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/reviews?api_key=${API_KEY}`
          ).then((res) => res.json())
        );
        const reviewsArray = await Promise.all(reviewPromises);
        setReviews(reviewsArray.map((reviewData) => reviewData.results || []));
      };
      fetchReviews();
    }
  }, [moviesCarousel]);

  const handleMovieChange = (index: number) => setCurrentMovieIndex(index);

  const { data: randomMovieList } = useApiGet(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
  );

  const handleGenreClick = (genreId: number) => {
    if (genreId === 0) {
      setSelectedGenre("🍿All");
      setSelectedGenres([]);
    } else {
      setSelectedGenre(genreMap[genreId]);
      setSelectedGenres([genreId]);
    }
  };

  const handleSortChange = (value: string) => setSortBy(value);

  const handleYearChange = (years: string[]) => setSelectedYears(years);

  const handleGenreChange = (genreIds: number[]) => setSelectedGenres(genreIds);

  const totalPages = 500;

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <GenreButtonsContainer
            genres={genreButtonsArr}
            onGenreClick={handleGenreClick}
            selectedGenre={selectedGenre}
          />

          <div className="flex flex-col md:flex-row mt-3 w-full gap-4 justify-between py-5 max-h-[440px]">
            {moviesCarousel.length > 0 && (
              <MovieDetailsCarousel
                movies={moviesCarousel}
                onMovieChange={handleMovieChange}
              />
            )}
            {reviews.length > 0 && reviews[currentMovieIndex] && (
              <RandomReviewCard reviews={reviews[currentMovieIndex]} />
            )}
          </div>

          <div className="mt-3 font-bold text-3xl text-center w-full">
            Special for you
          </div>
          {randomMovieList?.results && (
            <div className="w-full pt-5">
              <ActiveSlider movies={randomMovieList.results} />
            </div>
          )}
          <div className="font-bold text-3xl text-center w-full">Discover</div>
          <SearchAndFilterSection
            apiKey={API_KEY}
            genreMap={genreMap}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            selectedYears={selectedYears}
            onYearChange={handleYearChange}
            onMovieSelect={() => {}}
          />

          <MovieGrid movies={movies} genreMap={genreMap} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <Footer />
      </AppLayout>
    </DarkModeProvider>
  );
};

export default MainPage;
