/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps<T> {
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
}

const Carousel = <T extends {}>({
  title,
  data,
  renderItem,
}: CarouselProps<T>) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
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
      <h1 className="font-bold text-3xl text-center pb-5">{title}</h1>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="p-2">
            {renderItem(item)}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
