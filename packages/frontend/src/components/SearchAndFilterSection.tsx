/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  selectedYears: string[];
  onYearChange: (years: string[]) => void;
  onMovieSelect: (movie: any) => void;
}

const SearchAndFilterSection: React.FC<SearchAndFilterSectionProps> = ({
  apiKey,
  genreMap,
  selectedGenres,
  onGenreChange,
  sortBy,
  onSortChange,
  selectedYears,
  onYearChange,
}) => {
  return (
    <div className="flex flex-col justify-center mx-auto w-full bg-violet-300 p-4 rounded-xl my-4">
      <MovieSearch apiKey={apiKey} />
      <div className="md:grid md:grid-cols-3 md:gap-4 lg:flex lg:space-x-4 pt-1 sm:justify-between md:justify-between">
        <FilterDropdown
          genres={genreMap}
          selectedGenres={selectedGenres}
          onGenreChange={onGenreChange}
        />
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
        <YearDropdown
          selectedYears={selectedYears}
          onYearChange={onYearChange}
        />
      </div>
    </div>
  );
};

export default SearchAndFilterSection;
