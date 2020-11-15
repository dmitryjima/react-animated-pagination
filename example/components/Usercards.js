import React, { useEffect, useState } from "react";
import Usercard from "./Usercard";

import { PaginationAnimated, PaginationSwipeable } from '../../src/index';

import CustomNavigation, { CustomNavigationCode, CustomNavigationUsercards } from "./CustomNavigation";

import './usercards.css'
import LoadingSpinner from "./LoadingSpinner";
import CodeDiv from "./CodeDiv";


const codeBlocks = [
  {
    language: 'jsx',
    title: 'Usercards.js',
    content: `
import React, { useEffect, useState } from "react";
import { PaginationAnimated } from "react-animated-pagination";

import CustomNavigationUsercards from "./CustomNavigationUsercards.js";
import "./customAnimations.css";

import Usercard from "./Usercard";

const Usercards = () => {
  ...
  return (
    ...
    <PaginationSwipeable
      topNav={true}
      itemsOnPage={1}
      infiniteFlip={true}
      items={visibleUsers}
      entryProp="user"
      customNavigation={CustomNavigationUsercards}
      customNextAnimation={'nextPageCustom .7s forwards'}
      customPrevAnimation={'prevPageCustom .7s forwards'}
      delay={250}
      children={<Usercard handleDelete={handleDelete} />}
    />
    ...
  );
}
  `
  },
  {
    language: 'css',
    title: 'customAnimations.css',
    content: `
@keyframes nextPageCustom {
  0% {
    opacity: 1;
  }

  49% {
    opacity: 0;
    transform: translate(-10em, 0) scale(.5);
  }

  50% {
    opacity: 0;
    transform: translate(10em, 0) scale(.5);;
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);;
  }
}

@keyframes prevPageCustom {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  49% {
    opacity: 0;
    transform: translate(10em, 0) scale(.5);
  }

  50% {
    opacity: 0;
    transform: translate(-10em, 0) scale(.5);;
  }

  100% {
    opacity: 1;
    transform: translate(0, 0) scale(1);;
  }
}

@media(max-width: 800px) {
  @keyframes nextPageCustom {
      0% {
        opacity: 0;
      }
  
      49% {
        opacity: 0;
        transform: translate(-10em, 0) scale(.5);
      }
  
      50% {
        opacity: 0;
        transform: translate(10em, 0) scale(.5);;
      }
    
      100% {
        opacity: 1;
        transform: translate(0, 0) scale(1);;
      }
  }
  
  @keyframes prevPageCustom {
      0% {
        opacity: 0;
        transform: scale(1);
      }
  
      49% {
        opacity: 0;
        transform: translate(10em, 0) scale(.5);
      }
  
      50% {
        opacity: 0;
        transform: translate(-10em, 0) scale(.5);;
      }
    
      100% {
        opacity: 1;
        transform: translate(0, 0) scale(1);;
      }
  }
}
  `
  },
  {
    language: 'jsx',
    title: 'CustomNavigationUsercards.js',
    content: `
import React, { useEffect, useState, useRef } from 'react';
import './customNavigationUsercards.css';

export const CustomNavigationUsercards = ({ 
  handlePageChange,
  currentPage,
  pages,
}) => {
  const [position, setPosition] = useState({ 
    left: document
            .querySelector('.paginationControlsCustomUsercards__pageNoBtn--active') && 
            document
              .querySelector('.paginationControlsCustomUsercards__pageNoBtn--active')
              .offsetLeft
    });
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
        className={\`paginationControlsCustomUsercards__currentPageIndicator\`}
      />
    {
      pages && pages.map((_page, index ) => (
        <button
          ref={index === currentPage ? currentIndicatorRef : null}
          className={\`paginationControlsCustomUsercards__pageNoBtn
                  \${
                    index === currentPage
                      ? "paginationControlsCustomUsercards__pageNoBtn--active"
                      : ""
                  }
                  \`}
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={index === currentPage}
        >
        </button>
      ))
    }
    </div>
  );
}    
    `
  },
  {
    language: 'css',
    title: 'customNavigationUsercards.css',
    content: `
.paginationControlsCustomUsercards {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.paginationControlsCustomUsercards__pageNoBtn {
  box-sizing: border-box;
  display: block;

  height: 16px;
  width: 16px;

  margin: .5em;
  padding: 0;

  border-radius: 50%;
  border: transparent;
  
  background-color: #2196F3;
  outline: transparent;

  transition: .3s ease-in-out;
  cursor: pointer;
}
.paginationControlsCustomUsercards__pageNoBtn:active {
  background-color: #2195f37e;
}
.paginationControlsCustomUsercards__pageNoBtn--active {
  background-color: #2195f37e;
  cursor: default;
}

.paginationControlsCustomUsercards__currentPageIndicator {
  position: absolute;
  box-sizing: border-box;
  display: block;

  height: 16px;
  width: 16px;

  margin: 0;

  border-radius: 50%;
  border: transparent;
  
  background-color: transparent;
  border: 3px #2196F3 solid;
  padding: 9px;
  outline: transparent;
  
  transition: .5s ease-in-out;
}  
    `
  }
];

const Usercards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setusers] = useState([]);

  const [visibleUsers, setVisibleUsers] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  const handleDelete = (id) => {
    let usersFiltered = users.filter((p) => p.id !== id);

    setusers((users) => [...usersFiltered]);
  };

  const handleFilter = (e) => {
    setSearchItem(e.target.value);
  }

  useEffect(() => {
    const fetchusers = () => {
        setIsLoading(true);

        fetch(
          "https://jsonplaceholder.typicode.com/users",
          {
            method: "GET"
          }
        )
        .then((res) => res.json())
        .then(users => {
            let workingUsers = [...users];
            for (let i = 0; i < 10; i++) {
              workingUsers[i].imgURL = `https://picsum.photos/id/${i + 1}00/200/300`
            }
            setusers([...workingUsers]);
            setVisibleUsers([...workingUsers]);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };

    fetchusers();
  }, []);

  useEffect(() => {
    setVisibleUsers([...users])
  }, [users])

  useEffect(() => {
    if (searchItem) {
      let workingArray = users.filter(u => u.name.toLowerCase().includes(searchItem.toLowerCase()));
      setVisibleUsers(vu => [...workingArray]);
    } else {
      setVisibleUsers(vu => [...users]);
    }
  }, [searchItem]);

  if (isLoading && users.length === 0) {
    return (
      <div className="showcase">
      <LoadingSpinner/>
      </div>
    )
  }

  return (
    <div className="showcase">
      <h1 style={{textAlign: 'center'}}>Usercards</h1>
      <h2 style={{textAlign: 'center'}}>A searchable set of usercards with custom animations</h2>
      <input
        className="searchInput"
        type="text"
        placeholder='Type a name, e.g. "Clementine"'
        onChange={e => handleFilter(e)}
        value={searchItem}
      />
      {visibleUsers && visibleUsers.length > 0 ? (
        <PaginationSwipeable
          topNav={true}
          itemsOnPage={1}
          infiniteFlip={true}
          items={visibleUsers}
          entryProp="user"
          customNavigation={CustomNavigationUsercards}
          customNextAnimation={'nextPageCustom .7s forwards'}
          customPrevAnimation={'prevPageCustom .7s forwards'}
          delay={250}
          children={<Usercard handleDelete={handleDelete} />}
        />
      ) : (
        <div>No users found</div>
      )}
      <div>
        This example implements a custom navigation controls and overrides page transition animations by defining <code>customNextAnimation</code> and <code>customPrevAnimation</code> props, a smoother effect is achieved with the <code>delay</code> prop.
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


export default Usercards;