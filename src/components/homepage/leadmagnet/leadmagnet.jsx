import React from 'react';
import { useNavigate } from 'react-router-dom';
import './leadmagnet.css';

const LeadMagnet = () => {
  const navigate = useNavigate();

  return (
    <section className="leadmagnet-section" data-aos="fade-up">
      <div className="leadmagnet-container">

        <p className="leadmagnet-label">Where Do You Stand?</p>

        <h2 className="leadmagnet-heading">Don't guess. Know.</h2>

        <p className="leadmagnet-body">
          Our <strong>Free Risk Assessment Tool</strong> gives you a clear picture of your
          organization's security posture — in under 10 minutes. No jargon. No sales pitch.
          Just honest, actionable intelligence so you know what to fix first.
        </p>

        <div className="leadmagnet-cta" onClick={() => navigate('/Assessment')}>
          TAKE THE FREE ASSESSMENT →
        </div>

      </div>
    </section>
  );
};

export default LeadMagnet;
