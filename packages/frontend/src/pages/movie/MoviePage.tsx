/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useApiGet } from "../../hooks/useApi";
import MoviePoster from "../../components/FilmPageComponents/MoviePoster";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import MovieCredentials from "../../components/FilmPageComponents/MovieCredentials";
import ImageCarousel from "../../components/FilmPageComponents/ImageCarousel";
import ActorsCarousel from "../../components/FilmPageComponents/ActorsCarousel";
import TrailerVideo from "../../components/FilmPageComponents/TrailerVideo";
import Comments from "../../components/FilmPageComponents/Comments";

const sampleComments = [
  {
    id: 1,
    name: "John Doe",
    avatarUrl: "https://via.placeholder.com/48",
    timestamp: "2 hours ago",
    text: "Great movie! Highly recommended.",
    likes: 0,
    dislikes: 0,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarUrl: "https://via.placeholder.com/48",
    timestamp: "1 day ago",
    text: "I loved the acting and the storyline.",
    likes: 0,
    dislikes: 0,
  },
];

const API_KEY = "25827bdb07a5e10047fca31922e36d9e";

function MoviePage() {
  const { movieId } = useParams<{ movieId: string }>();

  const { data: actorsData, isLoading: actorsLoading } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const { data: movieDetails, isLoading: detailsLoading } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  const { data: movieImages, isLoading: imagesLoading } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
  );
  const { data: movieVideos, isLoading: videosLoading } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const findTrailerKey = (data: any): string | null => {
    if (!data || !data.results) return null;
    const trailer = data.results.find((video: any) => video.type === "Trailer");
    return trailer ? trailer.key : null;
  };

  const trailerKey = findTrailerKey(movieVideos);

  if (detailsLoading || actorsLoading || imagesLoading || videosLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!movieDetails || !actorsData || !movieImages || !movieVideos) {
    return <div className="text-center py-20">Failed to load data</div>;
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="pl-60 pr-36 xs:px-2 py-10">
          <div className="flex flex-wrap">
            <MoviePoster movie={movieDetails} />
            <MovieCredentials
              movieDetails={movieDetails}
              actorsData={actorsData}
            />
          </div>
          <ActorsCarousel actors={actorsData.cast} />
          {trailerKey && (
            <div className="my-4">
              <h2 className="text-xl font-bold mb-2">Watch Trailer</h2>
              <TrailerVideo trailerKey={trailerKey} />
            </div>
          )}
          <ImageCarousel images={movieImages.backdrops} />
          <Comments comments={sampleComments} commentsPerPage={5} />
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default MoviePage;
