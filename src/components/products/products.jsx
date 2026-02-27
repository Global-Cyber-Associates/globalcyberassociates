import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './products.css';
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
  { label: 'Employee Productivity Monitoring', detail: 'Objective data on how time and tools are being used' },
  { label: 'Productivity Improvement Insights', detail: 'Actionable trends to help teams work smarter' },
  { label: 'Policy Compliance Tracking', detail: 'Ensure acceptable use policies are being followed' },
];

const Products = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-in-out' });
  }, []);

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
            Beyond services, we build tools that give you continuous visibility and control —
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
              <p className="product-tag">Product</p>
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
              <a
                href="mailto:products@globalcyberassociate.com?subject=VisuN%20%E2%80%94%20Demo%20Request"
                className="product-cta"
              >
                REQUEST A VISUN DEMO →
              </a>
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
              <p className="product-tag">Product</p>
              <h2 className="product-name">VisuN+</h2>
              <p className="product-tagline">Visibility Into Your Workforce</p>
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
              <a
                href="mailto:products@globalcyberassociate.com?subject=VisuN%2B%20%E2%80%94%20Demo%20Request"
                className="product-cta"
              >
                REQUEST A VISUN+ DEMO →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Products;
