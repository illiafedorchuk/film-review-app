/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useApiGet } from "../../hooks/useApi";
import MoviePoster from "../../components/FilmPageComponents/MoviePoster";
import AppLayout from "../../components/layouts/AppLayout";

const API_KEY = "25827bdb07a5e10047fca31922e36d9e";

function MoviePage() {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: movieDetails } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <div>
        <MoviePoster movie={movieDetails} />
      </div>
    </AppLayout>
  );
}

export default MoviePage;
