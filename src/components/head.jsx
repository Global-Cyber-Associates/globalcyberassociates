import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./head.css";
import logo from "./logo.png";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const navRef = useRef();

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

          <NavLink
            to="/"
            className="logo"
            onClick={() => setMenuOpen(false)}
          >
            <img src={logo} alt="Company Logo" />
            <h1>GlobalCyberAssociates</h1>
          </NavLink>

          <div
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
            <span className={`bar ${menuOpen ? "open" : ""}`}></span>
          </div>

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
                <NavLink to="/solutions" onClick={() => setMenuOpen(false)}>
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
                <NavLink to="/careers" onClick={() => setMenuOpen(false)}>
                  Careers
                </NavLink>
              </li>

              <li>
                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/assessment"
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
