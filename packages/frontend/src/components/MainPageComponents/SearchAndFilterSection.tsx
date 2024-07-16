/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MovieSearch from "./MovieSearch";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";
import YearDropdown from "./YearDropdown";

interface SearchAndFilterSectionProps {
  apiKey: string;
  genreMap: { [key: number]: string };
  selectedGenres: number[];
  onGenreChange: (genreIds: number[]) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  onMovieSelect: (movie: any) => void;
}

const SearchAndFilterSection: React.FC<SearchAndFilterSectionProps> = ({
  apiKey,
  genreMap,
  selectedGenres,
  onGenreChange,
  sortBy,
  onSortChange,
  selectedYear,
  onYearChange,
  onMovieSelect, // Make sure this is passed as a prop
}) => {
  return (
    <div className="w-full p-6 bg-[var(--input-bg-color)] rounded-xl shadow-md max-w-7xl mx-auto my-4">
      <div className="mb-4">
        <MovieSearch
          apiKey={apiKey}
          onMovieSelect={onMovieSelect} // Use the passed onMovieSelect prop
          isActive={false}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        <FilterDropdown
          genres={genreMap}
          selectedGenres={selectedGenres}
          onGenreChange={onGenreChange}
        />
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
        <YearDropdown selectedYear={selectedYear} onYearChange={onYearChange} />
      </div>
    </div>
  );
};

export default SearchAndFilterSection;
