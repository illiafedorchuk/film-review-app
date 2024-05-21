import React from "react";

interface SliderItemProps {
  title: string;
  imageUrl: string;
}

const SliderItem: React.FC<SliderItemProps> = ({ title, imageUrl }) => {
  return (
    <div className="flex flex-col gap-4 mb-10 group relative shadow-lg text-white rounded-xl overflow-hidden cursor-pointer h-[150px] w-full">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
      <div className="relative flex flex-col justify-end h-full p-4">
        <h1 className="text-lg lg:text-xl absolute bottom-2 left-2">{title}</h1>
      </div>
    </div>
  );
};

export default SliderItem;
