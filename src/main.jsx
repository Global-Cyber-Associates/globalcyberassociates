import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import "highlight.js/styles/github-dark.css";
import { initAnalytics, trackPageView } from "./lib/analytics.js";

function RouteAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(pagePath);
  }, [location.pathname, location.search, location.hash]);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <RouteAnalyticsTracker />
        <App />
      </BrowserRouter>
  </StrictMode>,
)
