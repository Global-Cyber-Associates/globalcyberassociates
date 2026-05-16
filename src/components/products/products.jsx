import React from 'react';
import { Helmet } from 'react-helmet';
import './products.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import visunImg from '../products/visun-dashboard.png';
import visunVideo from '../products/visun-demo.mp4';

const VideoPlayer = ({ src, thumbnail }) => {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <div className="demo-video-shell">
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        controls={playing}
        preload="metadata"
        className="demo-video-el"
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <div className="demo-video-overlay" onClick={handlePlay}>
          <div className="demo-play-ring">
            <div className="demo-play-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <span className="demo-play-label">Watch Demo</span>
        </div>
      )}
    </div>
  );
};

const visunAIFeatures = [
  { label: 'Network Visibility — Real-time map of every device on your network.' },
  { label: 'Rogue Device Alerts — Instant notification when an unauthorised device connects.' },
  { label: 'File Outflow Control — Monitor and restrict sensitive data leaving your systems.' },
  { label: 'File Integrity Monitoring — Know if critical files are modified, moved, or deleted.' },
  { label: 'Remote Endpoint Management — Secure and manage devices regardless of location.' },
];

const Products = () => (
  <>
    <Helmet>
      <title>Products | Global Cyber Associates</title>
      <meta name="description" content="Discover VisuN — a purpose-built security tool for network visibility without the overhead of a full security operation." />
    </Helmet>
    <Header />
    <main className="products-page">

      <div className="products-hero">
        <p className="products-label">Our Product</p>
        <h1 className="products-heading">
          See Everything.<br />Secure Everything.
        </h1>
        <p className="products-sub">
          A purpose-built AI-powered tool that gives your team continuous network visibility
          — without the overhead of a full security operation.
        </p>
      </div>

      <div className="products-list">

        <section className="pc-card">

          <div className="pc-accent-bar" />

          <div className="pc-header">
            <span className="pc-tag">Network Security · AI-Powered</span>
            <h2 className="pc-name">VisuNAI</h2>
            <p className="pc-tagline">See Everything on Your Network</p>
            <p className="pc-description">
              Most breaches start with something invisible: an unknown device, an unusual file movement,
              an unauthorized connection. VisuNAI eliminates that blind spot.
            </p>
          </div>

          <div className="pc-body">
            <div className="pc-image-wrap">
              <img src={visunImg} alt="VisuN — Network Visibility Dashboard" className="pc-image" />
            </div>
            <ul className="pc-features">
              {visunAIFeatures.map((f, i) => (
                <li className="pf-item" key={i}>
                  <span className="pf-check">✔</span>
                  <span className="pf-label">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pc-video-section">
            <div className="pc-video-heading">
              <span className="pc-video-heading-line" />
              <span className="pc-video-heading-text">VisuNAI in Action</span>
              <span className="pc-video-heading-line" />
            </div>
            <VideoPlayer src={visunVideo} thumbnail={visunImg} />
          </div>

          <div className="pc-footer">
            <div className="pc-footer-left">
              <div className="pc-price-badge">
                <span className="pc-price-amount">$1</span>
                <span className="pc-price-unit">per endpoint / mo</span>
              </div>
              <p className="pc-price-meta">30-day data retention · Cancel anytime</p>
            </div>
            <div className="pc-footer-right">
              <a
                href="mailto:info@globalcyberassociates.com?subject=VisuNAI%20%E2%80%94%20Demo%20Request"
                className="pc-cta"
              >
                Request a Demo →
              </a>
            </div>
          </div>

        </section>

      </div>

    </main>
    <Footer />
  </>
);

export default Products;
