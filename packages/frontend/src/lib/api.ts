/* eslint-disable @typescript-eslint/no-explicit-any */
import { Movie, ApiResponse, MovieDetails, Actor, Crew } from "../types/types";
import axios from "./axios";

export const API_KEY: string = "25827bdb07a5e10047fca31922e36d9e";
export const BASE_URL: string = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  page: number,
  genreIds: number[],
  selectedYear: string,
  sortBy: string
): Promise<ApiResponse<Movie>> => {
  const genreQuery =
    genreIds.length > 0 ? `&with_genres=${genreIds.join(",")}` : "";
  const yearQuery =
    selectedYear === "<2000"
      ? "&primary_release_date.lte=1999-12-31"
      : selectedYear
      ? `&primary_release_year=${selectedYear}`
      : "";

  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortBy}${genreQuery}${yearQuery}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const fetchReviews = async (
  movieId: number
): Promise<ApiResponse<any>> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
};

export const fetchMovieCredits = async (
  movieId: number
): Promise<{ cast: Actor[]; crew: Crew[] }> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }

  return response.json();
};

export const fetchMovieImages = async (
  movieId: number
): Promise<{ backdrops: any[] }> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie images");
  }

  return response.json();
};

export const fetchMovieVideos = async (
  movieId: number
): Promise<{ results: any[] }> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  return response.json();
};

export const fetchSimilarMovies = async (
  movieId: number
): Promise<ApiResponse<MovieDetails>> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  return response.json();
};

export const bookmarkMovie = async (movie: any, token: string) => {
  const response = await axios.post(
    `http://localhost:3000/movie/bookmark`, // Ensure this matches your backend route
    {
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const unbookmarkMovie = async (movieId: number, token: string) => {
  const response = await axios.put(
    `http://localhost:3000/movie/unbookmovie`, // Ensure this matches your backend route
    {
      data: { movie_id: movieId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const addWatchLaterMovie = async (movie: any, token: string) => {
  const response = await axios.post(
    `http://localhost:3000/movie/add-watchlist`,
    {
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      genre_ids: movie.genre_ids,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const removeWatchLaterMovie = async (movieId: number, token: string) => {
  const response = await axios.put(
    `http://localhost:3000/movie/remove-watchlist`,
    { movie_id: movieId }, // Send movie_id directly in the request body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Function to fetch the watchlist
export const fetchWatchlist = async (token: string) => {
  const response = await axios.get("http://localhost:3000/user/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};
