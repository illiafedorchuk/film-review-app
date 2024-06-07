import React, { useState } from "react";

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

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-36 rounded-2xl border shadow-sm px-4 py-2 h-10 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400"
      >
        {selectedGenreNames}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
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
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="max-h-60 overflow-y-auto">
              {Object.entries(genres).map(([id, name]) => (
                <div
                  key={id}
                  className="flex items-center px-4 py-2 hover:bg-violet-300 rounded-md"
                >
                  <input
                    type="checkbox"
                    id={`genre-${id}`}
                    checked={selectedGenres.includes(Number(id))}
                    onChange={() => handleCheckboxChange(Number(id))}
                    className="form-checkbox h-4 w-4 text-violet-400 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor={`genre-${id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;