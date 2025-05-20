import React from "react";
import { Link } from "react-router-dom";
import "./head.css";
import logo from './logo.png';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <img  className="logo-img" src={logo} alt="" />
          <h1 className="logo-text">GlobalCyberAssociates</h1>
        </div>
        <nav className="site-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Solutions">Solutions</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
