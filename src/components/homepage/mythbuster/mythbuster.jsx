import React from 'react';
import './mythbuster.css';

const MythBuster = () => {
  return (
    <section className="mythbuster-section" data-aos="fade-up">
      <div className="mythbuster-container">

        <p className="mythbuster-label">The Misconception We're Fixing</p>

        <h2 className="mythbuster-heading">
          <span className="quote-mark">"</span>Cybersecurity is for big companies.<span className="quote-mark">"</span>

          <span className="mythbuster-subheading">
            We hear this every day. It's also the most dangerous myth in business.
          </span>
        </h2>

        <div className="mythbuster-body">
          <p>
            <strong>Ransomware</strong> doesn't check your revenue. <strong>Email phishing</strong> won't ignore your headcount. <strong>Insider threats and data theft</strong> don't wait for an invite. A single leak can end a decade of growth overnight.
          </p>
          <p>
            The truth is — <strong>small and mid-size businesses are the #1 target</strong>, precisely because attackers assume they're unprotected.
          </p>
          <p>
            At GlobalCyberAssociates, we designed our entire practice around one belief: <strong>every organization deserves a security posture that matches the threat they face</strong> — not just the budget they have.
          </p>
        </div>

        <div className="mythbuster-chips">
          <span className="chip">Startup Co-Pilot</span>
          <span className="chip">MSME-Focused</span>
          <span className="chip">Enterprise-Ready</span>
        </div>

      </div>
    </section>
  );
};

export default MythBuster;
