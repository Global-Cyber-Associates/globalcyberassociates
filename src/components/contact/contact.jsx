import React from 'react';
import './contact.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import branchLocations from './address.js';

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="contact-page">
        <section className="hero">
          <img src="https://t4.ftcdn.net/jpg/05/24/03/99/360_F_524039911_SJfffOLKTk1HZvTPyF9vv1FN6oCipyVi.jpg" alt="Contact Banner" />
          <div className="hero-content">
            <h1>Ready to take the first step?</h1>
            <p>No intake forms. Direct access to the right person. We respond within one business day.</p>
          </div>
        </section>

        <section className="contact-cards-section">
          <div className="contact-cards-grid">

            <div className="email-card" data-aos="fade-up" data-aos-delay="100">
              <h3>Services Enquiries</h3>
              <p>For Security Testing, Compliance, Training, and SOC engagements</p>
              <span className="email-address">sales@globalcyberassociate.com</span>
              <a href="mailto:sales@globalcyberassociate.com" className="email-btn">Send an Email</a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="200">
              <h3>Product Demos &amp; Licensing</h3>
              <p>For VisuN and VisuN+ trials, pricing, and deployment</p>
              <span className="email-address">products@<wbr></wbr>globalcyberassociate.com</span>
              <a href="mailto:products@globalcyberassociate.com" className="email-btn">Request a Demo</a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="300">
              <h3>North America</h3>
              <p>Charlotte, NC · USA</p>
              <span className="email-address">info@globalcyberassociate.com</span>
              <a href="mailto:info@globalcyberassociate.com" className="email-btn">Contact US Team</a>
            </div>

            <div className="email-card" data-aos="fade-up" data-aos-delay="400">
              <h3>India</h3>
              <p>Mylapore, Chennai · Tamil Nadu</p>
              <span className="email-address">info@globalcyberassociates.com</span>
              <a href="mailto:info@globalcyberassociates.com" className="email-btn">Contact India Team</a>
            </div>

          </div>

          <div className="address-cards-grid">
            {branchLocations.map((loc) => {
              const query = encodeURIComponent(`${loc.addressLine2}, ${loc.city}, ${loc.state} ${loc.zip}, ${loc.country}`);
              return (
                <div key={loc.title} className="address-card" data-aos="fade-up">
                  <h3>{loc.title}</h3>
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
            <a href="/Assessment">Take the Free Risk Assessment →</a>
          </p>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
