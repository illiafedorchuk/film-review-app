import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  watchLater?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, watchLater }) => {
  return (
    <button
      className={
        watchLater
          ? "transition duration-300 text-[var(--text-color)] border border-[var(--input-border-color)] bg-[var(--button-bg-color)] text-white px-4 py-2 rounded-full flex-none transform"
          : "transition duration-300 bg-[var(--input-bg-color)] text-[var(--text-color)] border border-[var(--input-border-color)] hover:bg-[var(--button-bg-color)] hover:text-white px-4 py-2 rounded-full flex-none transform hover:scale-105"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
