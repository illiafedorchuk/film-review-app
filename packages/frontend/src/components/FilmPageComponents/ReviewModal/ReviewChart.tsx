import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ReviewChartProps {
  score: number;
  label: string;
}

const COLORS = ["#833ff9d9", "#ffffff00"];

const ReviewChart: React.FC<ReviewChartProps> = ({ score, label }) => {
  return (
    <div className="flex flex-col items-center xs:flex-row xs:items-center xs:justify-between mb-4">
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
          x={60}
          y={60}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#7C3AED"
          fontSize="20"
        >
          {score}/10
        </text>
      </PieChart>
      <p className="mt-2 xs:mt-0 xs:ml-4">{label}</p>
    </div>
  );
};

export default ReviewChart;
