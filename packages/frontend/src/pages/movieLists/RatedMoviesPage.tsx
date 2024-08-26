import { useEffect, useState } from "react";
import { fetchRatedMovies, fetchUserReview } from "../../lib/api";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import MoviePlate from "../../components/RatedMoviesComponents/MoviePlate";
import ReviewModal from "../../components/FilmPageComponents/ReviewModal/ReviewModal";

interface Movie {
  movie_movie_id: number;
  movie_title: string;
  movie_poster_path: string;
  movierating: number;
  movie_backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
  review?: {
    id: number;
    ratings: { [key: string]: number };
    text: string;
    rating: number;
  };
}

function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [token] = useState<string>("your-auth-token");

  useEffect(() => {
    const loadRatedMovies = async () => {
      try {
        const data = await fetchRatedMovies(token);
        setRatedMovies(data.ratedMovies);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch rated movies");
        setLoading(false);
        console.error(err);
      }
    };

    loadRatedMovies();
  }, [token]);

  const handlePlateClick = async (movie: Movie) => {
    try {
      // Fetch the user's review for the selected movie
      const reviews = await fetchUserReview(movie.movie_movie_id, token);
      const userReview = reviews.length > 0 ? reviews[0] : null;

      // Set the selected movie and review details
      setSelectedMovie({
        ...movie,
        review: userReview
          ? {
              id: userReview.id,
              ratings: userReview.criteriaRatings || {},
              text: userReview.comment || "",
              rating: parseFloat(userReview.rating),
            }
          : undefined,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch user review:", error);
    }
  };

  useEffect(() => {
    if (selectedMovie) {
      console.log("selectedMovie:", selectedMovie);
    }
  }, [selectedMovie]); // This effect will trigger when selectedMovie is updated

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null); // Clear selected movie
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[5%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[8%] lg:pr-[2%] md:pr-[5%] py-10 text-center">
          <h1 className=" text-4xl font-bold pb-10">
            Rated <span className="text-violet-500">Movies</span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 justify-items-center">
            {ratedMovies.length > 0 ? (
              ratedMovies.map((movie) => (
                <MoviePlate
                  key={movie.movie_movie_id}
                  movie_title={movie.movie_title}
                  movierating={movie.movierating}
                  movie_poster_path={movie.movie_poster_path}
                  onClick={() => handlePlateClick(movie)} // Fetch and set review on click
                  onEdit={() =>
                    console.log("Edit movie:", movie.movie_movie_id)
                  }
                  onDelete={() =>
                    console.log("Delete movie:", movie.movie_movie_id)
                  }
                />
              ))
            ) : (
              <div>No rated movies found.</div>
            )}
          </div>

          {/* Review Modal */}
          {selectedMovie && (
            <ReviewModal
              open={isModalOpen}
              onClose={handleCloseModal}
              reviewId={selectedMovie.review?.id || 0} // Ensure 'reviewId' is passed correctly
              hasReview={!!selectedMovie.review} // Ensure 'hasReview' is correct
              movieDetails={{
                movie_Id: selectedMovie.movie_movie_id,
                title: selectedMovie.movie_title,
                release_date: selectedMovie.release_date,
                backdrop_path: selectedMovie.movie_backdrop_path,
                vote_average: selectedMovie.vote_average,
                posterUrl: selectedMovie.movie_poster_path,
                genre_ids: selectedMovie.genre_ids ?? [],
                review: selectedMovie.review,
              }}
              token={token}
            />
          )}
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default RatedMovies;
