import React from 'react';
import { Helmet } from 'react-helmet';
import './products.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import visunImg from '../products/visun-dashboard.png';
import visunPlusImg from '../products/visunplus-dashboard.png';
import visunVideo from '../products/visun-demo.mp4';
import visunPlusVideo from '../products/visun-demo.mp4';

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
        </div>
      )}
    </div>
  );
};

const FeatureItem = ({ label, detail }) => (
  <li className="pf-item">
    <span className="pf-check">✔</span>
    <div className="pf-text">
      <span className="pf-label">{label}</span>
      <span className="pf-detail">{detail}</span>
    </div>
  </li>
);

const visunFeatures = [
  { label: 'Network Visibility', detail: 'Real-time map of every device connected to your environment' },
  { label: 'Rogue Device Alerts', detail: 'Instant notification when an unauthorised device joins your network' },
  { label: 'File Outflow Control', detail: 'Monitor and restrict sensitive data leaving your systems' },
  { label: 'File Integrity Monitoring', detail: 'Know if critical files are modified, moved, or deleted' },
  { label: 'Remote Endpoint Management', detail: 'Manage and secure devices regardless of location' },
];

const visunPlusFeatures = [
  { label: 'Financial Impact & ROI', detail: 'Quantify the cost of downtime, idle time, and compliance gaps in real dollars' },
  { label: 'People & Performance View', detail: 'Per-user activity timelines, output scores, and engagement trends at a glance' },
  { label: 'Idle Time Detection', detail: 'Automatically surface unproductive periods and reclaim billable hours' },
  { label: 'Compliance & Audit Reporting', detail: 'One-click reports built for HR, legal, and management review cycles' },
  { label: 'Workforce Intelligence & Growth Control', detail: 'A unified platform to monitor, analyze, and optimize workforce productivity' },
];

const ProductCard = ({
  name, tag, tagline, description,
  image, imageAlt, features,
  video, thumbnail,
  price, priceUnit, priceMeta,
  ctaHref, ctaLabel,
  colorClass,
}) => (
  <section className={`pc-card ${colorClass}`}>

    <div className="pc-accent-bar" />

    <div className="pc-header">
      <span className="pc-tag">{tag}</span>
      <h2 className="pc-name">{name}</h2>
      <p className="pc-tagline">{tagline}</p>
      <p className="pc-description">{description}</p>
    </div>

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

    <div className="pc-video-section">
      <div className="pc-video-heading">
        <span className="pc-video-heading-line" />
        <span className="pc-video-heading-text">{name} in Action</span>
        <span className="pc-video-heading-line" />
      </div>
      <VideoPlayer src={video} thumbnail={thumbnail} />
    </div>

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

const Products = () => (
  <>
    <Helmet>
      <title>Products | Global Cyber Associates</title>
      <meta name="description" content="Discover VisuN and VisuN+ — purpose-built security tools for network visibility and workforce intelligence without the overhead of a full security operation." />
    </Helmet>
    <Header />
    <main className="products-page">

      <div className="products-hero" data-aos="fade-up">
        <p className="products-label">Our Products</p>
        <h1 className="products-heading">
          See Everything.<br />Secure Everything.
        </h1>
        <p className="products-sub">
          Two purpose-built tools that give your team continuous network visibility
          and workforce intelligence — without the overhead of a full security operation.
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
          thumbnail={visunImg}
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
          thumbnail={visunPlusImg}
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
