import React, { useState, useRef, useEffect } from "react";

interface SortDropdownProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortByOptions = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "release_date.desc", label: "Release Date" },
    { value: "vote_average.desc", label: "Rating" },
  ];

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

  const selectedSortLabel =
    sortByOptions.find((option) => option.value === sortBy)?.label || "Sort By";

  return (
    <div className="relative flex-grow " ref={dropdownRef}>
      <button
        className="inline-flex justify-between items-center w-full h-12 px-4 py-2 dark:bg-[var(--border-color)] rounded-3xl border text-[var(--text-color)] border-[var(--input-border-color)] shadow-sm text-sm font-medium focus:outline-none focus:ring-2 bg-[var(--input-border-color)]"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSortLabel}
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
          className="origin-top-right absolute right-0 mt-2 w-full rounded-xl  shadow-lg bg-[var(--input-bg-color)] ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {sortByOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`${
                  sortBy === option.value
                    ? "bg-gray-100 dark:bg-[var(--border-color)]"
                    : ""
                } block px-4 py-2 text-sm text-[var(--text-color)] w-full text-left rounded-lg hover:bg-[var(--border-color)]`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
