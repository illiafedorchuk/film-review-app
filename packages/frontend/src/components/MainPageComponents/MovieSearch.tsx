import React, { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface Movie {
  id: number;
  title?: string;
  poster_path?: string;
  release_date?: string;
}

interface MovieSearchProps {
  apiKey: string;
  onMovieSelect: (movie: Movie) => void;
  isActive: boolean;
}

const MovieSearch: React.FC<MovieSearchProps> = ({
  apiKey,
  onMovieSelect,
  isActive,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setDropdownVisible(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }
  }, [isActive]);

  const fetchSearchResults = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchQuery
      )}&api_key=${apiKey}`
    );
    const data = await response.json();
    setSearchResults(data.results || []);
    setDropdownVisible(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMovieSelect = (movie: Movie) => {
    onMovieSelect(movie);
    setSearchQuery("");
    setSearchResults([]);
    setDropdownVisible(false);
    navigate(`/movie/${movie.id}`); // Redirect to the movie page
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={searchRef}>
      <div className="relative w-full">
        <div className="flex justify-center items-center">
          <div className="relative my-auto w-full rounded-3xl">
            <BiSearch
              className="absolute left-3 top-4 dark:text-white text-black"
              size="1.5em"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="pl-10 p-2 dark:bg-[var(--border-color)] dark:text-white text-black w-full h-14 rounded-full"
            />
            {isDropdownVisible && (
              <ul className="absolute z-10 w-full bg-[var(--input-bg-color)] border border-[var(--input-border-color)] rounded-md mt-1 max-h-60 overflow-y-auto">
                {searchResults.map((movie) => (
                  <li
                    key={movie.id}
                    className="p-2 hover:bg-violet-400 hover:text-white dark:hover:bg-[var(--border-color)] cursor-pointer text-left"
                    onClick={() => handleMovieSelect(movie)}
                  >
                    <div className="flex items-center">
                      {movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`}
                          alt={movie.title}
                          className="w-10 h-15 mr-2"
                        />
                      )}
                      <div>
                        <p className="text-sm font-semibold">{movie.title}</p>
                        <p className="text-xs">{movie.release_date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;
