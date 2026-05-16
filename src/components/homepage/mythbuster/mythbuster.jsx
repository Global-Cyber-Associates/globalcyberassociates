import React from 'react';
import './mythbuster.css';

const MythBuster = () => {
  return (
    <section className="ent-myth-section" data-aos="fade-up">
      <div className="ent-myth-container">

        <div className="ent-myth-card">
          <p className="ent-myth-label">The Misconception We're Fixing</p>
          <div className="ent-quote-bg-icon">"</div>

          <div className="ent-myth-content">
            <h2 className="ent-myth-heading">
              Cybersecurity is for big companies.
              <span className="ent-myth-subheading">
                We hear this every day. It's also the most dangerous myth in business.
              </span>
            </h2>

            <div className="ent-myth-body">
              <p>
                <span className="text-highlight">Ransomware</span> doesn't check your revenue. <span className="text-highlight">Email phishing</span> won't ignore your headcount. <span className="text-highlight">Insider threats and data theft</span> don't wait for an invite. A single leak can end a decade of growth overnight.
              </p>
              <p>
                The truth is — <span className="text-highlight text-cyan">small and mid-size businesses are the #1 target</span>, precisely because attackers assume they're unprotected.
              </p>
              <p>
                At GlobalCyberAssociates, we designed our entire practice around one belief: <strong className="text-white">every organization deserves a security posture that matches the threat they face</strong> — not just the budget they have.
              </p>
            </div>

            <div className="ent-myth-badges">
              <span className="ent-badge">Startup Co-Pilot</span>
              <span className="ent-badge">MSME-Focused</span>
              <span className="ent-badge">Enterprise-Ready</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MythBuster;
