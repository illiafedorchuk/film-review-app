/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../../components/layouts/AppLayout";
import ActiveSlider from "../../components/MainPageComponents/ActiveSlider";
import RandomReviewCard from "../../components/MainPageComponents/RandomReviewCard";
import GenreButtonsContainer from "../../components/MainPageComponents/GenreButtonsContainer";
import MovieDetailsCarousel from "../../components/MainPageComponents/MovieDetailsCarousel";
import Footer from "../../components/Footer";
import MovieGrid from "../../components/MainPageComponents/MovieGrid";
import Pagination from "../../components/MainPageComponents/Pagination";
import SearchAndFilterSection from "../../components/MainPageComponents/SearchAndFilterSection";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import { useApiGet } from "../../hooks/useApi";
import { useMovies, useReviews } from "../../hooks/useMovies";
import {
  API_KEY,
  BASE_URL,
  GENRE_MAP,
  GENRE_BUTTONS,
  TOTAL_PAGES,
} from "../../lib/constants";
import { Movie, ApiResponse } from "../../types/types";

const MainPage: React.FC = () => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const navigate = useNavigate();

  const { data: randomMovieList } = useApiGet<ApiResponse<Movie>>(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  const movies = useMovies(currentPage, selectedGenres, selectedYear, sortBy);
  const moviesCarousel = useMovies(1, selectedGenres, "", sortBy).slice(0, 8);
  const reviews = useReviews(moviesCarousel);

  const handleGenreClick = (genreId: number) => {
    if (genreId === 0) {
      setSelectedGenre(0);
    } else {
      setSelectedGenre(genreId);
      setSelectedGenres([genreId]);
    }
  };

  const handleSortChange = (value: string) => setSortBy(value);

  const handleYearChange = (year: string) => setSelectedYear(year);

  const handleGenreChange = (genreIds: number[]) => setSelectedGenres(genreIds);

  const handleMovieSelect = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const handleMovieChange = (index: number) => setCurrentMovieIndex(index);

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[10%] lg:pr-[10%] lg:pl-[15%] md:pr-[10%] md:pl-[15%] sm:pl-[15%] py-10">
          <GenreButtonsContainer
            genres={GENRE_BUTTONS}
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
            genreMap={GENRE_MAP}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            onMovieSelect={handleMovieSelect}
          />

          <MovieGrid movies={movies} genreMap={GENRE_MAP} />
          <Pagination
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={setCurrentPage}
          />
        </div>
        <Footer />
      </AppLayout>
    </DarkModeProvider>
  );
};

export default MainPage;
