import React from "react";
import { Link } from "react-router-dom";
import "./head.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <img
            src="https://lh4.googleusercontent.com/Cy3ijZRe-zamRZm7PwhWebLf4yyPxeLe9C1I3sY5ynEpIH3gtbcTr46d27r5UgLDEVsReCNW0D7KKUSOYYJoF0k=w16383"
            alt="Global Cyber Associates Logo"
            className="logo-img"
          />
          <h1 className="logo-text">GlobalCyberAssociates</h1>
        </div>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
