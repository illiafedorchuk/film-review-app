/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  fetchCurrentUser,
  fetchRatedMovies,
  fetchUserReview,
} from "../../lib/api";
import { DarkModeProvider } from "../../components/layouts/DarkModeContext";
import AppLayout from "../../components/layouts/AppLayout";
import MoviePlate from "../../components/RatedMoviesComponents/MoviePlate";
import ReviewModal from "../../components/FilmPageComponents/ReviewModal/ReviewModal";
import UnauthorizedTable from "../../components/unauthComponents/UnauthorizedTable"; // Ensure this import is correct

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const token = ""; // Replace this with actual token management logic

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await fetchCurrentUser(token);
        setCurrentUser(userData);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setShowUnauthorized(true);
        } else {
          setError("Unauthorized");
        }
      }
    };

    loadCurrentUser();
  });

  useEffect(() => {
    const loadRatedMovies = async () => {
      if (showUnauthorized) return;

      try {
        const data = await fetchRatedMovies(token);
        setRatedMovies(data.ratedMovies);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setShowUnauthorized(true);
        } else {
          setError("Failed to fetch rated movies");
        }
      } finally {
        setLoading(false);
      }
    };

    loadRatedMovies();
  }, [token, showUnauthorized, ratedMovies]);

  const handlePlateClick = async (movie: Movie) => {
    try {
      const reviews = await fetchUserReview(movie.movie_movie_id);
      const userReview = reviews.length > 0 ? reviews[0] : null;

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error == "Unauthorized") {
    return (
      <DarkModeProvider>
        <AppLayout>
          <UnauthorizedTable
            pageName="Restricted Access"
            text="You need to be logged in to perform this action."
          />
        </AppLayout>
      </DarkModeProvider>
    );
  }

  return (
    <DarkModeProvider>
      <AppLayout>
        <div className="px-[6%] sm:pl-[15%] sm:pr-[5%] md:pl-[13%] lg:pl-[15%] lg:pr-[10%] md:pr-[5%] py-10">
          <h1 className="text-4xl font-bold pb-10 text-center">
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
                  onClick={() => handlePlateClick(movie)}
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

          {selectedMovie && (
            <ReviewModal
              open={isModalOpen}
              onClose={handleCloseModal}
              reviewId={selectedMovie.review?.id || 0}
              hasReview={!!selectedMovie.review}
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
            />
          )}
        </div>
      </AppLayout>
    </DarkModeProvider>
  );
}

export default RatedMovies;
