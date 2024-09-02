import React from "react";

interface SliderItemProps {
  title: string;
  imageUrl?: string; // Make imageUrl optional
  onClick?: () => void;
}

const SliderItem: React.FC<SliderItemProps> = ({
  title,
  imageUrl, // Default to placeholder image
  onClick,
}) => {
  const isPlaceholder =
    imageUrl ===
    "https://image.tmdb.org/t/p/originalhttps://via.placeholder.com/150"; // Check if the image is the placeholder
  console.log(imageUrl);
  return (
    <div
      className="flex flex-col gap-4 mb-10 group relative shadow-lg  bg-violet-500 text-white rounded-xl overflow-hidden cursor-pointer h-[150px] w-full"
      onClick={onClick}
    >
      {isPlaceholder ? (
        <span className="text-5xl text-center content-center h-96 pt-10">
          😢
        </span>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      {!isPlaceholder && (
        <div className="absolute inset-0 bg-black opacity-5 group-hover:opacity-40 duration-300" />
      )}
      <div className="relative flex flex-col justify-end h-full p-4">
        <h1 className="text-lg lg:text-xl absolute bottom-2 left-2">{title}</h1>
      </div>
    </div>
  );
};

export default SliderItem;
