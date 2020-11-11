import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Media from "react-media";

import "./navbar.css";


const Navbar = ({
  isNavbarOpen,
  closeNavbar,
  setIsNavbarOpen
}) => {
  // Original
  const [closeOnClick, setCloseOnClick] = useState(false);

  let location = useLocation();

  const voidFunction = () => {};

  const node = useRef();

  const handleOutsideClick = (event) => {
    if (node.current.contains(event.target)) {
      return;
    } else {
      setIsNavbarOpen(false);
    }
  };
  // Touch
  const [isDragging, setIsDragging] = useState(false);
  const [posLeft, setPosLeft] = useState(0);
  const [prevLeft, setPrevLeft] = useState(0);

  const divStyle = {
    left: closeOnClick ? (isNavbarOpen ? posLeft : "-80vw") : 0,
    overFlowX: "hidden"
  };

  const _onTouchStart = (event) => {
    setIsDragging(true);
    extractPositionDelta(event.nativeEvent.touches[0]);

    // these four lines added later
    const { left } = extractPositionDelta(event.nativeEvent.touches[0]);

    if (posLeft + left <= 0) {
      setPosLeft(posLeft + left);
    }
  };

  const _onTouchMove = (event) => {
    if (!isDragging) {
      return;
    }
    const { left } = extractPositionDelta(event.nativeEvent.touches[0]);

    if (posLeft + left <= 0) {
      setPosLeft(posLeft + left);
    }
  };

  const _onTouchEnd = (event) => {
    setIsDragging(false);

    let delta = Math.abs(prevLeft) - Math.abs(posLeft);

    if (delta < -30) {
      closeNavbar();
    }

    setPosLeft(0);
    setPrevLeft(0);
  };

  const extractPositionDelta = (event) => {
    const left = event.clientX;

    const delta = {
      left: left - prevLeft
    };

    setPrevLeft(left);

    return delta;
  };

  useEffect(() => {
    if (isNavbarOpen && closeOnClick) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isNavbarOpen, closeOnClick]);

  return (
    <>
      <Media
        query="(min-width: 1000px)"
        onChange={(matches) => {
          if (matches) {
            setCloseOnClick(false);
            setIsNavbarOpen(true);
          } else {
            setCloseOnClick(true);
          }
        }}
      />
      <div
        className={`navbar__containerDiv ${
          isNavbarOpen
            ? "navbar__containerDiv--open"
            : "navbar__containerDiv--closed"
        }`}
        ref={node}
        style={divStyle}
        onTouchStart={_onTouchStart}
        onTouchMove={_onTouchMove}
        onTouchEnd={_onTouchEnd}
        onTouchCancel={_onTouchEnd}
      >
        <div className="navbar__linksContainerDiv">
            <NavLink   
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                exact
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/"
            >
                Main
            </NavLink>
            <NavLink    
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/posts"
            >
                Posts
            </NavLink>
            <NavLink    
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/usercards"
            >
                Usercards
            </NavLink>
            <NavLink    
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/imagegallery"
            >
                Image gallery
            </NavLink>
            <NavLink    
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/navigation"
            >
                Navigation
            </NavLink>
            <NavLink  
                className="navbar__Link"
                activeClassName="navbar__Link--active"
                onClick={() => {
                    closeOnClick
                    ?
                    closeNavbar()
                    :
                    voidFunction()
                }} 
                to="/apireference"
            >
                API Reference
            </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;