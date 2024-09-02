import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import SliderItem from "./SliderItem";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string;
}

const ActiveSlider = ({ movies }: { movies: Movie[] }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`); // Use navigate to redirect to the movie page
  };
  console.log(movies);

  return (
    <div className="w-full">
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <span className="text-6xl">😢</span>
          <p className="font-bold mb-2 text-2xl">
            We don't have this yet. Check back later!
          </p>
        </div>
      ) : (
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
          modules={[FreeMode]} // Removed Pagination module
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SliderItem
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                onClick={() => handleMovieClick(movie.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ActiveSlider;
