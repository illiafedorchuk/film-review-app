/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/system";

interface Movie {
  id: number;
  original_title: string;
  overview: string;
  backdrop_path: string;
}

interface MovieDetailsCarouselProps {
  movies: Movie[];
  onMovieChange: (index: number) => void;
}

const WhiteLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: "90%",
  margin: "0 auto",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: "width 0.01s linear",
  },
}));

const MovieDetailsCarousel: React.FC<MovieDetailsCarouselProps> = ({
  movies,
  onMovieChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            const nextIndex = (currentIndex + 1) % movies.length;
            setCurrentIndex(nextIndex);
            onMovieChange(nextIndex);
            return 0;
          }
          return prevProgress + 0.1; // Smaller increment for smoother animation
        });
      }, 10); // Very short interval for smooth progress
    }

    return () => {
      clearInterval(timer);
    };
  }, [movies, currentIndex, onMovieChange, isHovered]);

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
    <div
      className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer duration-500 shadow-2xl hover:shadow-4xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          progress >= 100 ? "opacity-100" : "opacity-0"
        }`}
      ></div>
      <div className="absolute top-1/4 sm:top-1/3 md:text-left md:left-5 sm:left-10 lg:left-24 xl:left-20 p-4 lg:mr-24 sm:p-0 text-left z-10 text-white">
        <h1 className="font-bold text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl">
          {currentMovie.original_title}
        </h1>
        <p className="text-base sm:text-sm md:text-md xl:text-lg py-3 sm:py-5">
          {truncateText(currentMovie.overview, 150)}
        </p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
        alt={currentMovie.original_title}
        className={`w-full h-full object-cover filter brightness-50 transition-opacity duration-1000 ${
          isHovered ? "brightness-10" : ""
        }`}
        style={{ opacity: progress >= 100 ? 0 : 1 }}
      />
      <div className="absolute bottom-5 w-full z-10">
        <WhiteLinearProgress variant="determinate" value={progress} />
      </div>{" "}
    </div>
  );
};

export default MovieDetailsCarousel;
