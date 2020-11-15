import React from "react";
import { NavLink, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { PaginationAnimated, PaginationSwipeable, NavigationTypes } from '../../src'

import "./apiReference.css";
import CodeDiv from "./CodeDiv";

const APIReference = () => {
    let { path, url } = useRouteMatch();


    return (

        <div className="showcase">
            <h1 style={{textAlign: 'center'}}>API Reference</h1>
            <div className="apiRef">
                <NavLink className="apiRef__navlink" activeClassName="apiRef__navlink--active" to={`${path}/pagination_animated`}>
                    PaginationAnimated
                </NavLink>
                <NavLink className="apiRef__navlink" activeClassName="apiRef__navlink--active" to={`${path}/pagination_swipeable`}>
                    PaginationSwipeable
                </NavLink>
                <NavLink className="apiRef__navlink" activeClassName="apiRef__navlink--active" to={`${path}/navigation_types`}>
                    NavigationTypes
                </NavLink>
            </div>
            <Switch>
                <Route path={`${path}/pagination_swipeable`}>
                    <div>
                        <h2 style={{textAlign: 'center'}}>PaginationSwipeable</h2>
                        <h3 style={{textAlign: 'center'}}>
                        Pagination component with swipe support on touch screens
                        </h3>
                        <div>
                            <strong>{`infiniteFlip?: boolean`}</strong> 
                            <p>
                            Allow infinite flipping of the pages (only on <strong>PaginationSwipeable</strong>)
                            </p>
                            <CodeDiv content={`infiniteFlip={true}`}/>
                        </div>
                        <div>
                            <strong>{`touchSensitivity?: number`}</strong> 
                            <p>
                            A number representing touch sensititvity: from which point to start dragging the page, at which point to run changing to the next/previous page
                            <br/>
                            Defaults to 30
                            </p>
                            <CodeDiv content={`touchSensitivity={10}`}/>
                        </div>
                        <div>
                            <strong>{`items: Array<any>`}</strong> 
                            <p>
                            An array of JavaScript Objects to be paginated
                            </p>
                            <CodeDiv content={`items={fetchedArray}`}/>
                        </div>
                        <div>
                            <strong>{`itemsOnPage?: number`}</strong> 
                            <p>
                            A number of items on each page, defaults to 5 
                            </p>
                            <CodeDiv content={`itemsOnPage={10}`}/>
                        </div>
                        <div>
                            <strong>{`topNav?: boolean`}</strong> 
                            <p>
                            To show top navigation or not
                            <br/>
                            If neither <strong>bottomNav</strong> nor <strong>topNav</strong> are specified, defaults to showing top navigation
                            </p>
                            <CodeDiv content={`topNav={true}`}/>
                        </div>
                        <div>
                            <strong>{`bottomNav?: boolean`}</strong> 
                            <p>
                            To show bottom navigation or not
                            <br/>
                            If neither <strong>bottomNav</strong> nor <strong>topNav</strong> are specified, defaults to showing top navigation
                            </p>
                            <CodeDiv content={`bottomNav={true}`}/>
                        </div>
                        <div>
                            <strong>{`entryProp: string`}</strong> 
                            <p>
                            The prop to be cloned during the iteration process
                            </p>
                            <CodeDiv content={`
const MyComponent = ({ component }) => {...}

...

<PaginationAnimated
    entryProp="component"
    children={<MyComponent />}
    ...
/>
`}
                            />
                        </div>
                        <div>
                            <strong>{`iterationKey?: string`}</strong> 
                            <p>
                            The key for the iteration to tell React which field of the Object to use as key prop during the iteration
                            <br/>
                            Defaults to "id", fallbacks to the item's index (<strong>warning</strong>: indices are not reliable iteration keys)
                            </p>
                            <CodeDiv content={`items={fetchedArray}`}/>
                        </div>
                        <div>
                            <strong>{`customNavigation?: React.ReactElement`}</strong> 
                            <p>
                            Custom Navigation component to use instead of the built-in one
                            </p>
                            <CodeDiv content={`
import MyNavigation from "./MyNavigation.js";
...
customNavigation={MyNavigation}
`}
                            />
                        </div>
                        <div>
                            <strong>{`customNextAnimation? : string`}</strong> 
                            <p>
                            The CSS transition animation to the next page
                            <br/>
                            <strong>Note</strong>: animation should be in the Parent's scope to run correctly
                            </p>
                            <CodeDiv content={`
import "./myAnimations.css";
...
customNextAnimation="myNextAnimation 1s forwards"
`}
                            />
                        </div>
                        <div>
                            <strong>{`customPrevAnimation? : string`}</strong> 
                            <p>
                            The CSS transition animation to the previous page
                            <br/>
                            <strong>Note</strong>: animation should be in the Parent's scope to run correctly
                            </p>
                            <CodeDiv content={`
import "./myAnimations.css";
...
customPrevAnimation="myPrevAnimation 1s forwards"
`}
                            />
                        </div>
                        <div>
                            <strong>{`delay?: number`}</strong>
                            <p>
                            The delay of switching the pages in milliseconds
                            <br/>
                            Can be used to achieve smoother custom animation effects
                            </p>
                            <CodeDiv content={`delay={300}`}/>
                        </div>
                        <div>
                            <strong>{`children: React.ReactElement`}</strong> 
                            <p>
                            The React Component to be rendered in the pagination, all the props except for the <strong>entryProp</strong> can be directly passed here
                            </p>
                            <CodeDiv content={`
const MyComponent = ({ component, handleEdit }) => {...}

...

<PaginationAnimated
    entryProp="component"
    children={<MyComponent handleEdit={handleEdit} />}
    ...
/>
`}
                            />
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/navigation_types`}>
                    <div>
                        <h2 style={{textAlign: 'center'}}>NavigationTypes</h2>
                        <h3 style={{textAlign: 'center'}}>
                        A set of types for creating custom Navigation components
                        </h3>
                        <div>
                            <strong>{`handlePageChange: (index: number) => void`}</strong> 
                            <p>
                            Handles changing the current visible page according to the provided index
                            </p>
                            <CodeDiv content={`
<button
  handlePageChange(currentPage + 1)
>
  Next page
</button>
                            `}/>
                        </div>
                        <div>
                            <strong>{`currentPage: number`}</strong> 
                            <p>
                            The item in the pages array currently displayed in the pagination
                            </p>
                            <CodeDiv content={`
<button
  handlePageChange(currentPage - 1)
>
  Previous page
</button>
                            `}/>
                        </div>
                        <div>
                            <strong>{`pages: [ ][ ]`}</strong> 
                            <p>
                            The array of pages generated from the items passed to the Pagination component
                            </p>
                            <CodeDiv content={`
pages.map((_page: any, index: any) => (
    <button
      onClick={() => handlePageChange(index)}
    >
      {index + 1}
    </button>
))
                            `}/>
                        </div>
                        <div>
                            <strong>{`infiniteFlip? : boolean`}</strong> 
                            <p>
                            Is the infiniteFlip allowed (on PaginationSwipeable component)
                            </p>
                            <CodeDiv content={`
if (!pages[currentPage - 1] && infiniteFlip) {
    handlePageChange(pages.length - 1);
}
                            `}/>
                        </div>
                        <div>
                            <strong>{`getContainerRef?: () => HTMLDivElement`}</strong> 
                            <p>
                            Returns a reference to the pagination container <code>div</code> element
                            </p>
                            <CodeDiv content={`
let containerRef = getContainerRef();
containerRef.addEventListener(...)
                            `}/>
                        </div>
                        <div>
                            <strong>{`getCurrentPageRef?: () => HTMLDivElement`}</strong> 
                            <p>
                            Returns a reference to the current page <code>div</code> element
                            </p>
                            <CodeDiv content={`
let currentPageRef = getCurrentPageRef();
currentPageRef.addEventListener(...)
                            `}/>
                        </div>
                    </div>
                </Route>
                <Route path={`${path}/pagination_animated`}>
                    <div>
                        <h2 style={{textAlign: 'center'}}>PaginationAnimated</h2>
                        <h3 style={{textAlign: 'center'}}>
                        Pagination component with customizable transition animations
                        </h3>
                        <div>
                            <strong>{`items: Array<any>`}</strong> 
                            <p>
                            An array of JavaScript Objects to be paginated
                            </p>
                            <CodeDiv content={`items={fetchedArray}`}/>
                        </div>
                        <div>
                            <strong>{`itemsOnPage?: number`}</strong> 
                            <p>
                            A number of items on each page, defaults to 5 
                            </p>
                            <CodeDiv content={`itemsOnPage={10}`}/>
                        </div>
                        <div>
                            <strong>{`topNav?: boolean`}</strong> 
                            <p>
                            To show top navigation or not
                            <br/>
                            If neither <strong>bottomNav</strong> nor <strong>topNav</strong> are specified, defaults to showing top navigation
                            </p>
                            <CodeDiv content={`topNav={true}`}/>
                        </div>
                        <div>
                            <strong>{`bottomNav?: boolean`}</strong> 
                            <p>
                            To show bottom navigation or not
                            <br/>
                            If neither <strong>bottomNav</strong> nor <strong>topNav</strong> are specified, defaults to showing top navigation
                            </p>
                            <CodeDiv content={`bottomNav={true}`}/>
                        </div>
                        <div>
                            <strong>{`entryProp: string`}</strong> 
                            <p>
                            The prop to be cloned during the iteration process
                            </p>
                            <CodeDiv content={`
const MyComponent = ({ component }) => {...}

...

<PaginationAnimated
    entryProp="component"
    children={<MyComponent />}
    ...
/>
`}
                            />
                        </div>
                        <div>
                            <strong>{`iterationKey?: string`}</strong> 
                            <p>
                            The key for the iteration to tell React which field of the Object to use as key prop during the iteration
                            <br/>
                            Defaults to "id", fallbacks to the item's index (<strong>warning</strong>: indices are not reliable iteration keys)
                            </p>
                            <CodeDiv content={`items={fetchedArray}`}/>
                        </div>
                        <div>
                            <strong>{`customNavigation?: React.ReactElement`}</strong> 
                            <p>
                            Custom Navigation component to use instead of the built-in one
                            </p>
                            <CodeDiv content={`
import MyNavigation from "./MyNavigation.js";
...
customNavigation={MyNavigation}
`}
                            />
                        </div>
                        <div>
                            <strong>{`customNextAnimation? : string`}</strong> 
                            <p>
                            The CSS transition animation to the next page
                            <br/>
                            <strong>Note</strong>: animation should be in the Parent's scope to run correctly
                            </p>
                            <CodeDiv content={`
import "./myAnimations.css";
...
customNextAnimation="myNextAnimation 1s forwards"
`}
                            />
                        </div>
                        <div>
                            <strong>{`customPrevAnimation? : string`}</strong> 
                            <p>
                            The CSS transition animation to the previous page
                            <br/>
                            <strong>Note</strong>: animation should be in the Parent's scope to run correctly
                            </p>
                            <CodeDiv content={`
import "./myAnimations.css";
...
customPrevAnimation="myPrevAnimation 1s forwards"
`}
                            />
                        </div>
                        <div>
                            <strong>{`delay?: number`}</strong>
                            <p>
                            The delay of switching the pages in milliseconds
                            <br/>
                            Can be used to achieve smoother custom animation effects
                            </p>
                            <CodeDiv content={`delay={300}`}/>
                        </div>
                        <div>
                            <strong>{`children: React.ReactElement`}</strong> 
                            <p>
                            The React Component to be rendered in the pagination, all the props except for the <strong>entryProp</strong> can be directly passed here
                            </p>
                            <CodeDiv content={`
const MyComponent = ({ component, handleEdit }) => {...}

...

<PaginationAnimated
    entryProp="component"
    children={<MyComponent handleEdit={handleEdit} />}
    ...
/>
`}
                            />
                        </div>
                    </div>
                </Route>
                <Redirect to={`${path}/pagination_animated`}/>
            </Switch>
        </div>
    )
}

export default APIReference;