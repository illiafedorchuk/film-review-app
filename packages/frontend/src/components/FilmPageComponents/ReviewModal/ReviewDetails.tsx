import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ReviewDetailsProps {
  ratings: { [key: string]: number };
  text: string;
  backdropUrl: string;
  posterUrl: string;
  title: string;
}

const COLORS = ["#833ff9d9", "#ffffff00"];

const ReviewDetails: React.FC<ReviewDetailsProps> = ({
  ratings,
  text,
  backdropUrl,
  posterUrl,
  title,
}) => {
  const backdropFullUrl = "https://image.tmdb.org/t/p/original" + backdropUrl;
  const posterFullUrl = "https://image.tmdb.org/t/p/original" + posterUrl;

  const averageScore =
    Object.values(ratings).reduce((sum, value) => sum + value, 0) /
    Object.keys(ratings).length;

  return (
    <div>
      <div className="relative mb-4">
        <img
          src={backdropFullUrl}
          alt=""
          className="rounded-xl w-full h-48 sm:h-64 md:h-72 lg:h-96 bg-cover bg-center brightness-50"
        />
        <div className="absolute top-72 left-10 transform -translate-y-1/2 flex items-center">
          <img
            src={posterFullUrl}
            alt=""
            className="w-24 h-32 sm:w-32 sm:h-44 md:w-36 md:h-52 lg:w-48 lg:h-64 bg-cover bg-center rounded-md shadow-lg"
          />
          <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ml-4">
            {title}
          </h1>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center w-full mt-10">
        Your <span className="text-violet-600">scores</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 mt-10">
        {Object.keys(ratings).map((key) => (
          <div
            key={key}
            className="flex flex-col items-center mb-4 bg-white dark:bg-[#2c2c2c] rounded-lg shadow-md p-4"
          >
            <PieChart width={120} height={120}>
              <Pie
                data={[
                  { name: "Score", value: ratings[key] },
                  { name: "Remaining", value: 10 - ratings[key] },
                ]}
                cx={60}
                cy={60}
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={450}
                paddingAngle={0}
                dataKey="value"
                cornerRadius={45}
                stroke="none"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <text
                x={65}
                y={65}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#7C3AED"
                fontSize="20"
              >
                {ratings[key]}/10
              </text>
            </PieChart>
            <p className="mt-2 font-bold text-gray-700 dark:text-gray-300">
              {key}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="w-full sm:w-2/3 order-2 sm:order-1 mt-4 sm:mt-0">
          <h2 className="text-xl font-bold mb-2">Your Review</h2>
          <p>{text}</p>
        </div>
        <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
          <div className="rounded-t-xl bg-violet-500 text-[var(--button-text-color)] px-4 py-2 w-full text-center">
            Total Score
          </div>
          <div className="rounded-b-xl bg-white dark:bg-[#2c2c2c] text-violet-600 text-3xl font-bold text-center px-4 py-2 w-full">
            {averageScore.toFixed(1)}/10
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <button className="bg-violet-500 text-white py-2 px-4 rounded-md mt-4">
          Download
        </button>
        <button className="bg-violet-500 text-white py-2 px-4 rounded-md mt-4">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ReviewDetails;
