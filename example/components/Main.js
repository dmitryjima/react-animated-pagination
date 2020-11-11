import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { PaginationSwipeable } from "../../src";
import CodeDiv from "./CodeDiv";

import './showCase.css';

const items = [
    {
        id: '1',
        title: 'Hey there',
        subtitle: 'I am paginated!'
    },
    {
        id: '2',
        title: 'Yeah!',
        subtitle: 'Me, too!'
    },
    {
        id: '3',
        title: 'Ho ho!',
        subtitle: 'Swipes on mobile!'
    }
];

const MyComponent = ({ 
    body,
  }) => {
    return (
      <div style={{textAlign: 'center'}}>
          <h2>{body.title}</h2>
          <p>{body.subtitle}</p>
      </div>
    );
  }

const Main = () => {

    return (
        <div className="showcase">
            <h3 style={{textAlign: 'center'}}>A stateful ReactJS Component for dynamic pagination and carousel-like widgets🚀🚀🚀</h3>
            <PaginationSwipeable
                infiniteScroll={true}
                bottomNav={true}
                topNav={true}
                cloneKey="body"
                iterationKey="id"
                items={items}
                itemsOnPage={1}
                children={<MyComponent />}
            />
            <div>
            <h2>Installation</h2>
            <CodeDiv content={`npm i react-animated-pagination`}/>
            </div>
            <div>
            <h2>Usage</h2>
            <p>This module exports two components <code>PaginationAnimated</code> (basic animated transitions), <code>PaginationSwipeable</code> (swipeable on touch screens and supports infinite scroll), and a type <code>NavigationTypes</code> for easier creation of custom pagination controls.</p>
            <CodeDiv
                content={
`
import { PaginationAnimated, PaginationSwipeable, NavigationTypes } from 'react-animated-pagination';
`
                }
            />
            <p>It is primaraly aimed at paginating relatively complex components that are strongly connected to their Parent.</p>
            <CodeDiv 
                content={
`
// A "complex" component to be paginated
const MyComponent = ({ 
    component,
    handleDelete,
    handleEdit,
    commonState
}) => {
    return (
    <div>
        <h2>{component.name}</h2>
        <p>{component.description}</p>
        <img src={component.imageURL} alt={component.name}/>
        <button onClick={() => handleEdit(component.id)}>Edit</button>
        <button onClick={() => handleDelete(component.id)}>Delete</button>
    </div>
    );
}
`
                }
            />
            <div>
                An large number of these components can be paginated with a few lines of parameters, main being: 
                <ul>
                    <li>
                        <code>items [Object]</code> - an array of JavaScript Objects to iterate through;
                    </li>
                    <li>
                        <code>cloneKey string</code> - the name of the prop to be cloned during iteration, will be passed the whole Object as value (usually, <code>'post'</code> for <code>PostComponent</code>, <code>'user'</code> for <code>UserComponent</code>);
                    </li>
                    <li>
                        <code>iterationKey string</code> - the key for the iteration to tell React which field of the Object to use as key prop during the iteration. Defaults to <code>id</code>, fallbacks to the item's <code>index</code> (warning: indices are not reliable iteration keys);
                    </li>
                    <li>
                        <code>children React Component</code> - the React Component to be rendered, all the props except for cloned prop can be directly passed here.
                    </li>
                </ul>
            </div>
            <CodeDiv
                content={
`
// A Parent component containing "complex" components
import { PaginationAnimated } from 'react-animated-pagination';

import './MyComponent'

const ParentComponent = ({ arrayOfObjects, commonState }) => {
    const handleEdit = () => {...}
    const handleDelete = () => {...}
    return (
    <div>
        <h2>Here are my components:</h2>
        <PaginationAnimated 
        bottomNav={true}
        topNav={true}
        itemsOnPage={5}
        items={arrayOfObjects}
        cloneKey="component"
        iterationKey="id"
        children={
            <MyComponent 
            handleDelete={handleDelete} 
            handleEdit={handleEdit} 
            commonState={commonState}
            />
        }
        />
    </div>
    );
}
`
                }
            />
            </div>
            <div>
                Check out interactive examples and the <Link to="/apireference">API Reference</Link> to see how to use different combinations of parameters and custom navigaton controls to create paginations and carousels.
            </div>
            <div>
                Source code can be found in the repository if you need a reference for custom navigation or want to create a similar component from scratch.
            </div>
        </div>
    )
}

export default Main;