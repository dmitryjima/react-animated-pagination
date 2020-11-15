import * as React from 'react';
import { Navigation } from './Navigation';

import './pagination.css';

export type PaginationSwipeableTypes = {
  /** 
   * @param items An array of JavaScript Objects to be paginated
   * 
   * @example items={fetchedArray}
   * */
    items: Array<any>,
  /**
   * @param itemsOnPage A number of items on each page, defaults to 5 
   * 
   * @example itemsOnPage={10}
  */
    itemsOnPage?: number,
  /** 
   * @param topNav To show top navigation or not
   * 
   * If neither @param bottomNav nor @param topNav are specified, defaults to showing top navigation
   * 
   * @example topNav={true}
   */
    topNav?: boolean,
  /** 
   * @param bottomNav To show bottom navigation or not
   * 
   * If neither @param bottomNav nor @param topNav are specified, defaults to showing top navigation
   * 
   * @example bottomNav={true}
   */
    bottomNav?: boolean,
  /** 
   * @param infiniteFlip Allow infinite flipping of the pages (only on PaginationSwipeable)
   * 
   * @example infiniteFlip={true}
   */ 
    infiniteFlip?: boolean,
  /** 
   * @param entryProp The prop to be cloned during the iteration process
   * 
   * @example 
   * 
   * ```
   * const MyComponent = ({ component }) => {...}
   * 
   * ...
   * 
   * <PaginationSwipeable
   *   entryProp="component"
   *   children={<MyComponent />}
   *   ...
   * />
   * ```
   */
    entryProp: string,
   /**
   * @param iterationKey The key for the iteration to tell React which field of the Object to use as key prop during the iteration. 
   * 
   * Defaults to "id", fallbacks to the item's index (**warning**: indices are not reliable iteration keys)
   * 
   * @example iterationKey="_id"
   */    
    iterationKey?: string,
   /**
   * @param customNavigation Custom Navigation component to use instead of the built-in one.
   * 
   * @example 
   * ```
   * import MyNavigation from "./MyNavigation.js";
   * ...
   * customNavigation={MyNavigation}
   * ```
   */
    customNavigation?: any,
   /**
   * @param customNextAnimation The CSS transition animation to the next page.
   * 
   * **Note**: animation should be in the Parent's scope to run correctly.
   * 
   * @example 
   * ```
   * import "./myAnimations.css";
   * ...
   * customNextAnimation="myNextAnimation 1s forwards"
   * ```
   */
    customNextAnimation? : string,
   /**
   * @param customPrevAnimation The CSS transition animation to the previous page.
   * 
   * **Note**: animation should be in the Parent's scope to run correctly.
   * 
   * @example 
   * ```
   * import "./myAnimations.css";
   * ...
   * customPrevAnimation="myPrevAnimation 1s forwards"
   * ```
   */
    customPrevAnimation? : string,
  /**
   * @param delay The delay of switching the pages in milliseconds.
   * 
   * Can be used to achieve smoother custom animation effects.
   * 
   * @example delay={300}
   */
    delay?: number,
  
  /**
   * @param touchSensitivity A number representing touch sensititvity: from which point to start dragging the page, at which point to run changing to the next/previous page
   * 
   * Defaults to 30
   * 
   * @example touchSensitivity={10}
   */
    touchSensitivity?: number,
  /**
   * @param children The React Component to be rendered in the pagination, all the props except for the @param entryProp can be directly passed here. 
   * 
   * @example 
   * 
   * ```
   * const MyComponent = ({ component }) => {...}
   * 
   * ...
   * 
   * <PaginationSwipeable
   *   entryProp="component"
   *   children={<MyComponent />}
   *   ...
   * />
   * ```
   */
    children: React.ReactElement
}


/**
 * Pagination component with swipe support on touch screens
 * 
 * @example 
 * ```
 * <PaginationSwipeable
 *   infiniteFlip={true}
 *   bottomNav={true}
 *   topNav={true}
 *   itemsOnPage={5}
 *   customNavigation={CustomNavigation}
 *   customNextAnimation={'nextPageCustom .7s forwards'}
 *   customPrevAnimation={'prevPageCustom .7s forwards'}
 *   delay={300}
 *   touchSensitivity={10}
 *   items={arrayOfObjects}
 *   entryProp="component"
 *   iterationKey="_id"
 *   children={
 *     <MyComponent 
 *       handleDelete={handleDelete} 
 *       handleEdit={handleEdit} 
 *       commonState={commonState}
 *     />}
 * />
 * ```
 */
export const PaginationSwipeable: React.FC<PaginationSwipeableTypes> = ({
    items,
    itemsOnPage,
    topNav,
    bottomNav,
    infiniteFlip,
    entryProp,
    iterationKey,
    customNavigation,
    customNextAnimation,
    customPrevAnimation,
    delay,
    touchSensitivity,
    children
  }) => {
    let _touchSensitivity = touchSensitivity ? touchSensitivity : 30
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pages, setPages] = React.useState<Array<any>>([]);

    const CustomNavigation = customNavigation;
  
    let currentPageRef = React.useRef<HTMLDivElement>(null);

    let containerRef = React.useRef<HTMLDivElement>(null);
  
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
  
      if (Math.abs(posLeft) + Math.abs(left) > _touchSensitivity) {
        setPosLeft(posLeft + left);
      }
    };
  
    const _onTouchEnd = (_event: any) => {
      let delta = Math.abs(prevLeft) - Math.abs(posLeft);
  
      if (delta < -_touchSensitivity && posLeft < initialTouch) {
        if (pages[currentPage + 1]) {
          handlePageChange(currentPage + 1)
        } else if (!pages[currentPage + 1] && infiniteFlip) {
          handlePageChange(0)
        } else {
          setPosLeft(0);
          setPrevLeft(0);
          setInitialTouch(0);
          setIsDragging(false);
        }
      } else if (delta > _touchSensitivity && posLeft > initialTouch) {
        if (pages[currentPage - 1]) {
          handlePageChange(currentPage - 1)
        } else if (!pages[currentPage - 1] && infiniteFlip) {
          handlePageChange(pages.length - 1)
        } else {
          setPosLeft(0);
          setPrevLeft(0);
          setInitialTouch(0);
          setIsDragging(false);
        }
      } else {
        setPosLeft(0);
        setPrevLeft(0);
        setInitialTouch(0);
        setIsDragging(false);
      }
  
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
            currentPageRef.current.style.animation = "";
            currentPageRef.current.offsetWidth;
        
            if (currentPage > pageNo) {
              currentPageRef.current.style.animation = customPrevAnimation ? customPrevAnimation : "prevPage .5s forwards";
            } else {
              currentPageRef.current.style.animation = customNextAnimation ? customNextAnimation : "nextPage .5s forwards";
            }
            setTimeout(() => {
              setCurrentPage(pageNo);
              setPosLeft(0);
              setPrevLeft(0);
              setInitialTouch(0);
              setIsDragging(false);
            }, delay ? delay : 0) 

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
      <div className="pagination__paginationContainer" ref={containerRef}>
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
                infiniteFlip={infiniteFlip}
                getContainerRef={() => containerRef.current}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
                infiniteFlip={infiniteFlip}
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
              objectToClone[entryProp] = item;
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
                infiniteFlip={infiniteFlip}
                getContainerRef={() => containerRef.current}
                getCurrentPageRef={() => currentPageRef.current}
            />
            :
            <Navigation
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                pages={pages}
                infiniteFlip={infiniteFlip}
            />
        )
        : 
        null
        }
      </div>
    );
  };
  
  export default PaginationSwipeable;