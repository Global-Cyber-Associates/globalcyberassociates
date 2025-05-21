import React from "react";
import './footer.css';
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="globalcyber-footer">
      <div className="footer-grid">

        <div className="footer-section">
          <h3>GlobalCyberAssociates</h3>
          <p>Trusted experts in securing digital infrastructure for organizations worldwide.</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/company/globalcyberassociate"
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-button"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={30} color="#0A66C2" />
            </a>
            <a
              href="https://wa.me/934216757" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={30} color="#25D366" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@globalcyberassociate.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GlobalCyberAssociates. All rights reserved.</p>
        <p>Chennai | Hyderabad | New York  </p>

      </div>
    </footer>
  );
};

export default Footer;
