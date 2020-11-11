import * as React from 'react';
import { Navigation } from './Navigation';

import './pagination.css';

export type PaginationSwipeableTypes = {
    items: Array<any>,
    itemsOnPage: number,
    topNav?: boolean,
    bottomNav?: boolean,
    infiniteScroll?: boolean,
    cloneKey: string,
    iterationKey?: string,
    customNavigation?: any,
    customNextAnimation? : 'string',
    customPrevAnimation? : 'string',
    delay?: number,
    children: React.ReactElement
}

export const PaginationSwipeable: React.FC<PaginationSwipeableTypes> = ({
    items,
    itemsOnPage,
    topNav,
    bottomNav,
    infiniteScroll,
    cloneKey,
    iterationKey,
    customNavigation,
    customNextAnimation,
    customPrevAnimation,
    delay,
    children
  }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pages, setPages] = React.useState<Array<any>>([]);

    const CustomNavigation = customNavigation;
  
    let currentPageRef = React.useRef<HTMLDivElement>(null);
  
    // Touch
    const [isDragging, setIsDragging] = React.useState(false);
    const [initialTouch, setInitialTouch] = React.useState(0);
    const [posLeft, setPosLeft] = React.useState(0);
    const [prevLeft, setPrevLeft] = React.useState(0);
  
    const divStyle: React.CSSProperties = {
      position: isDragging ? "relative" : "static",
      left: isDragging ? posLeft : 0,
      overflowX: "hidden"
    };
  
    const _onTouchStart = (event: any) => {
      setIsDragging(true);
      extractPositionDelta(event.nativeEvent.touches[0]);
      setInitialTouch(event.nativeEvent.touches[0].clientX);
  
      // these four lines added later
      const { left } = extractPositionDelta(event.nativeEvent.touches[0]);
  
      if (posLeft + left <= 0) {
        setPosLeft(posLeft + left);
      }
    };
  
    const _onTouchMove = (event: any) => {
      if (!isDragging) {
        return;
      }
      const { left } = extractPositionDelta(event.nativeEvent.touches[0]);
  
      if (Math.abs(posLeft) + Math.abs(left) > 30) {
        setPosLeft(posLeft + left);
      }
    };
  
    const _onTouchEnd = (_event: any) => {
      setIsDragging(false);
  
      let delta = Math.abs(prevLeft) - Math.abs(posLeft);
  
      console.log(`postLeft: ${posLeft}`);
      console.log(`prevLeft: ${delta}`);
      console.log(`delta abs(prevLeft - posLeft): ${delta}`);
      console.log(`initialTouch: ${initialTouch}`);
  
      if (delta < -30 && posLeft < initialTouch) {
        if (pages[currentPage + 1]) {
          handlePageChange(currentPage + 1)
        } else if (!pages[currentPage + 1] && infiniteScroll) {
          handlePageChange(0)
        }
      } else if (delta > 30 && posLeft > initialTouch) {
        if (pages[currentPage - 1]) {
          handlePageChange(currentPage - 1)
        } else if (!pages[currentPage - 1] && infiniteScroll) {
          handlePageChange(pages.length - 1)
        }
      }
  
      setPosLeft(0);
      setPrevLeft(0);
      setInitialTouch(0);
    };
  
    const extractPositionDelta = (event: any) => {
      const left = event.clientX;
  
      const delta = {
        left: left - prevLeft
      };
  
      setPrevLeft(left);
  
      return delta;
    };
  
    const handlePageChange = (pageNo: number) => {
        if (currentPageRef.current !== null) {
            console.log(currentPageRef.current.style.animation);
        
            currentPageRef.current.style.animation = "";
            currentPageRef.current.offsetWidth;
        
            if (currentPage > pageNo) {
              currentPageRef.current.style.animation = customPrevAnimation ? customPrevAnimation : "prevPage .5s forwards";
            } else {
              currentPageRef.current.style.animation = customNextAnimation ? customNextAnimation : "nextPage .5s forwards";
            }
            setTimeout(() => {
              setCurrentPage(pageNo);
            }, delay ? delay : 500) 
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
            ) {
              workingPagesCurrentIndex++;
            }
    
            if (workingPages[workingPagesCurrentIndex] === undefined) {
              workingPages[workingPagesCurrentIndex] = [];
            }
    
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
      <div className="pagintaion__paginationContainer" >
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
                infiniteScroll={infiniteScroll}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
                infiniteScroll={infiniteScroll}
            />
        )
        : 
        null
        }
        <div
          ref={currentPageRef}
          className={`paginationContainer__currentPageDiv`}
          style={divStyle}
          onTouchStart={_onTouchStart}
          onTouchMove={_onTouchMove}
          onTouchEnd={_onTouchEnd}
          onTouchCancel={_onTouchEnd}
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
                infiniteScroll={infiniteScroll}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
                infiniteScroll={infiniteScroll}
            />
        )
        : 
        null
        }
      </div>
    );
  };
  
  export default PaginationSwipeable;