import React from "react";

interface TrailerVideoProps {
  trailerKey: string;
}

const TrailerVideo: React.FC<TrailerVideoProps> = ({ trailerKey }) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full bg-black my-4 mx-auto rounded-lg shadow-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
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
