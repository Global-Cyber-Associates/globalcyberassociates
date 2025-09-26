import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./head.css";
import logo from './logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="logo">
          <img className="logo-img" src={logo} alt="Company Logo" />
          <h1 className="logo-text">GlobalCyberAssociates</h1>
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </div>

        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/Solutions" onClick={() => setMenuOpen(false)}>Solutions</Link></li>
            <li><Link to="/careers" onClick={() => setMenuOpen(false)}>Careers</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
