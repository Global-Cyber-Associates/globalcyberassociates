import React from 'react';
import './hero.css';
import image from './img.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {

  // Initialize navigation
  const navigate = useNavigate();
  const showSolutions = () => {
    navigate('/Solutions');
  }


  return (
    <section id="hero" className="hero section">
      <div className="out-container">
        <div className="out-row">

          {/* Textual Content */}
          <div className="col-lg-7 content-col" data-aos="fade-up">
            <div className="content">
              <div className="agency-name">
              </div>
              <h4></h4>
              <div className="eyebrow-tag" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: '0.9rem' }}>
                Democratizing Cybersecurity
              </div>
              <div className="main-heading">
                <h1>
                  Next-Gen Security for Next-Level Business.
                </h1>
              </div>
              <div className="hero-proof-chips">
                <span className="hero-chip">Startup Friendly</span>
                <span className="hero-chip">MSME Focused</span>
                <span className="hero-chip">Enterprise Ready</span>
              </div>

              <div className="divider"></div>

              <div className="description">
                <p>
                  We are a next-generation cybersecurity company helping startups, enterprises, and individuals stay safe in the digital world. Whether it's securing your infrastructure, detecting threats, or training your team — we've got you covered.
                </p>
              </div>

              <div className="cta-group mt-8">
                <div className="cta-item">
                  <div
                    className="cta-button primary cursor-pointer"
                    onClick={() => navigate('/Assessment')}
                  >
                    <span>GET YOUR FREE RISK ASSESSMENT</span>
                  </div>
                  <p className="cta-subtext">No commitment. Know your risk in minutes.</p>
                </div>

                <div className="cta-item">
                  <div className="cta-button secondary" onClick={showSolutions}>
                    <span>EXPLORE SERVICES</span>
                  </div>
                  <p className="cta-subtext">Security Testing · Compliance · Training · SOC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="col-lg-5" data-aos="zoom-out">
            <div className="visual-content">
              <div className="fluid-shape">
                <img src={image} alt="Security Illustration" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
