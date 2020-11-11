import * as React from 'react';

import './navigation.css';

export type NavigationTypes = {
    handlePageChange: Function,
    currentPage: number,
    pages: any[],
    infiniteScroll? : boolean
}

export const Navigation: React.FC<NavigationTypes> = ({ 
    handlePageChange,
    currentPage,
    pages,
    infiniteScroll
}) => {
  console.log(infiniteScroll)

  return (
    <div className="paginationControls">
    <button
      className="paginationControls__arrowBtn"
      onClick={() => handlePageChange(0)}
      disabled={ currentPage === 0 ? true : false }
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-chevron-double-left"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
        <path
          fillRule="evenodd"
          d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </button>
    <button
      className="paginationControls__arrowBtn"
      onClick={() => {
        if (pages[currentPage - 1]) {
          handlePageChange(currentPage - 1)
        } else if (!pages[currentPage - 1] && infiniteScroll) {
          handlePageChange(pages.length - 1)
        }
      }}
      disabled={ infiniteScroll !== undefined && infiniteScroll === true ? false : (currentPage === 0 ? true : false)}
    >
      <svg
        className="bi bi-chevron-left"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M13.354 3.646a.5.5 0 010 .708L7.707 10l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    {pages &&
      pages.map((_page: any, index: any) => (
        <button
          className={`paginationContols__pageNoBtn
                  ${
                    index === currentPage
                      ? "paginationContols__pageNoBtn--active"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    (currentPage > index
                      ? currentPage - index > 3
                      : index - currentPage > 3)
                      ? "paginationContols__pageNoBtn--hidden"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    currentPage > index &&
                    currentPage - index === 3
                      ? "paginationContols__pageNoBtn--dotsBefore"
                      : ""
                  }
                  ${
                    pages.length > 10 &&
                    index !== 0 &&
                    index !== pages.length - 1 &&
                    index > currentPage &&
                    index - currentPage === 3
                      ? "paginationContols__pageNoBtn--dotsAfter"
                      : ""
                  }
                  `}
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={index === currentPage}
        >
          {index + 1}
        </button>
      ))}
    <button
      className="paginationControls__arrowBtn"
      onClick={() => {
        if (pages[currentPage + 1]) {
          handlePageChange(currentPage + 1)
        } else if (!pages[currentPage + 1] && infiniteScroll) {
          handlePageChange(0)
        }
      }}
      disabled={infiniteScroll ? false : (currentPage === pages.length - 1 ? true : false)}
    >
      <svg
        className="bi bi-chevron-right"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
          clipRule="evenodd"
        />
      </svg>
    </button>
    <button
      className="paginationControls__arrowBtn"
      onClick={() => handlePageChange(pages.length - 1)}
      disabled={currentPage === pages.length -1 ? true : false }
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-chevron-double-right"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
        />
        <path
          fillRule="evenodd"
          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </button>
  </div>
  )
};
