import React, { useState, useRef, useEffect } from "react";

interface YearDropdownProps {
  year: string;
  onYearChange: (value: string) => void;
}

const YearDropdown: React.FC<YearDropdownProps> = ({ year, onYearChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const years = Array.from({ length: 25 }, (v, i) =>
    (2024 - i).toString()
  ).concat("<2000");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative flex-grow" ref={dropdownRef}>
      <button
        className="inline-flex justify-between items-center w-full h-12 px-4 py-2 dark:bg-[var(--border-color)] bg-[var(--search-bg-color)] rounded-3xl border text-[var(--text-color)] border-[var(--input-border-color)] shadow-sm text-sm font-medium focus:outline-none focus:ring-2 bg-[var(--input-border-color)]"
        id="year-options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        Year {year}
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-xl shadow-lg bg-[var(--input-bg-color)] ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="year-options-menu"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          <div className="py-1" role="none">
            {years.map((yearOption) => (
              <button
                key={yearOption}
                onClick={() => {
                  onYearChange([yearOption]); // Pass yearOption in an array
                  setIsOpen(false);
                }}
                className={`${
                  year === yearOption ? "bg-gray-100 dark:bg-gray-700" : ""
                } block px-4 py-2 text-sm text-[var(--text-color)] w-full text-left rounded-lg hover:bg-[var(--border-color)]`}
                role="menuitem"
              >
                {yearOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
