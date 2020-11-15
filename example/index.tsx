import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';

import Navbar from './components/Navbar';

import Main from "./components/Main";
import Posts from './components/Posts';
import Usercards from './components/Usercards';
import ImageGallery from './components/ImageGallery';
import APIReference from './components/APIReference';

import './index.css'

const App = () => {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  }

  return (
    <Router>
    <ScrollToTop />
    <div className="App">
      <nav className="App__topNav">
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
          <Route path="/imagegallery">
            <ImageGallery />
          </Route>
          <Route path="/apireference">
            <APIReference />
          </Route>
          <Route path="/">
            <Main/>
          </Route>
      </Switch>
      <div className="footer" >
        <div style={{textAlign: 'center'}}>
          <a title="source code" target="blank" href="https://github.com/dmitryjima/react-animated-pagination">
            Source code
          </a>
          Data for examples: <a target="blank" href="https://jsonplaceholder.typicode.com/">
            JSONPlaceholder
          </a>, <a target="blank" href="https://picsum.photos/">
            Lorem Picsum
          </a>
        </div>
      </div>
    </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
