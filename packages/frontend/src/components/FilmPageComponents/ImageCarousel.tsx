import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageCarouselProps {
  images: Array<{ file_path: string }>;
}

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
      <h1 className="text-center py-5 text-4xl font-bold text-violet-700">
        Photos
      </h1>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <img
              src={`${BASE_URL}${image.file_path}`}
              alt={`Movie Image ${index + 1}`}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
