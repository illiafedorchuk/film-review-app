import React from "react";
import ReviewChart from "../FilmPageComponents/ReviewModal/ReviewChart";

function MoviePlate() {
  const title =
    "The Jack in the Box: Rises and the Long Subtitle That Keeps Going";
  return (
    <div className="w-full md:w-[100%] md:h-56 bg-[var(--input-bg-color)] rounded-xl p-2 shadow-lg overflow-hidden">
      <div className="flex flex-wrap h-full">
        <div className="w-32 h-full rounded-xl bg-black">hello</div>
        <div className="mx-auto text-xl font-bold flex-1">
          <h1 className="text-center break-words">
            {title.length > 30 ? `${title.slice(0, 30)}...` : title}
          </h1>
          <ReviewChart score={8} label={""} />
        </div>
      </div>
    </div>
  );
}

export default MoviePlate;
