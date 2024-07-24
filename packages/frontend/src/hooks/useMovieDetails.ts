/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieImages,
  fetchMovieVideos,
  fetchSimilarMovies,
} from "../lib/api";

export const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [actorsData, setActorsData] = useState<any[]>([]);
  const [movieImages, setMovieImages] = useState<any[]>([]);
  const [movieVideos, setMovieVideos] = useState<any[]>([]);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [details, credits, images, videos, similar] = await Promise.all([
          fetchMovieDetails(movieId),
          fetchMovieCredits(movieId),
          fetchMovieImages(movieId),
          fetchMovieVideos(movieId),
          fetchSimilarMovies(movieId),
        ]);

        setMovieDetails(details);
        setActorsData(credits.cast);
        setMovieImages(images.backdrops);
        setMovieVideos(videos.results);
        setSimilarMovies(similar.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchDetails();
    }
  }, [movieId]);

  return {
    movieDetails,
    actorsData,
    movieImages,
    movieVideos,
    similarMovies,
    loading,
    error,
  };
};
