import React from 'react';
import { Helmet } from 'react-helmet-async';
import './contact.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import branchLocations from './address.js';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Global Cyber Associates</title>
        <meta name="description" content="Get in touch with Global Cyber Associates. One point of contact for all enquiries — ram@globalcyberassociates.com or WhatsApp +91 89398 51788. We respond within one business day." />
        <meta name="keywords" content="contact cybersecurity company, cybersecurity company Chennai contact, cybersecurity support, cybersecurity consultation, get cybersecurity quote, cybersecurity company USA contact" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.globalcyberassociates.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | Global Cyber Associates" />
        <meta property="og:description" content="Get in touch with Global Cyber Associates. One point of contact for all enquiries — ram@globalcyberassociates.com. We respond within one business day." />
        <meta property="og:url" content="https://www.globalcyberassociates.com/contact" />
        <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Global Cyber Associates" />
        <meta name="twitter:description" content="Get in touch with Global Cyber Associates. One point of contact for all enquiries — ram@globalcyberassociates.com." />
        <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
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
                <a href="mailto:ram@globalcyberassociates.com" className="contact-email-address">
                  ram@globalcyberassociates.com
                </a>
              </div>
              <a href="mailto:ram@globalcyberassociates.com" className="contact-email-btn">
                Send an Email
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <div className="contact-email-card">
              <div className="contact-email-icon" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#25d366' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>
                </svg>
              </div>
              <div className="contact-email-body">
                <h2 className="contact-email-title">Chat on WhatsApp</h2>
                <p className="contact-email-sub">
                  Need a quick answer? Message us directly — fastest response during business hours.
                </p>
                <a href="https://wa.me/918939851788" target="_blank" rel="noopener noreferrer" className="contact-email-address">
                  +91 89398 51788
                </a>
              </div>
              <a href="https://wa.me/918939851788" target="_blank" rel="noopener noreferrer" className="contact-email-btn" style={{ background: '#25d366' }}>
                Open WhatsApp
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
