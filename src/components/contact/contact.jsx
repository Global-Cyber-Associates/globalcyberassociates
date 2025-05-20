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
            <h1>Let's Build the Future Together</h1>
            <p>"Innovation, Integrity, and Impact — it's not just our mission, it's our culture."</p>
          </div>
        </section>

        <section className="main-section">
          {/* Left section: Form */}
        {/* Left section: Embedded Microsoft Form */}
<div className="left-section">
  <div className="contact-box">
    <h2>Send Us a Message</h2>
    <iframe
      src="https://forms.office.com/r/DukGVdvtiJ?embed=true"
      className='micro-forms'
      width="100%"
      height="700px"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Contact Form"
      allowFullScreen
    >
      Loading…
    </iframe>
  </div>
</div>

          {/* Right section: Branches */}
          <div className="right-section">
            {branchLocations.slice(0, 3).map((branch, index) => (
              <div key={index} className="branch-container">
                <div className="info-card">
                  <h3>{branch.title}</h3>
                  <p>
                    {branch.addressLine1} {branch.addressLine2},<br />
                    {branch.city}, {branch.state} - {branch.zip},<br />
                    {branch.country} <br />
                    Email: {branch.email}
                  </p>
                </div>

                <div className="branch-map">
                  <iframe
                    title={`Map-${index}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                      `${branch.addressLine1}, ${branch.city}, ${branch.state}`
                    )}&output=embed`}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
