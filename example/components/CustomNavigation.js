import React from 'react';

import './customNavigation.css';


const CustomNavigation = ({ 
    handlePageChange,
    currentPage,
    pages,
}) => {

  return (
    <div className="paginationControlsCustom">
    {pages &&
      pages.map((_page, index ) => (
        <button
          className={`paginationControlsCustom__pageNoBtn
                  ${
                    index === currentPage
                      ? "paginationControlsCustom__pageNoBtn--active"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    (currentPage > index
                      ? currentPage - index > 3
                      : index - currentPage > 3)
                      ? "paginationControlsCustom__pageNoBtn--hidden"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    currentPage > index &&
                    currentPage - index === 3
                      ? "paginationControlsCustom__pageNoBtn--dotsBefore"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    index > currentPage &&
                    index - currentPage === 3
                      ? "paginationControlsCustom__pageNoBtn--dotsAfter"
                      : ""
                  }
                  `}
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={index === currentPage}
        >
        </button>
      ))}
  </div>
  )
};

export default CustomNavigation;