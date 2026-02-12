import React from "react";
import "./App.css";  // Main CSS file for styling
import { Routes, Route } from "react-router-dom";
import Home from "./components/homepage/home.jsx";  // Home page component
import About from "./components/about/about.jsx";
import Services from "./components/servicepage/service.jsx";  // Services page component
import CareersPage from "./components/careers/careers.jsx";
import Contact from "./components/contact/contact.jsx";
import Brief from "./components/brief/brief.jsx";  // Brief page component
import Presentations from "./components/presentations/Presentations.jsx";
import { useNavigate } from "react-router-dom";

// Contact page component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    const handleKeyDown = (e) => {
      // Check for Ctrl + P
      if (e.ctrlKey && e.key.toLowerCase() === 'p') {
        e.preventDefault(); // Prevent browser print dialog
        const password = prompt("Enter Administration Password to view Visual Intel:");
        if (password === 'gca@123') {
          navigate('/presentations');
        } else if (password !== null) {
          alert("Access Denied: Invalid Authentication Token.");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="Solutions" element={<Services />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Brief" element={<Brief />} />
        <Route path="presentations" element={<Presentations />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Fallback route for 404 Not Found */}
      </Routes>
    </>
  );
};

export default App;
