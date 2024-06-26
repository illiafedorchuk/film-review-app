import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxPageNumbersToShow / 2)
    );
    let endPage = startPage + maxPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 ${
            currentPage === i
              ? "bg-[var(--link-hover-color)] text-white rounded-xl"
              : "bg-[var(--search-bg-color)] text-[var(--text-color)] dark:bg-[var(--border-color)] dark:text-white border border-[var(--input-border-color)] rounded-xl"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center my-4">
      <button
        className="px-3 py-1 mx-1 bg-[var(--search-bg-color)] text-[var(--text-color)] dark:bg-[var(--border-color)] dark:text-white border border-[var(--input-border-color)] rounded-xl"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <FaChevronLeft />
      </button>
      {currentPage > 3 && (
        <>
          <button
            className={`px-3 py-1 mx-1 ${
              currentPage === 1
                ? "bg-[var(--link-hover-color)] text-white rounded-xl"
                : "bg-[var(--search-bg-color)] text-[var(--text-color)] dark:bg-[var(--border-color)] dark:text-white border border-[var(--input-border-color)] rounded-xl"
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <span className="px-3 py-1 text-[var(--text-color)] dark:text-white">
            ...
          </span>
        </>
      )}
      {renderPageNumbers()}
      {currentPage < totalPages - 2 && (
        <>
          <span className="px-3 py-1 text-[var(--text-color)] dark:text-white">
            ...
          </span>
          <button
            className={`px-3 py-1 mx-1 ${
              currentPage === totalPages
                ? "bg-[var(--link-hover-color)] text-white rounded-xl"
                : "bg-[var(--search-bg-color)] text-[var(--text-color)] dark:bg-[var(--border-color)] dark:text-white border border-[var(--input-border-color)] rounded-xl"
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="px-3 py-1 mx-1 bg-[var(--search-bg-color)] text-[var(--text-color)] dark:bg-[var(--border-color)] dark:text-white border border-[var(--input-border-color)] rounded-xl"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
