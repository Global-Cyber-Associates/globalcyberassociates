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
        <meta name="description" content="Get in touch with Global Cyber Associates. Reach our teams in North America and India for services enquiries, product demos, and security consultations." />
      </Helmet>
      <Header />
      <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-bg" aria-hidden="true" />
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="contact-hero-content">
          <span className="contact-hero-eyebrow">Get In Touch</span>
          <h1 className="contact-hero-title">Ready to take<br />the first step?</h1>
          <p className="contact-hero-sub">No intake forms. Direct access to the right person.<br />We respond within one business day.</p>
        </div>
      </section>

        <section className="contact-cards-section">
          <div className="contact-cards-grid">

            <div className="email-card" data-aos="fade-up" data-aos-delay="100">
              <div className="email-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="email-card-body">
                <h3>Services Enquiries</h3>
                <p>Security Testing, Compliance, Training &amp; SOC engagements</p>
                <span className="email-address">sales@globalcyberassociates.com</span>
              </div>
              <a href="mailto:sales@globalcyberassociates.com" className="email-btn">
                Send an Email
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="200">
              <div className="email-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div className="email-card-body">
                <h3>Product Demos &amp; Licensing</h3>
                <p>VisuN and VisuN+ trials, pricing, and deployment</p>
                <span className="email-address">products@globalcyberassociates.com</span>
              </div>
              <a href="mailto:products@globalcyberassociates.com" className="email-btn">
                Request a Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="300">
              <div className="email-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div className="email-card-body">
                <h3>North America</h3>
                <p>Charlotte, NC · USA</p>
                <span className="email-address">info@globalcyberassociates.com</span>
              </div>
              <a href="mailto:info@globalcyberassociates.com" className="email-btn">
                Contact US Team
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="400">
              <div className="email-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="email-card-body">
                <h3>India</h3>
                <p>Mylapore, Chennai · Tamil Nadu</p>
                <span className="email-address">info@globalcyberassociates.com</span>
              </div>
              <a href="mailto:info@globalcyberassociates.com" className="email-btn">
                Contact India Team
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>

          </div>

          <div className="address-cards-grid">
            {branchLocations.map((loc) => {
              const query = encodeURIComponent(`${loc.addressLine2}, ${loc.city}, ${loc.state} ${loc.zip}, ${loc.country}`);
              return (
                <div key={loc.title} className="address-card" data-aos="fade-up">
                  <div className="address-card-header">
                    <div className="address-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <h3>{loc.title}</h3>
                  </div>
                  <iframe
                    title={`Map - ${loc.title}`}
                    src={`https://maps.google.com/maps?q=${query}&output=embed&z=15`}
                    className="address-map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <address>
                    <span>{loc.addressLine2}</span>
                    <span>{loc.city}, {loc.state} {loc.zip}</span>
                    <span>{loc.country}</span>
                  </address>
                  <div className="address-card-footer">
                    <a href={`mailto:${loc.email}`} className="address-email">{loc.email}</a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-btn"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="contact-footer-anchor">
            Or start with no commitment —{' '}
            <a href="/assessment">Take the Free Risk Assessment →</a>
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
