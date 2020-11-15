# React Animated Pagination

**A stateful ReactJS Component for dynamic pagination and carousel-like widgets🚀🚀🚀**

Interactive demo and full API documentation: [DEMO](https://react-animated-pagination.zdcreatech.com)

## Installation

```bash
npm i react-animated-pagination
```

## Basic usage

This module exports two components `PaginationAnimated` (basic animated transitions), `PaginationSwipeable` (swipeable on touch screens and supports infinite page flipping), and a `NavigationTypes` TS type for easier creation of custom pagination controls.

```jsx
import { PaginationAnimated, PaginationSwipeable, NavigationTypes } from 'react-animated-pagination';
```

It is primaraly aimed at paginating relatively complex components that are strongly connected to their Parent.

**Warning**: this module is slightly opinionated about the rendered components' structure, as it assumes that each paginated component has an entry prop (e.g. `post` for a `PostComponent`). If this doesn't suit your components' structure, you can refer to the source code to create a pagination of your own.

```jsx
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
```

An large number of these components can be paginated with a few lines of parameters, main being:

* `items` \[Object\] - an array of JavaScript Objects to iterate through;
* `entryProp` string - the name of the prop to be cloned during iteration, the Object in the current cycle of iteration will be passed to it as value (usually, 'post' for PostComponent, 'user' for UserComponent);
* `iterationKey` string - the key for the iteration to tell React which field of the Object to use as key prop during the iteration. Defaults to id, fallbacks to the item's index (warning: indices are not reliable iteration keys);
* `children` React Component - the React Component to be rendered, all the props except for the entryProp can be directly passed here.

```jsx
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
        entryProp="component"
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
```

Check out interactive examples and the API Reference in the [DEMO](https://react-animated-pagination.zdcreatech.com) to see how to use different combinations of parameters and custom navigaton controls to create paginations and carousels.

Source code can be found in the repository if you need a reference for custom navigation or want to create a similar component from scratch.