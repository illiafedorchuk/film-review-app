import React from "react";

interface PaginationProps {
  totalComments: number;
  commentsPerPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalComments,
  commentsPerPage,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              onClick={() => paginate(number)}
              href="#!"
              className={`py-2 px-3 mx-1 leading-tight ${
                number === currentPage
                  ? "bg-violet-500 text-white rounded-xl"
                  : "bg-gray-200 text-gray-700 border  rounded-xl border-gray-300 hover:bg-gray-300"
              }`}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
