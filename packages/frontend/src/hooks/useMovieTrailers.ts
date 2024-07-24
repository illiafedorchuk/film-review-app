import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../lib/constants";

interface Trailer {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export const useMovieTrailers = (movieId: number | null) => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieTrailers = async () => {
      if (!movieId) return;

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie trailers");
        }
        const data = await response.json();
        setTrailers(data.results || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieTrailers();
  }, [movieId]);

  return { trailers, loading, error };
};
