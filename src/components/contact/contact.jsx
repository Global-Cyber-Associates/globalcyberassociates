import React from 'react';
import './contact.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import branchLocations from './address.js';
import ModalExample from '../modal/pop.jsx';
import { useState } from 'react';

const ContactPage = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

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
          <div className="left-section">
            <div className="contact-box">
              <h2>Send Us a Message</h2>
              <form>
                <div className="form-row">
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="Email" />
                </div>
                <div className="form-row">
                  <input type="text" placeholder="Phone Number" />
                  <input type="text" placeholder="Company Name" />
                </div>
                <input type="text" placeholder="Subject" />
                <textarea rows="5" placeholder="Your Message" ></textarea>
                <button type="submit" onClick={handleSubmit} >Submit</button>
              </form>

              <ModalExample
                visible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Apologies" 
                message="We are currently unable to process your request. Kindly reach out to us at info@globalcyberassociate.com for further assistance" 
              />
            </div>
          </div>

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
