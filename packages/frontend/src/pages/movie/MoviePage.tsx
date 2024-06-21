/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import { useApiGet } from "../../hooks/useApi";
import MoviePoster from "../../components/FilmPageComponents/MoviePoster";
import AppLayout from "../../components/layouts/AppLayout";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import MovieCredentials from "../../components/FilmPageComponents/MovieCredentials";
import ActorsCarousel from "../../components/FilmPageComponents/ActorsCarousel";
import TrailerVideo from "../../components/FilmPageComponents/TrailerVideo";
import Comments from "../../components/FilmPageComponents/Comments";
import FastReaction from "../../components/FilmPageComponents/FastReaction";
import YourReviewArea from "../../components/FilmPageComponents/YourReviewArea";
import Carousel from "../../components/FilmPageComponents/Carousel";

const BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_URL = "https://via.placeholder.com/500x275";

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
  const { data: similar, isLoading: similarLoading } = useApiGet(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
  );

  const findTrailerKey = (data: any): string | null => {
    if (!data || !data.results) return null;
    const trailer = data.results.find((video: any) => video.type === "Trailer");
    return trailer ? trailer.key : null;
  };

  const trailerKey = findTrailerKey(movieVideos);

  if (
    detailsLoading ||
    actorsLoading ||
    imagesLoading ||
    videosLoading ||
    similarLoading
  ) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (
    !movieDetails ||
    !actorsData ||
    !movieImages ||
    !movieVideos ||
    !similar
  ) {
    return <div className="text-center py-20">Failed to load data</div>;
  }

  const renderImage = (image: { file_path: string }) => (
    <img
      src={image.file_path ? `${BASE_URL}${image.file_path}` : PLACEHOLDER_URL}
      alt="Movie Image"
      className="w-full h-auto rounded-lg object-cover"
    />
  );

  const renderRecommendation = (recommendation: {
    title: string;
    backdrop_path: string;
    id: number;
    vote_average: number;
    release_date: string;
  }) => (
    <Link to={`/movie/${recommendation.id}`}>
      <img
        src={
          recommendation.backdrop_path
            ? `${BASE_URL}${recommendation.backdrop_path}`
            : PLACEHOLDER_URL
        }
        alt={recommendation.title}
        className="w-full h-auto rounded-lg object-cover"
      />
      <div className="h-16 flex items-center justify-center">
        <h3 className="text-center text-xl font-bold leading-tight overflow-hidden overflow-ellipsis">
          {recommendation.title}
        </h3>
      </div>
      <p className="text-center text-gray-500">{recommendation.release_date}</p>
      <p className="text-center text-yellow-500">
        {Math.floor(recommendation.vote_average * 100) / 100}
      </p>
    </Link>
  );

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[6%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[15%] lg:pr-[10%] md:pr-[5%] py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 ">
            <div className="flex flex-col space-y-4">
              <MoviePoster movie={movieDetails} />
              <FastReaction />
            </div>
            <div className="md:col-span-2 flex flex-col justify-between">
              <MovieCredentials
                movieDetails={movieDetails}
                actorsData={actorsData}
              />
              <YourReviewArea rating={5} details={movieDetails} />
            </div>
          </div>
          <div className="pt-5 text-[var(--text-color)] mb-4">
            <p className="font-bold text-3xl text-center pb-5">Overview</p>
            <p className="whitespace-pre-line text-xl">
              {movieDetails.overview}
            </p>
          </div>
          <ActorsCarousel actors={actorsData.cast} />
          {trailerKey && (
            <div id="trailer" className="my-2">
              <h2 className="font-bold text-3xl text-center pb-5">
                Watch Trailer
              </h2>
              <TrailerVideo trailerKey={trailerKey} />
            </div>
          )}
          <Carousel
            title="Photos"
            data={movieImages.backdrops}
            renderItem={renderImage}
          />
          <Carousel
            title="Recommendations"
            data={similar.results}
            renderItem={renderRecommendation}
          />
          <Comments comments={sampleComments} commentsPerPage={5} />
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default MoviePage;
