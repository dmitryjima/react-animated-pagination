import React, { useEffect, useState, useRef } from 'react';

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


export const CustomNavigationUsercards = ({ 
  handlePageChange,
  currentPage,
  pages,
}) => {
  const [pagesLenMemo, setPagesLenMemo] = useState(pages && pages.length)
  let currentIndicatorRef = useRef(null);
  let pageButtonRefs = useRef([]);

  useEffect(() => {

  }, [pagesLenMemo])

  useEffect(() => {
    pages.map((_, index) => {
      pageButtonRefs.current[index] = React.createRef();
    });

    setPagesLenMemo(pages.length);

  }, [pages]);


useEffect(() => {
   
  
  console.log(pageButtonRefs.current)

  let currentPageElement = pageButtonRefs.current.length > 0 && pageButtonRefs.current.find(e => {
    //console.log(e.current && e.current.classList)
    if (
      e.current && e.current.classList.contains('paginationControlsCustom__pageNoBtn--active')
    ) return e.current
  });

  console.log(currentPageElement)

  if (currentPageElement) {
    
    currentIndicatorRef.current.style.left = `${currentPageElement.current.offsetLeft}px`
    
    console.log(currentPageElement && currentPageElement.offsetLeft)
    console.log(currentIndicatorRef.current.style.left)
  }


}, [currentPage, pages]);

return (
  <div className="paginationControlsCustom">
    <div
      ref={currentIndicatorRef}
      /* style={position} */
      className={`paginationControlsCustom__currentPageIndicator`}
    />
  {pages &&
    pages.map((_page, index ) => (
      <button
        ref={pageButtonRefs.current[index]}
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

/* 
export const CustomNavigationUsercards = ({ 
  handlePageChange,
  currentPage,
  pages,
}) => {
  let currentIndicatorRef = useRef(null);


useEffect(() => {
  let currentPage = document.querySelector('.paginationControlsCustom__pageNoBtn--active');

  if (currentPage) {
    
    currentIndicatorRef.current.style.left = `${currentPage.offsetLeft}px`
    
    console.log(currentPage && currentPage.offsetLeft)
    console.log(currentIndicatorRef.current.style.left)
  }


}, [currentPage, pages]);

return (
  <div className="paginationControlsCustom">
    <div
      ref={currentIndicatorRef}
      className={`paginationControlsCustom__currentPageIndicator`}
    />
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

*/