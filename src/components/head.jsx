/*
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
*/

import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./head.css";
import logo from "./logo.png";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef();

  // Navbar shrink on scroll
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  // Close menu if clicking outside
  useEffect(() => {

    const handleClickOutside = (e) => {
      if (
        navRef.current && 
        !navRef.current.contains(e.target) &&
        !e.target.closest(".menu-toggle")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (
    <>

      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container">

          {/* Logo */}

          <NavLink
            to="/"
            className="logo"
            onClick={() => setMenuOpen(false)}
          >
            <img src={logo} alt="Company Logo" />
            <h1>GlobalCyberAssociates</h1>
          </NavLink>

          {/* Hamburger */}

          <div
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          </div>

          {/* Navigation */}

          <nav
            ref={navRef}
            className={`site-nav ${menuOpen ? "open" : ""}`}
          >
            <ul>

              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/Solutions" onClick={() => setMenuOpen(false)}>
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/products" onClick={() => setMenuOpen(false)}>
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/blog" onClick={() => setMenuOpen(false)}>
                  Blog
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Assessment"
                  className="nav-cta"
                  onClick={() => setMenuOpen(false)}
                >
                  Free Assessment
                </NavLink>
              </li>

            </ul>
          </nav>

        </div>
      </header>
    </>
  );
};

export default Header;
