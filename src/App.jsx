import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";

import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

const Home = lazy(() => import("./components/homepage/home.jsx"));
const About = lazy(() => import("./components/about/about.jsx"));
const Services = lazy(() => import("./components/servicepage/service.jsx"));
const CareersPage = lazy(() => import("./components/careers/careers.jsx"));
const Contact = lazy(() => import("./components/contact/contact.jsx"));
const Brief = lazy(() => import("./components/brief/brief.jsx"));
const Presentations = lazy(() => import("./components/presentations/Presentations.jsx"));
const Presentation2 = lazy(() => import("./components/presentations/Presentation2.jsx"));
const Presentation3 = lazy(() => import("./components/presentations/Presentation3.jsx"));
const Presentation4 = lazy(() => import("./components/presentations/Presentation4.jsx"));
const PresentationIndex = lazy(() => import("./components/presentations/PresentationIndex.jsx"));
const AssessmentPage = lazy(() => import("./components/assessment/AssessmentPage.jsx"));
const Products = lazy(() => import("./components/products/products.jsx"));
const Blogs = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));

const App = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    const handleKeyDown = (e) => {

      if (e.ctrlKey && e.key.toLowerCase() === "p") {

        e.preventDefault();

        const password = prompt("Enter Administration Password to view Visual Intel:");

        if (password === "gca@123") {
          navigate("/presentations");
        } else if (password !== null) {
          setToast({
            title: "Access denied",
            message: "Invalid authentication token."
          });
        }

      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [navigate]);

  useEffect(() => {

    if (!toast) return;

    const timerId = setTimeout(() => {
      setToast(null);
    }, 4200);

    return () => clearTimeout(timerId);

  }, [toast]);

  return (
    <>
      <ScrollToTop />

      <Suspense fallback={null}>

        <AnimatePresence mode="wait">

          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<PageTransition><Home /></PageTransition>} />

            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/refund" element={<PageTransition><Refund /></PageTransition>} />

            <Route path="/blog" element={<PageTransition><Blogs /></PageTransition>} />
            <Route path="blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />

            <Route path="about" element={<PageTransition><About /></PageTransition>} />
            <Route path="solutions" element={<PageTransition><Services /></PageTransition>} />
            <Route path="careers" element={<PageTransition><CareersPage /></PageTransition>} />
            <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />

            <Route path="brief" element={<PageTransition><Brief /></PageTransition>} />

            <Route path="presentation" element={<PageTransition><PresentationIndex /></PageTransition>} />
            <Route path="presentations" element={<PageTransition><PresentationIndex /></PageTransition>} />

            <Route path="presentation1" element={<PageTransition><Presentations /></PageTransition>} />
            <Route path="presentation2" element={<PageTransition><Presentation2 /></PageTransition>} />
            <Route path="presentation3" element={<PageTransition><Presentation3 /></PageTransition>} />
            <Route path="presentation4" element={<PageTransition><Presentation4 /></PageTransition>} />

            <Route path="assessment" element={<PageTransition><AssessmentPage /></PageTransition>} />
            <Route path="products" element={<PageTransition><Products /></PageTransition>} />

          </Routes>

        </AnimatePresence>

      </Suspense>
    </>
  );
};

export default App;