/*
import React from 'react';
import './products.css';
import '../pricing/pricing.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import visunImg from '../homepage/vuln.png';
import visunPlusImg from '../homepage/staff.png';
import visunVideo from '../products/visuN-demo.mp4';

const VideoPlayer = ({ src, label }) => {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="demo-video-wrap">
      <p className="demo-video-label">▶ See {label} in Action</p>
      <div className="demo-video-shell">
        <video
          ref={videoRef}
          src={src}
          controls={playing}
          className="demo-video-el"
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="demo-video-overlay" onClick={handlePlay}>
            <div className="demo-play-btn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="demo-overlay-text">Watch Demo</p>
          </div>
        )}
      </div>
    </div>
  );
};

const visunFeatures = [
  { label: 'Network Visibility', detail: 'Real-time map of every device connected to your environment' },
  { label: 'Rogue Device Alerts', detail: 'Instant notification when an unauthorised device joins your network' },
  { label: 'File Outflow Control', detail: 'Monitor and restrict sensitive data leaving your systems' },
  { label: 'File Integrity Monitoring', detail: 'Know if critical files are modified, moved, or deleted' },
  { label: 'Remote Endpoint Management', detail: 'Manage and secure devices regardless of location' },
];

const visunPlusFeatures = [
  { label: 'Financial Impact & ROI', detail: 'Understand the financial impact of productivity and compliance' },
  { label: 'People & Performance View', detail: 'Understand the performance of your people' },
  { label: 'Workforce Intelligence & Growth Control Center', detail: 'A unified platform to monitor, analyze, and optimize workforce productivity and performance' },
];

const Products = () => {
  return (
    <>
      <Header />
      <main>

        <div className="products-hero" data-aos="fade-up">
          <p className="products-label">Our Products</p>
          <h1 className="products-heading">
            Purpose-Built Tools for Ongoing Visibility
          </h1>
          <p className="products-sub">
            Our purpose built tools give you continuous visibility and control —
            without needing a full security team to operate them.
          </p>
        </div>
*/
        {/* VisuN */}/*
        <section className="product-section" data-aos="fade-up">
          <div className="product-container">
            <div className="product-image">
              <img src={visunImg} alt="VisuN — Network Visibility" />
            </div>
            <div className="product-content">
              <h2 className="product-name">VisuN</h2>
              <p className="product-tagline">See Everything on Your Network</p>
              <p className="product-description">
                Most breaches start with something invisible: an unknown device, an unusual file movement,
                an unauthorized connection. VisuN eliminates that blind spot.
              </p>
              <VideoPlayer src={visunVideo} label="VisuN" />
              <ul className="product-features">
                {visunFeatures.map((f, i) => (
                  <li key={i}>
                    <span className="feature-label">{f.label}</span>
                    <span className="feature-detail"> — {f.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="product-action-row">
                <div className="product-price-card featured">
                  <div className="pp-price">$1</div>
                  <div className="pp-text">
                    <p className="pp-unit">per endpoint / mo</p>
                    <p className="pp-meta">30-day retention</p>
                  </div>
                </div>
                <a
                  href="mailto:products@globalcyberassociate.com?subject=VisuN%20%E2%80%94%20Demo%20Request"
                  className="product-cta"
                >
                  REQUEST A VISUN DEMO →
                </a>
              </div>
            </div>
          </div>
        </section>
*/
        {/* VisuN+ */} /*
        <section className="product-section" data-aos="fade-up">
          <div className="product-container reverse">
            <div className="product-image">
              <img src={visunPlusImg} alt="VisuN+ — Workforce Intelligence" />
            </div>
            <div className="product-content">
              <h2 className="product-name">VisuN+</h2>
              <p className="product-tagline">Productivity Enhancement Platform</p>
              <p className="product-description">
                VisuN+ extends network visibility to people and productivity. Understand how your
                workforce operates, identify inefficiencies, and surface risk patterns —
                without becoming Big Brother.
              </p>
              
              <ul className="product-features">
                {visunPlusFeatures.map((f, i) => (
                  <li key={i}>
                    <span className="feature-label">{f.label}</span>
                    <span className="feature-detail"> — {f.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="product-action-row">
                <div className="product-price-card featured">
                  <div className="pp-price">$2</div>
                  <div className="pp-text">
                    <p className="pp-unit">per user / mo</p>
                    <p className="pp-meta">30-day retention</p>
                  </div>
                </div>
                <a
                  href="mailto:products@globalcyberassociate.com?subject=VisuN%2B%20%E2%80%94%20Demo%20Request"
                  className="product-cta"
                >
                  REQUEST A VISUN+ DEMO →
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Products;
*/
/* old code END */

import React from 'react';
import './products.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
//import visunImg from '../homepage/vuln.png';
//import visunPlusImg from '../homepage/staff.png';
import visunVideo from '../products/visun.mp4';
import visunPlusVideo from '../products/visun.mp4';

const visunImg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000";
const visunPlusImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";


// Video Player Component 

const VideoPlayer = ({ src }) => {
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
          <p className="demo-overlay-label">Watch Product Demo</p>
        </div>
      )}
    </div>
  );
};


// Feature Item

const FeatureItem = ({ label, detail }) => (
  <li className="pf-item">
    <span className="pf-check">✔</span>
    <div className="pf-text">
      <span className="pf-label">{label}</span>
      <span className="pf-detail">{detail}</span>
    </div>
  </li>
);


// Data

const visunFeatures = [
  { label: 'Network Visibility',          detail: 'Real-time map of every device connected to your environment' },
  { label: 'Rogue Device Alerts',         detail: 'Instant notification when an unauthorised device joins your network' },
  { label: 'File Outflow Control',        detail: 'Monitor and restrict sensitive data leaving your systems' },
  { label: 'File Integrity Monitoring',   detail: 'Know if critical files are modified, moved, or deleted' },
  { label: 'Remote Endpoint Management',  detail: 'Manage and secure devices regardless of location' },
];

const visunPlusFeatures = [
  { label: 'Financial Impact & ROI',                   detail: 'Understand the financial impact of productivity and compliance' },
  { label: 'People & Performance View',                detail: 'Understand the performance of your people' },
  { label: 'Workforce Intelligence & Growth Control',  detail: 'A unified platform to monitor, analyze, and optimize workforce productivity' },
];


// Product Card

const ProductCard = ({
  name, tag, tagline, description,
  image, imageAlt, features,
  video, price, priceUnit, priceMeta,
  ctaHref, ctaLabel,
  colorClass,
}) => (
  <section className={`pc-card ${colorClass}`}>

    <div className="pc-accent-bar" />

    {/* ── 1. HEADER ── */}
    <div className="pc-header">
      <span className="pc-tag">{tag}</span>
      <h2 className="pc-name">{name}</h2>
      <p className="pc-tagline">{tagline}</p>
      <p className="pc-description">{description}</p>
    </div>

    {/* ── 2. BODY: image + features ── */}
    <div className="pc-body">
      <div className="pc-image-wrap">
        <img src={image} alt={imageAlt} className="pc-image" />
      </div>
      <ul className="pc-features">
        {features.map((f, i) => (
          <FeatureItem key={i} label={f.label} detail={f.detail} />
        ))}
      </ul>
    </div>

    {/* ── 3. VIDEO ── */}
    <div className="pc-video-section">
      <p className="pc-video-heading">
        <span>▶</span> See {name} in Action
      </p>
      <VideoPlayer src={video} />
    </div>

    {/* ── 4. FOOTER ── */}
    <div className="pc-footer">
      <div className="pc-footer-left">
        <div className="pc-price-badge">
          <span className="pc-price-amount">{price}</span>
          <span className="pc-price-unit">{priceUnit}</span>
        </div>
        <p className="pc-price-meta">{priceMeta}</p>
      </div>
      <div className="pc-footer-right">
        <a href={ctaHref} className="pc-cta">{ctaLabel} →</a>
      </div>
    </div>

  </section>
);


// Page

const Products = () => (
  <>
    <Header />
    <main className="products-page">

      <div className="products-hero" data-aos="fade-up">
        <p className="products-label">Our Products</p>
        <h1 className="products-heading">
          Purpose-Built Tools for Ongoing Visibility
        </h1>
        <p className="products-sub">
          Continuous visibility and control —
          without needing a full security team to operate them.
        </p>
      </div>

      <div className="products-list">

        <ProductCard
          colorClass="pc-card--cyan"
          name="VisuN"
          tag="Network Security"
          tagline="See Everything on Your Network"
          description="Most breaches start with something invisible: an unknown device, an unusual file movement, an unauthorized connection. VisuN eliminates that blind spot."
          image={visunImg}
          imageAlt="VisuN — Network Visibility"
          features={visunFeatures}
          video={visunVideo}
          price="$1"
          priceUnit="per endpoint / mo"
          priceMeta="30-day data retention · Cancel anytime"
          ctaHref="mailto:products@globalcyberassociate.com?subject=VisuN%20%E2%80%94%20Demo%20Request"
          ctaLabel="Request a VisuN Demo"
        />

        <ProductCard
          colorClass="pc-card--indigo"
          name="VisuN+"
          tag="Workforce Intelligence"
          tagline="Productivity Enhancement Platform"
          description="VisuN+ extends network visibility to people and productivity. Understand how your workforce operates, identify inefficiencies, and surface risk patterns — without becoming Big Brother."
          image={visunPlusImg}
          imageAlt="VisuN+ — Workforce Intelligence"
          features={visunPlusFeatures}
          video={visunPlusVideo}
          price="$2"
          priceUnit="per user / mo"
          priceMeta="30-day data retention · Cancel anytime"
          ctaHref="mailto:products@globalcyberassociate.com?subject=VisuN%2B%20%E2%80%94%20Demo%20Request"
          ctaLabel="Request a VisuN+ Demo"
        />

      </div>

    </main>
    <Footer />
  </>
);

export default Products;
