import React, { useEffect, useState, useRef, useCallback } from 'react';

import './customNavigation.css';
import './customNavigationUsercards.css';
import './customNavigationCode.css';
import './customNavigationImages.css';

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


export const CustomNavigationUsercards = ({ 
  handlePageChange,
  currentPage,
  pages,
}) => {
    const [position, setPosition] = useState({ left: document.querySelector('.paginationControlsCustomUsercards__pageNoBtn--active') && document.querySelector('.paginationControlsCustomUsercards__pageNoBtn--active').offsetLeft})
    const [viewport, setViewport] = useState({ 
      height: window.innerHeight,
      width: window.innerWidth
    });

    let currentIndicatorRef = useRef(null);

    useEffect(() => {
      function handleResized () {
        setViewport({
          height: window.innerHeight,
          width: window.innerWidth
        });
      }

      window.addEventListener('resize', handleResized);

      return () => window.removeEventListener('resize', handleResized);
    });

    useEffect(() => {
      if (currentIndicatorRef.current) {
        let workingObject = {}
        workingObject.left = currentIndicatorRef.current.offsetLeft - 4;
        setPosition({...workingObject})
      }

    }, [currentPage, pages, viewport])

  return (
    <div className="paginationControlsCustomUsercards">
      <div
        style={position}
        className={`paginationControlsCustomUsercards__currentPageIndicator`}
      />
    {pages &&
      pages.map((_page, index ) => (
        <button
          ref={index === currentPage ? currentIndicatorRef : null}
          className={`paginationControlsCustomUsercards__pageNoBtn
                  ${
                    index === currentPage
                      ? "paginationControlsCustomUsercards__pageNoBtn--active"
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
  );
}

export const CustomNavigationCode = ({ 
  handlePageChange,
  currentPage,
  pages,
}) => {

return (
  <div className="paginationControlsCustomCode">
  {pages &&
    pages.map((_page, index ) => (
      <button
        className={`paginationControlsCustomCode__pageNoBtn
                ${
                  index === currentPage
                    ? "paginationControlsCustomCode__pageNoBtn--active"
                    : ""
                }
                `}
        key={index}
        onClick={() => handlePageChange(index)}
        disabled={index === currentPage}
      >
        {pages[index][0].title}
      </button>
    ))}
</div>
)
};

export const CustomNavigationImages = ({
  handlePageChange,
  currentPage,
  pages,
  infiniteFlip,
  getContainerRef
}) => {
  const [isAutomatic, setAutomatic] = useState(true);

  const automaticShow = () => {
    if (pages[currentPage + 1]) {
      handlePageChange(currentPage + 1)
    } else if (!pages[currentPage + 1] && infiniteFlip) {
      handlePageChange(0)
    }
  }

  const scrollNext = useCallback(() => {
    setAutomatic(false);
    if (pages[currentPage + 1]) {
      handlePageChange(currentPage + 1)
    } else if (!pages[currentPage + 1] && infiniteFlip) {
      handlePageChange(0)
    }
  }, [handlePageChange, setAutomatic])

  const scrollPrev = useCallback(() => {
    setAutomatic(false);
    if (pages[currentPage - 1]) {
      handlePageChange(currentPage - 1)
    } else if (!pages[currentPage - 1] && infiniteFlip) {
      handlePageChange(pages.length - 1)
    }
  }, [handlePageChange, setAutomatic]);

  const scrollTo = useCallback(index => {
    setAutomatic(false);
    handlePageChange(index)
  }, [handlePageChange, setAutomatic]);

  useEffect(() => {
    if (!isAutomatic) return;

    if (isAutomatic) {
      const interval = setInterval(automaticShow, 2500);

      return () => clearInterval(interval)
    }

  }, [isAutomatic, pages, currentPage]);

  useEffect(() => {
    let cRef = getContainerRef();

    const stopOnTouch = () => setAutomatic(false)

    cRef.addEventListener('mousedown', stopOnTouch);
    cRef.addEventListener('touchstart', stopOnTouch);

    return () => {
      cRef.removeEventListener('mousedown', stopOnTouch);
      cRef.removeEventListener('touchstart', stopOnTouch);
    }
  }, [])

  return (
    <div className="paginationControlsCustomImages">
      <button
        className="paginationControlsCustomImages__arrowBtnLeft"
        onClick={() => scrollPrev()}
        disabled={infiniteFlip !== undefined && infiniteFlip === true ? false : (currentPage === 0 ? true : false)}
      >
        <svg
          className="bi bi-chevron-left"
          width="2em"
          height="2em"
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
        pages.map((_page, index) => (
          <button
            className={`paginationControlsCustomImages__pageNoBtn
                ${index === currentPage
                ? "paginationControlsCustomImages__pageNoBtn--active"
                : ""
              }
                `}
            key={index}
            onClick={() => scrollTo(index)}
            disabled={index === currentPage}
          >
          </button>
        ))}
      <button
        className="paginationControlsCustomImages__arrowBtnRight"
        onClick={() => scrollNext()}
        disabled={infiniteFlip ? false : (currentPage === pages.length - 1 ? true : false)}
      >
        <svg
          className="bi bi-chevron-right"
          width="2em"
          height="2em"
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
    </div>
  )
};