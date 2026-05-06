import React from 'react';
import { Helmet } from 'react-helmet';
import './contact.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import branchLocations from './address.js';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Global Cyber Associates</title>
        <meta name="description" content="Get in touch with Global Cyber Associates. One point of contact for all enquiries — info@globalcyberassociates.com." />
      </Helmet>
      <Header />
      <div className="contact-page">

        <section className="contact-hero">
          <div className="contact-hero-bg" aria-hidden="true" />
          <div className="contact-hero-grid" aria-hidden="true" />
          <div className="contact-hero-content">
            <span className="contact-hero-eyebrow">Get In Touch</span>
            <h1 className="contact-hero-title">We'd love to<br />hear from you</h1>
            <p className="contact-hero-sub">
              No intake forms. Direct access to the right person.<br />
              We respond within one business day.
            </p>
          </div>
        </section>

        <section className="contact-main-section">
          <div className="contact-inner">

            <div className="contact-email-card">
              <div className="contact-email-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-email-body">
                <h2 className="contact-email-title">Contact Us</h2>
                <p className="contact-email-sub">
                  For all enquiries — services, products, partnerships, and general questions.
                </p>
                <a href="mailto:info@globalcyberassociates.com" className="contact-email-address">
                  info@globalcyberassociates.com
                </a>
              </div>
              <a href="mailto:info@globalcyberassociates.com" className="contact-email-btn">
                Send an Email
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <div className="contact-section-divider">
              <span className="contact-divider-line" />
              <span className="contact-divider-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Our Offices
              </span>
              <span className="contact-divider-line" />
            </div>

            <div className="contact-offices-block">
              <p className="contact-offices-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                Global Offices
              </p>
              <div className="contact-offices-grid">
                {branchLocations.map((loc) => {
                  const query = encodeURIComponent(
                    `${loc.addressLine2}, ${loc.city}, ${loc.state} ${loc.zip}, ${loc.country}`
                  );
                  return (
                    <div key={loc.title} className="contact-office-card">
                      <div className="contact-office-header">
                        <div className="contact-office-flag">
                          {loc.country === 'India' ? '🇮🇳' : '🇺🇸'}
                        </div>
                        <div>
                          <h3 className="contact-office-title">{loc.title}</h3>
                          <p className="contact-office-region">
                            {loc.city}, {loc.state} · {loc.country}
                          </p>
                        </div>
                      </div>
                      <iframe
                        title={`Map — ${loc.title}`}
                        src={`https://maps.google.com/maps?q=${query}&output=embed&z=15`}
                        className="contact-office-map"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <address className="contact-office-address">
                        {loc.addressLine2}<br />
                        {loc.city}, {loc.state} {loc.zip}<br />
                        {loc.country}
                      </address>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-directions-btn"
                      >
                        Get Directions →
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
