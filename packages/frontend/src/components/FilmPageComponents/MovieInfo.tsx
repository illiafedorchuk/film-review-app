import React from "react";

interface MovieInfoProps {
  label: string;
  value: string | React.ReactNode;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ label, value }) => {
  return (
    <p className="text-[var(--text-color)] mb-2">
      <span className="font-bold text-violet-500">{label}</span> {value}
    </p>
  );
};

export default MovieInfo;
