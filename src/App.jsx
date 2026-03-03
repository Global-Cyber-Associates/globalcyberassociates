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
import Presentation2 from "./components/presentations/Presentation2.jsx";
import Presentation3 from "./components/presentations/Presentation3.jsx";
import PresentationIndex from "./components/presentations/PresentationIndex.jsx";
import AssessmentPage from "./components/assessment/AssessmentPage.jsx";
import { useNavigate } from "react-router-dom";

// Contact page component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const App = () => {

  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

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
          setToast({
            title: "Access denied",
            message: "Invalid authentication token.",
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  useEffect(() => {
    if (!toast) return undefined;
    const timerId = window.setTimeout(() => {
      setToast(null);
    }, 4200);
    return () => window.clearTimeout(timerId);
  }, [toast]);

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 z-[1200] w-[min(92vw,26rem)] rounded-xl border border-red-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.2)]">
          <div className="flex items-start gap-3 p-4">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              !
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
              <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="rounded-md px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close notification"
            >
              x
            </button>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-b-xl bg-red-100">
            <div className="h-full w-full origin-left animate-[toastProgress_4.2s_linear_forwards] bg-red-500" />
          </div>
        </div>
      )}
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
        <Route path="presentation3" element={<Presentation3 />} />
        <Route path="Assessment" element={<AssessmentPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* Fallback route for 404 Not Found */}
      </Routes>
      <style>{`
        @keyframes toastProgress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </>
  );
};

export default App;
