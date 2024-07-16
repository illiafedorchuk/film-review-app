import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ReviewChartProps {
  score: number;
  label: string;
}

const COLORS = ["#833ff9d9", "#ffffff00"];

const ReviewChart: React.FC<ReviewChartProps> = ({ score, label }) => {
  return (
    <div className="flex flex-col items-center bg-[var(--input-bg-color)] rounded-lg p-4">
      <PieChart width={120} height={120}>
        <Pie
          data={[
            { name: "Score", value: score },
            { name: "Remaining", value: 10 - score },
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
          {score}/10
        </text>
      </PieChart>
      <p className="mt-2 text-center font-semibold">{label}</p>
    </div>
  );
};

export default ReviewChart;
