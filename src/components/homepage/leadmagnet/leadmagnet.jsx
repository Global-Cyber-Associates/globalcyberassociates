import React from 'react';
import { useNavigate } from 'react-router-dom';
import './leadmagnet.css';

const LeadMagnet = () => {
  const navigate = useNavigate();

  return (
    <section className="ent-lm-section" data-aos="fade-up">
      <div className="ent-lm-container">
        <div className="ent-lm-card">
          {/* Subtle glowing orb in background */}
          <div className="ent-lm-glow"></div>

          <div className="ent-lm-content">
            <p className="ent-lm-label">Where Do You Stand?</p>
            <h2 className="ent-lm-heading">Don't guess. Know.</h2>
            <p className="ent-lm-body">
              Our <span className="ent-text-white">Free Risk Assessment Tool</span> gives you a clear picture of your organization's security posture — in under 10 minutes. No jargon. No sales pitch. Just honest, actionable intelligence so you know what to fix first.
            </p>
            <button className="ent-lm-cta" onClick={() => navigate('/assessment')}>
              Take The Free Assessment
              <span className="ent-cta-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
