import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

interface Movie {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
}

interface MovieDetailsCarouselProps {
  movies: Movie[];
}

const MovieDetailsCarousel: React.FC<MovieDetailsCarouselProps> = ({
  movies,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setTransitioning(true);
          setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
            setProgress(0);
            setTransitioning(false);
          }, 300); // Adjust the transition duration as needed
          return 100;
        }
        return prevProgress + 10;
      });
    }, 600); // Adjust the interval as needed

    return () => {
      clearInterval(timer);
    };
  }, [movies]);

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  const currentMovie = movies[currentIndex];

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          transitioning ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div className="absolute top-1/4 sm:top-1/3 sm:left-10 lg:left-24 xl:left-20 p-4 sm:p-0 text-left z-10 text-white">
        <h1 className="font-bold text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          {currentMovie.original_title}
        </h1>
        <p className="text-base sm:text-sm md:text-lg lg:text-lg xl:text-xl py-3 sm:py-5">
          {truncateText(currentMovie.overview, 150)}
        </p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
        alt={currentMovie.original_title}
        className="w-full h-full object-cover filter brightness-50 transition-opacity duration-1000"
        style={{ opacity: transitioning ? 0 : 1 }}
      />
      <div className="absolute bottom-0 w-full z-10">
        <LinearProgress variant="determinate" value={progress} />
      </div>
    </div>
  );
};

export default MovieDetailsCarousel;
