import React from "react";
import './footer.css';
import { FaLinkedin, FaTwitter, FaGithub  } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">

        {/* Company Info */}
        <div className="footer-section">
          <h3>GlobalCyberAssociates</h3>
          <p>Your trusted cybersecurity partner in safeguarding digital infrastructure.</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>info@globalcyberassociates.com</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} GlobalCyberAssociates. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
