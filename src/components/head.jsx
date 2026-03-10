import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./head.css";
import logo from './logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <img className="logo-img" src={logo} alt="Company Logo" />
          <h1 className="logo-text">GlobalCyberAssociates</h1>
        </Link>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          <span className={`bar ${menuOpen ? "open" : ""}`}></span>
        </div>

        <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/Solutions" onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
            <li><Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/Assessment" className="nav-cta" onClick={() => setMenuOpen(false)}>Free Assessment</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
