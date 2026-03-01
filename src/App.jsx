import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home             = lazy(() => import("./components/homepage/home.jsx"));
const About            = lazy(() => import("./components/about/about.jsx"));
const Services         = lazy(() => import("./components/servicepage/service.jsx"));
const CareersPage      = lazy(() => import("./components/careers/careers.jsx"));
const Contact          = lazy(() => import("./components/contact/contact.jsx"));
const Brief            = lazy(() => import("./components/brief/brief.jsx"));
const Presentations    = lazy(() => import("./components/presentations/Presentations.jsx"));
const Presentation2    = lazy(() => import("./components/presentations/Presentation2.jsx"));
const PresentationIndex = lazy(() => import("./components/presentations/PresentationIndex.jsx"));
const AssessmentPage   = lazy(() => import("./components/assessment/AssessmentPage.jsx"));
const Products         = lazy(() => import("./components/products/products.jsx"));

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
          navigate('/presentaiotn');
        } else if (password !== null) {
          alert("Access Denied: Invalid Authentication Token.");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="Solutions" element={<Services />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="Brief" element={<Brief />} />
        <Route path="presentaiotn" element={<PresentationIndex />} />
        <Route path="presentations" element={<PresentationIndex />} />
        <Route path="presentation1" element={<Presentations />} />
        <Route path="presentation2" element={<Presentation2 />} />
        <Route path="Assessment" element={<AssessmentPage />} />
        <Route path="products" element={<Products />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Fallback route for 404 Not Found */}
      </Routes>
    </Suspense>
  );
};

export default App;
