import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";

const placeholderData = [
  {
    title: "Title 1",
    content: "Content 1",
    icon: RxArrowTopRight,
  },
  {
    title: "Title 2",
    content: "Content 2",
    icon: RxArrowTopRight,
  },
  {
    title: "Title 3",
    content: "Content 3",
    icon: RxArrowTopRight,
  },
  {
    title: "Title 4",
    content: "Content 4",
    icon: RxArrowTopRight,
  },
  {
    title: "Title 5",
    content: "Content 5",
    icon: RxArrowTopRight,
  },
];

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col py-5 px-5">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
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
        className="max-w-full lg:max-w-[80%]"
      >
        {placeholderData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-4 mb-10 group relative shadow-lg text-white rounded-xl px-4 py-6 h-[175px] md:h-[200px] w-full overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center" />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-2">
                <h1 className="text-lg lg:text-xl">{item.title} </h1>
                <p className="lg:text-[14px]">{item.content} </p>
              </div>
              <RxArrowTopRight className="absolute bottom-3 left-3 w-[24px] h-[24px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
