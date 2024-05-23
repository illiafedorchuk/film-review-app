// components/GenreButtonsContainer.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import GenreButton from "./GenreButton";

const GenreButtonsContainer = ({
  genres,
  onGenreClick,
}: {
  genres: string[];
  onGenreClick: (genre: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-5 px-5">
      {/* Swiper for small devices */}
      <div className="sm:block md:hidden w-full max-md:w-[80%]">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          freeMode={true}
          modules={[FreeMode]}
          className="max-w-full"
        >
          {genres.map((genre) => (
            <SwiperSlide key={genre}>
              <GenreButton genre={genre} onClick={() => onGenreClick(genre)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for medium and larger devices */}
      <div className="hidden md:grid mt-10 w-4/5 gap-4 px-4 md:grid-cols-3 lg:grid-cols-6">
        {genres.map((genre) => (
          <GenreButton
            genre={genre}
            key={genre}
            onClick={() => onGenreClick(genre)}
          />
        ))}
      </div>
    </div>
  );
};

export default GenreButtonsContainer;
