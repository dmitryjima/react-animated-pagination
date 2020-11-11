import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

//import { NavigationTypes } from '../src/index'

import Navbar from './components/Navbar';

import Main from "./components/Main";
import Posts from './components/Posts';
import Usercards from './components/Usercards';

import './index.css'

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  }

  return (
    <Router>
    <div className="App">
      <nav className="App_topNav" style={{height: '3em', padding: '0', position: 'sticky', top: '.3em', zIndex: '100'}}>
        <button
          className={`navbar__toggleNavbarBtn ${
            isNavbarOpen
              ? "navbar__toggleNavbarBtn--open"
              : "navbar__toggleNavbarBtn--closed"
          }`}
          title={!isNavbarOpen ? "Open menu" : "Close menu"}
          onMouseDown={() => setIsNavbarOpen(isNavbarOpen ? false : true)}
        >
          <span className="navbar__toggleNavbarBtn__line" />
          <span className="navbar__toggleNavbarBtn__line" />
          <span className="navbar__toggleNavbarBtn__line" />
        </button>
      </nav>
      <div style={{textAlign: 'center'}}>
        <h1>React Animated Pagination</h1>
        
      </div>
      <Navbar
        isNavbarOpen={isNavbarOpen}
        closeNavbar={closeNavbar}
        setIsNavbarOpen={setIsNavbarOpen}
      />
      <Switch>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/usercards">
            <Usercards/ >
          </Route>
          <Route path="/">
            <Main/>
          </Route>
      </Switch>
      <div style={{height: '10vh', width: '100%', backgroundColor: 'black', marginTop: '5em'}}>

      </div>
    </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
