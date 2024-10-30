import React, { useState } from "react";
import skincare from "./images/logo6.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header1">
        <div className="logo">
          <img src={skincare} alt="Logo" className="header-icon" width="5px" />
          <div className="navbar-text">YOUR SKIN EXPERT</div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">&#9776;</span>
        </button>
        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="about">About</a>
            </li>
            <li>
              <a href="contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
