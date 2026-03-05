import React from 'react';
import './products.css';
import '../pricing/pricing.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import visunImg from '../homepage/vuln.png';
import visunPlusImg from '../homepage/staff.png';

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

        {/* VisuN */}
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

        {/* VisuN+ */}
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
