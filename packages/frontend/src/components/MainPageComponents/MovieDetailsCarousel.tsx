/* eslint-disable no-empty-pattern */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from "@mui/system";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string;
}

interface MovieDetailsCarouselProps {
  movies: Movie[];
  onMovieChange: (index: number) => void;
}

const WhiteLinearProgress = styled(LinearProgress)(({}) => ({
  height: 5,
  width: "90%",
  margin: "0 auto",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
}));

const MovieDetailsCarousel: React.FC<MovieDetailsCarouselProps> = ({
  movies,
  onMovieChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateMovieIndex = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % movies.length;
      return nextIndex;
    });
  }, [movies.length]);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            setProgress(0);
            updateMovieIndex();
            return 0;
          }
          return prevProgress + 0.1;
        });
      }, 15);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, updateMovieIndex]);

  useEffect(() => {
    onMovieChange(currentIndex);
  }, [currentIndex, onMovieChange]);

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  const currentMovie = movies[currentIndex];

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="bg-white w-full rounded-xl relative shadow-2xl">
      <div
        className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
            progress >= 100 ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            !currentMovie.overview ? "text-right" : "text-left"
          } p-4 text-white z-10`}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <div className="text-center">
            <h1 className="font-bold xs:text-xs sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
              {currentMovie.title}
            </h1>
            <p className="py-3 hidden sm:block xs:text-xs sm:text-lg md:text-md lg:text-lg xl:text-lg">
              {truncateText(currentMovie.overview, 150)}
            </p>
          </div>
        </div>
        <img
          src={
            currentMovie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
              : "https://via.placeholder.com/800x450?text=No+Image"
          }
          alt={currentMovie.title}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isHovered ? "brightness-75" : "brightness-50"
          }`}
          style={{ opacity: progress >= 100 ? 0 : 1 }}
        />
        <div className="absolute bottom-5 w-full">
          <WhiteLinearProgress variant="determinate" value={progress} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCarousel;
