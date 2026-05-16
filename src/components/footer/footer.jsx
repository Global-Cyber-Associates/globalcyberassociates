import { Link } from "react-router-dom";
import React from "react";
import './footer.css';
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="globalcyber-footer">
      <div className="footer-grid">

        <div className="footer-section">
          <h3>GlobalCyberAssociates</h3>
          <p className="footer-mission">Democratizing Cybersecurity</p>
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
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://wa.me/+919342167657" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={28} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/refund">Refund Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@globalcyberassociates.com</p>
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
