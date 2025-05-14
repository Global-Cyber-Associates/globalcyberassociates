import React from 'react';
import './contact.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';

const ContactPage = () => {
  return (
    <>
      <Header />
      <div className="contact-page">

        {/* Hero Banner */}
        <section className="banner">
          <img src="/images/contact-banner.jpg" alt="Corporate Banner" className="banner-image" />
          <div className="banner-text">
            <h1>Let's Build the Future Together</h1>
            <p>"Innovation, Integrity, and Impact — it's not just our mission, it's our culture."</p>
          </div>
        </section>

        {/* Contact & Offices */}
        <section className="contact-wrapper">

          {/* Contact Form */}
          <div className="form-card">
            <h2>Send Us a Message</h2>
            <form className="contact-form">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>

          {/* Branch Offices */}
          <div className="office-locations">
            <div className="office-card">
              <h3>Branch - South</h3>
              <p>456 Tech Park, Silicon Valley, IN 600002</p>
              <p>Email: south@globalcyberassociates.com</p>
              <p>Phone: +91 000000001</p>
            </div>

            <div className="office-card">
              <h3>Branch - West</h3>
              <p>789 Innovation Street, West City, IN 600003</p>
              <p>Email: west@globalcyberassociates.com</p>
              <p>Phone: +91 000000002</p>
            </div>
          </div>
        </section>

        {/* Our Culture */}
        <section className="culture-section">
          <h2>Our Culture</h2>
          <div className="culture-cards">
            <div className="culture-card">
              <h3>Innovation First</h3>
              <p>We push boundaries with every solution we design and every product we build.</p>
            </div>
            <div className="culture-card">
              <h3>People-Centric</h3>
              <p>Our strength lies in our people — collaboration, learning, and well-being are key.</p>
            </div>
            <div className="culture-card">
              <h3>Global Vision</h3>
              <p>We think globally and act locally, blending international excellence with cultural awareness.</p>
            </div>
          </div>
        </section>

        <Footer />

      </div>
    </>
  );
};

export default ContactPage;
