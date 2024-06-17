import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ActorsCarouselProps {
  actors: Array<{ name: string; character: string; profile_path: string }>;
}

const BASE_URL = "https://image.tmdb.org/t/p/w200";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

const ActorsCarousel: React.FC<ActorsCarouselProps> = ({ actors }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="mt-4">
      <h2 className="font-bold text-3xl text-center pb-5">Star cast</h2>
      <Slider {...settings}>
        {actors.map((actor, index) => (
          <div key={index} className="p-2">
            <img
              src={
                actor.profile_path
                  ? `${BASE_URL}${actor.profile_path}`
                  : PLACEHOLDER_IMAGE
              }
              alt={actor.name}
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
            <p className="mt-2 text-center font-semibold text-sm">
              {actor.name}
            </p>
            <p className="text-center text-xs text-violet-600">
              {actor.character}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ActorsCarousel;
