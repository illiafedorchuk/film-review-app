/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import SliderItem from "./SliderItem";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
}

const ActiveSlider = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="w-full">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <SliderItem
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
