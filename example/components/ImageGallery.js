import React, { useEffect, useState } from "react";

import './showCase.css';
import './imageGallery.css';

import { PaginationAnimated, PaginationSwipeable } from '../../src/index'
import { CustomNavigationCode, CustomNavigationImages } from "./CustomNavigation";

import CodeDiv from "./CodeDiv";

const codeBlocks = [
    {
        language: 'jsx',
        title: 'ImageGallery.js',
        content: `
import React, { useEffect, useState } from "react";
import { PaginationSwipeable } from "react-animated-pagination";

import "./customAnimationsImageGallery.css"
import "./CustomNavigationImages.js"

const ImageGallery = () => {
    ...
    const [images, setImages] = useState([]);
    ...
    return (
        <PaginationSwipeable
          topNav={false}
          bottomNav={true}
          itemsOnPage={1}
          infiniteFlip={true}
          items={images}
          entryProp="image"
          customNavigation={CustomNavigationImages}
          customNextAnimation={'nextPageCustomImages 1s forwards'}
          customPrevAnimation={'prevPageCustomImages 1s forwards'}
          delay={250}
          children={<ImageComponent />}
        />
    );
}
`
    },
    {
        language: 'css',
        title: 'customAnimationsImageGallery.css',
        content: `
@keyframes nextPageCustomImages {
    0% {
        opacity: 1;
    }

    49% {
        opacity: 0;
        transform: translate(-10em, 0);
    }

    50% {
        opacity: 0;
        transform: translate(10em, 0);
    }
    
    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}

@keyframes prevPageCustomImages {
    0% {
        opacity: 1;
    }

    49% {
        opacity: 0;
        transform: translate(10em, 0);
    }

    50% {
        opacity: 0;
        transform: translate(-10em, 0);
    }
    
    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}        
`
    },
    {
        language: 'jsx',
        title: 'CustomNavigationImages.js',
        content: `
import React, { useEffect, useState, useCallback } from "react";
import "./customNavigationImages.css";

export const CustomNavigationImages = ({
    handlePageChange,
    currentPage,
    pages,
    infiniteFlip
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
        if (pages[currentPage + 1]) {
        handlePageChange(currentPage + 1)
        } else if (!pages[currentPage + 1] && infiniteFlip) {
        handlePageChange(0)
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
        const stopOnTouch = () => {
        const paginationContainer = document.querySelector('.paginationContainer__currentPageDiv');
        paginationContainer.addEventListener('mousedown', () => setAutomatic(false));
        paginationContainer.addEventListener('touchstart', () => setAutomatic(false));
        }
    
        stopOnTouch();
    }, [setAutomatic])
    
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
                className={\`paginationControlsCustomImages__pageNoBtn
                    \${index === currentPage
                    ? "paginationControlsCustomImages__pageNoBtn--active"
                    : ""
                }
                    \`}
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
`
    },
    {
        language: 'css',
        title: 'customNavigationImages.css',
        content: `
.paginationControlsCustomImages {
    min-height: calc(16px + 1em);

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.paginationControlsCustomImages__pageNoBtn {
    box-sizing: border-box;
    display: block;

    height: 16px;
    width: 16px;

    margin: .5em;
    padding: 0;

    border-radius: 50%;
    border: transparent;
    
    background-color: rgba(65, 63, 63, 0.8);
    outline: transparent;

    transition: .3s ease-in-out;
    cursor: pointer;
}
.paginationControlsCustomImages__pageNoBtn:active {
    background-color: rgba(117, 111, 111, 0.8);
}
.paginationControlsCustomImages__pageNoBtn--active {
    background-color: rgba(117, 111, 111, 0.8);
    cursor: default;
}


.paginationControlsCustomImages__arrowBtnLeft {
    position: absolute;
    bottom: 50%;
    left: 0;

    display: block;
    background-color: transparent;
    border: transparent;

}

.paginationControlsCustomImages__arrowBtnRight {
    position: absolute;
    bottom: 50.5%;
    right: 0;

    display: block;
    background-color: transparent;
    border: transparent;
}
`
    },
]

const ImageComponent = ({ image }) => {

    return (
        <div className="image">
            <img className="image__img" src={image.download_url} alt={image.author} />
            <div className="image__author"><em>Author:</em> {image.author}</div>
        </div>
    );
}

const ImageGallery = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = () => {
            setIsLoading(true);
    
            fetch(
              "https://picsum.photos/v2/list?page=2&limit=6",
              {
                method: "GET"
              }
            )
            .then((res) => res.json())
            .then(imgs => {
                setImages([...imgs]);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            })
        };
    
        fetchImages();
    }, []);
  
    return (
      <div className="showcase">
        <h1 style={{textAlign: 'center'}}>Image gallery</h1>
        <h2 style={{textAlign: 'center'}}>An automated carousel of image components with custom navigation</h2>
        <PaginationSwipeable
          topNav={false}
          bottomNav={true}
          itemsOnPage={1}
          infiniteFlip={true}
          items={images}
          entryProp="image"
          customNavigation={CustomNavigationImages}
          customNextAnimation={'nextPageCustomImages 1s forwards'}
          customPrevAnimation={'prevPageCustomImages 1s forwards'}
          delay={400}
          touchSensitivity={10}
          children={<ImageComponent />}
        />
        <div>
          This example uses a function to get reference to the Container element and disable slideshow on touch/mouse click. Should be used with caution as it slightly breaks the React-style unidirectional controlflow.
        </div>
        <PaginationAnimated
          topNav={true}
          bottomNav={false}
          customNavigation={CustomNavigationCode}
          items={codeBlocks}
          itemsOnPage={1}
          entryProp="codeblock"
          children={<CodeDiv />}
        />
      </div>
    );
  }
  
  
  export default ImageGallery;