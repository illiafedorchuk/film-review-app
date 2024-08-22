// MovieCarousel.tsx
import React from "react";
import Slider from "react-slick";
import FilmCard from "./FilmCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Movie {
  id: number;
  movie_id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
}

interface MovieCarouselProps {
  movies: Movie[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="">
      <Slider {...settings}>
        {movies.map((movie) => (
          <FilmCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
