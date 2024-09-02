import React, { useState, useEffect } from "react";
import { BiBookmark, BiSolidBookmark } from "react-icons/bi";
import axios from "axios";
import { Movie } from "../../types/types";
const BASE_URL = "https://image.tmdb.org/t/p/w500";

interface MoviePosterProps {
  movie: Movie;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  useEffect(() => {
    const checkIfBookmarked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/bookmarked-movies`, // Adjust the path as needed
          {
            withCredentials: true,
          }
        );
        const bookmarkedMovies = response.data.bookmarkedMovies;
        if (bookmarkedMovies.includes(String(movie.id))) {
          setIsBooked(true);
        }
      } catch (error) {
        console.error("Failed to fetch bookmarked movies", error);
      }
    };

    checkIfBookmarked();
  }, [movie.id]);

  const handleBookmark = async () => {
    try {
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
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Failed to bookmark the movie", error);
    }
  };

  const handleUnbookmark = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/movie/unbookmark`, // Ensure this matches your backend route
        {
          movie_id: movie.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsBooked(false);
      }
    } catch (error) {
      console.error("Failed to unbookmark the movie", error);
    }
  };

  return (
    <div className="lg:w-72 mx-auto md:w-56 relative ">
      <div
        className="absolute top-2 right-2 duration-300"
        onMouseEnter={() => setIsBookmarkHovered(true)}
        onMouseLeave={() => setIsBookmarkHovered(false)}
        onClick={isBooked ? handleUnbookmark : handleBookmark}
      >
        {isBookmarkHovered || isBooked ? (
          <BiSolidBookmark className="text-yellow-400 text-4xl duration-300" />
        ) : (
          <BiBookmark className="text-yellow-400 text-4xl duration-300" />
        )}
      </div>
      <img
        src={`${BASE_URL}${movie.poster_path}`}
        alt="Movie Poster"
        className="rounded-xl shadow-lg w-full object-cover"
      />
    </div>
  );
};

export default MoviePoster;
