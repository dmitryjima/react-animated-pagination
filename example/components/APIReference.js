import React from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";

import { PaginationAnimated, PaginationSwipeable, NavigationTypes } from '../../src'

import "./apiReference.css";

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
                <Route path={`${path}/pagination_animated`}>
                    <div>

                    </div>
                </Route>
                <Route path={`${path}/pagination_swipeable`}>
                    <div>
                        
                    </div>
                </Route>
                <Route path={`${path}/navigation_types`}>
                    <div>
                        
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default APIReference;