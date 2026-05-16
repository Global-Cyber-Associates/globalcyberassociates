import React from 'react';
import './hero.css';
import image from './enterprise-dashboard.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {

  const navigate = useNavigate();
  const showSolutions = () => {
    navigate('/solutions');
  }


  return (
    <section id="hero" className="hero section">
      <div className="out-container">
        <div className="out-row align-items-center">

          <div className="col-lg-7 content-col enterprise-col" data-aos="fade-up">
            <div className="content enterprise-content">

              <div className="eyebrow-tag enterprise-eyebrow">
                <span className="eyebrow-dot"></span>
                Democratizing Cybersecurity
              </div>

              <div className="main-heading">
                <h1 className="enterprise-title">
                  Next-Gen Security <br />
                  <span className="text-gradient">For Next-Level Business.</span>
                </h1>
              </div>

              <div className="description enterprise-desc">
                <p>
                  We are a next-generation cybersecurity company helping startups, enterprises, and individuals stay safe in the digital world. Outsmart threats with AI-driven detection, advanced infrastructure security, and elite team training.
                </p>
              </div>

              <div className="hero-proof-chips enterprise-chips">
                <span className="ent-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Startup Friendly
                </span>
                <span className="ent-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  MSME Focused
                </span>
                <span className="ent-chip">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                  Enterprise Ready
                </span>
              </div>

              <div className="cta-group enterprise-cta-group pt-4">
                <div className="cta-item ent-cta-item">
                  <div
                    className="ent-btn ent-btn-primary cursor-pointer"
                    onClick={() => navigate('/assessment')}
                  >
                    <span>Get Free Risk Assessment</span>
                    <svg className="btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                  <p className="ent-cta-subtext">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    No commitment. Know your risk in minutes.
                  </p>
                </div>

                <div className="cta-item ent-cta-item">
                  <div className="ent-btn ent-btn-secondary cursor-pointer" onClick={showSolutions}>
                    <span>Explore Services</span>
                  </div>
                  <p className="ent-cta-subtext opacity-70">
                    Security Testing · Compliance · SOC
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-5" data-aos="zoom-out" data-aos-delay="200">
            <div className="visual-content enterprise-visual-content">

              {/* Premium Glow Effect behind image */}
              <div className="ent-glow-bg"></div>

              <div className="fluid-shape ent-image-wrapper">
                <img src={image} alt="Security Illustration" className="fluid-img ent-img" />

                <div className="floating-badge badge-top-right">
                  <span className="status-dot"></span>
                  System Protected
                </div>

                <div className="floating-badge badge-bottom-left">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Zero Trust Verified
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
