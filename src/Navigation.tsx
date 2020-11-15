import * as React from 'react';

import './navigation.css';

/**
 * A set of types for creating custom Navigation components
 * 
 */
export type NavigationTypes = {
    /**
     * @param handlePageChange Handles changing the current visible page according to the provided index
     * 
     * @example
     * ```
     * <button
     *   handlePageChange(currentPage + 1)
     * >
     *   Next page
     * </button>
     * ```
     */
    handlePageChange: (arg0: number) => void,
    /**
     * @param currentPage The item in the pages array currently displayed in the pagination
     * 
     * @example
     * ```
     * <button
     *   handlePageChange(currentPage + 1)
     * >
     *   Next page
     * </button>
     * ```
     */
    currentPage: number,
    /**
     * @param pages The array of pages generated from the items passed to the Pagination component
     * 
     * @example
     * ```
     * pages.map((_page: any, index: any) => (
     *   <button
     *     onClick={() => handlePageChange(index)}
     *   >
     *     {index + 1}
     *   </button>
     * ))
     * ```
     */
    pages: [][],
    /**
     * @param infiniteFlip Is the infiniteFlip allowed (on PaginationSwipeable component)
     * 
     * @example 
     * ```
     * if (!pages[currentPage - 1] && infiniteFlip) {
     *   handlePageChange(pages.length - 1);
     * }
     * ```
     */
    infiniteFlip? : boolean,
    /**
     * @param getContainerRef Returns a reference to the pagination container <div> element
     * 
     * @example
     * ```
     * let containerRef = getContainerRef();
     * containerRef.addEventListener(...)
     * ```
     */
    getContainerRef?: () => HTMLDivElement,
    /**
     * @param getCurrentPageRef Returns a reference to the current page <div> element
     * 
     * @example
     * ```
     * let currentPageRef = getCurrentPageRef();
     * currentPageRef.addEventListener(...)
     * ```
     */
    getCurrentPageRef?: () => HTMLDivElement
}

export const Navigation: React.FC<NavigationTypes> = ({ 
    handlePageChange,
    currentPage,
    pages,
    infiniteFlip
}) => {
  return (
    <div className="paginationControls">
    <button
      className="paginationControls__arrowBtn"
      onClick={() => handlePageChange(0)}
      disabled={ currentPage === 0 ? true : false }
      aria-label="First page"
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
        } else if (!pages[currentPage - 1] && infiniteFlip) {
          handlePageChange(pages.length - 1)
        }
      }}
      disabled={ infiniteFlip !== undefined && infiniteFlip === true ? false : (currentPage === 0 ? true : false)}
      aria-label="Previous page"
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
          aria-label={`Page number ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
    <button
      className="paginationControls__arrowBtn"
      onClick={() => {
        if (pages[currentPage + 1]) {
          handlePageChange(currentPage + 1)
        } else if (!pages[currentPage + 1] && infiniteFlip) {
          handlePageChange(0)
        }
      }}
      disabled={infiniteFlip ? false : (currentPage === pages.length - 1 ? true : false)}
      aria-label="Next page"
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
      aria-label="Last page"
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
