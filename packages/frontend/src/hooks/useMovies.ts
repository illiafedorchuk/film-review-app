/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchMovies, fetchReviews } from "../lib/api";
import { Movie } from "../types/types";

export const useMovies = (
  page: number,
  genreIds: number[],
  selectedYear: string,
  sortBy: string
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const movieData = await fetchMovies(page, genreIds, selectedYear, sortBy);
      setMovies(movieData.results);
    };
    getMovies();
  }, [page, genreIds, selectedYear, sortBy]);

  return movies;
};

export const useReviews = (movies: any[]) => {
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
    if (movies.length > 0) {
      const fetchAllReviews = async () => {
        const reviewPromises = movies.map((movie) => fetchReviews(movie.id));
        const reviewsArray = await Promise.all(reviewPromises);
        setReviews(reviewsArray.map((reviewData) => reviewData.results || []));
      };
      fetchAllReviews();
    }
  }, [movies]);

  return reviews;
};
