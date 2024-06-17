import React from "react";
import { BiSolidStar } from "react-icons/bi";
interface ReviewProps {
  rating?: number;
}

const YourReviewArea: React.FC<ReviewProps> = ({ rating }) => {
  return (
    <div className="relative  pl-0 py-10 md:pl-14 lg:w-[70%] md:w-full">
      <div className=" rounded-lg bg-violet-500">
        <div className="rounded-lg bg-[var(--link-hover-color)] relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="bg-[var(--button-bg-color)] rounded-lg w-full h-full flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-[0_0_30px_3px_rgba(100,0,300,0.3)]">
            <h1 className="text-lg font-bold mb-2 text-white">Your Review</h1>
            <div className="flex items-center mb-2">
              {rating && rating > 0 ? (
                <>
                  <span className="text-sm font-semibold text-white">
                    You mark this film
                  </span>
                  <span className="text-yellow-500 font-bold text-xl ml-2">
                    {rating}
                  </span>
                  <span className="ml-1 text-sm text-yellow-500">/ 10</span>
                  <BiSolidStar className="text-yellow-500" />
                </>
              ) : (
                <span className="text-xl text-white font-bold">
                  Click here to review!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourReviewArea;
