import React, { useState, useEffect, useRef } from "react";

interface FilterDropdownProps {
  genres: { [key: number]: string };
  selectedGenres: number[];
  onGenreChange: (genreIds: number[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  genres,
  selectedGenres,
  onGenreChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (genreId: number) => {
    let newSelectedGenres = [...selectedGenres];
    if (selectedGenres.includes(genreId)) {
      newSelectedGenres = newSelectedGenres.filter((id) => id !== genreId);
    } else {
      newSelectedGenres.push(genreId);
    }
    onGenreChange(newSelectedGenres);
  };

  const getSelectedGenreNames = () => {
    const genreNames = selectedGenres.map((id) => genres[id]);
    if (genreNames.length === 1) {
      return genreNames[0];
    } else if (genreNames.length === 2) {
      return genreNames.join(" and ");
    } else if (genreNames.length > 2) {
      return `${genreNames.slice(0, 2).join(", ")} and ${
        genreNames.length - 2
      } more`;
    } else {
      return "Select Genres";
    }
  };

  const selectedGenreNames = getSelectedGenreNames();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative flex-grow text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-between items-center w-full h-12 px-4 py-2 rounded-2xl border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        {selectedGenreNames}
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
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="max-h-60 overflow-y-auto">
              {Object.entries(genres).map(([id, name]) => (
                <label
                  key={id}
                  htmlFor={`genre-${id}`}
                  className="flex items-center px-4 py-2 hover:bg-violet-300 rounded-md cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={`genre-${id}`}
                    checked={selectedGenres.includes(Number(id))}
                    onChange={() => handleCheckboxChange(Number(id))}
                    className="form-checkbox h-4 w-4 text-violet-400 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">{name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
