import React from "react";
import "./App.css";  // Main CSS file for styling
import { Routes, Route } from "react-router-dom";
import Home from "./components/homepage/home.jsx";  // Home page component
import About from "./components/about/about.jsx";
import Services from "./components/servicepage/service.jsx";  // Services page component
import CareersPage from "./components/careers/careers.jsx";
import Contact from "./components/contact/contact.jsx"; 
 // Contact page component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
  AOS.init({
    duration: 1000, 
    once: true     
  });
}, []);

  return (
    <>
      <Routes>   
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="Solutions" element={<Services />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
