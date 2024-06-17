import React from "react";

interface TrailerVideoProps {
  trailerKey: string;
}

const TrailerVideo: React.FC<TrailerVideoProps> = ({ trailerKey }) => {
  return (
    <div className="relative pb-[70%] md:pb-[50%] lg:pb-[40%]  overflow-hidden w-full mt-4 mx-auto md:w-full lg:w-2/3">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        aria-labelledby="videoTitle"
      ></iframe>
    </div>
  );
};

export default TrailerVideo;
