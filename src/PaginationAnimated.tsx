import * as React from 'react';
import { Navigation } from './Navigation';

import './pagination.css';

export type PaginationAnimatedTypes = {
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
   * @param entryProp The prop to be cloned during the iteration process
   * 
   * @example 
   * 
   * ```
   * const MyComponent = ({ component }) => {...}
   * 
   * ...
   * 
   * <PaginationAnimated
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
   * @param children The React Component to be rendered in the pagination, all the props except for the @param entryProp can be directly passed here. 
   * 
   * @example 
   * 
   * ```
   * const MyComponent = ({ component }) => {...}
   * 
   * ...
   * 
   * <PaginationAnimated
   *   entryProp="component"
   *   children={<MyComponent />}
   *   ...
   * />
   * ```
   */
    children: React.ReactElement
}


/**
 * Pagination component with customizable transition animations
 * 
 * @example 
 * ```
 * <PaginationAnimated
 *   bottomNav={true}
 *   topNav={true}
 *   itemsOnPage={5}
 *   customNavigation={CustomNavigation}
 *   customNextAnimation={'nextPageCustom .7s forwards'}
 *   customPrevAnimation={'prevPageCustom .7s forwards'}
 *   delay={300}
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
export const PaginationAnimated: React.FC<PaginationAnimatedTypes> = ({
    items,
    itemsOnPage,
    topNav,
    bottomNav,
    entryProp,
    iterationKey,
    customNavigation,
    customNextAnimation,
    customPrevAnimation,
    delay,
    children
  }) => {    
    let containerRef = React.useRef<HTMLDivElement>(null);
    
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pages, setPages] = React.useState<Array<any>>([]);

    const CustomNavigation = customNavigation;
  
    let currentPageRef = React.useRef<HTMLDivElement>(null);
  
    const handlePageChange = (pageNo: number) => {

      if (currentPageRef.current !== null) {     
      
          if (currentPage > pageNo) {
            currentPageRef.current.style.animation = customPrevAnimation ? customPrevAnimation : "prevPage .5s forwards";
          } else {
            currentPageRef.current.style.animation = customNextAnimation ? customNextAnimation : "nextPage .5s forwards";
          }

          setTimeout(() => {
            setCurrentPage(pageNo);
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
      <div className="pagination__paginationContainer">
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
                getContainerRef={() => containerRef.current}
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
          onAnimationEnd={() => {
            if (currentPageRef.current) {
              currentPageRef.current.style.animation = ""
            }
         }}
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
                getContainerRef={() => containerRef.current}
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
