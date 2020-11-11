import * as React from 'react';
import { Navigation } from './Navigation';

import './pagination.css';

export type PaginationAnimatedTypes = {
    items: Array<any>,
    itemsOnPage: number,
    topNav: boolean,
    bottomNav: boolean,
    cloneKey: string,
    iterationKey?: string,
    customNavigation?: any,
    children: React.ReactElement
}

export const PaginationAnimated: React.FC<PaginationAnimatedTypes> = ({
    items,
    itemsOnPage,
    topNav,
    bottomNav,
    cloneKey,
    iterationKey,
    customNavigation,
    children
  }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pages, setPages] = React.useState<Array<any>>([]);

    const CustomNavigation = customNavigation;
  
    let currentPageRef = React.useRef<HTMLDivElement>(null);
  
    const handlePageChange = (pageNo: number) => {

      if (currentPageRef.current !== null) {
          console.log(currentPageRef.current.style.animation);
      
          currentPageRef.current.style.animation = "";
          currentPageRef.current.offsetWidth;
      
          if (currentPage > pageNo) {
            currentPageRef.current.style.animation = "prevPage .5s forwards";
          } else {
            currentPageRef.current.style.animation = "nextPage .5s forwards";
          }
          setCurrentPage(pageNo);
      }
    };
  
    React.useEffect(() => {
      let itemsPerPage = itemsOnPage ? itemsOnPage : 5;
      let workingPages: Array<any>[] = [];
      let workingPagesCurrentIndex = 0;
  
      if (items) {
        items.forEach((item) => {
          if (
            workingPages[workingPagesCurrentIndex] &&
            workingPages[workingPagesCurrentIndex].length >= itemsPerPage
          )
            workingPagesCurrentIndex++;
  
          if (workingPages[workingPagesCurrentIndex] === undefined)
            workingPages[workingPagesCurrentIndex] = [];
  
          workingPages[workingPagesCurrentIndex].push(item);
        });
      }
  
      setPages([...workingPages]);
    }, [items, itemsOnPage, setPages]);
  
    React.useEffect(() => {
      if (!pages[currentPage]) {
        setCurrentPage(currentPage - 1 > -1 ? currentPage - 1 : 0);
      }
    }, [currentPage, pages]);
  
    React.useEffect(() => {
      setCurrentPage(0);
    }, []);
  
    return (
      <div className="pagintaion__paginationContainer">
        {
        topNav || (!bottomNav && !topNav) 
        ? 
        (
            CustomNavigation
            ?
            <CustomNavigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
            />
        )
        : 
        null
        }
        <div
          ref={currentPageRef}
          className={`paginationContainer__currentPageDiv`}
        >
          {pages.length &&
            pages[currentPage] &&
            pages[currentPage].map((item: any, index: number) => {
              let objectToClone: any = {};
              objectToClone[cloneKey] = item;
              return (
                <React.Fragment key={iterationKey ? item[iterationKey] : (item.id ? item.id : index) }>
                  {React.cloneElement(children, objectToClone)}
                </React.Fragment>
              );
            })}
        </div>
        {
        bottomNav
        ? 
        (
            CustomNavigation
            ?
            <CustomNavigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
            />
        )
        : 
        null
        }
      </div>
    );
  };
