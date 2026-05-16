import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './careers.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import careers from './careers.js';

const culturePoints = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Flexible Work",
    desc: "Hybrid-first culture built around your best work hours, not a clock."
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: "Skill Development",
    desc: "Annual learning budgets, cert reimbursements, and internal training labs."
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Elite Team",
    desc: "Work alongside top-tier security researchers, engineers, and strategists."
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Real Impact",
    desc: "Your work directly protects enterprises from real-world threats every day."
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Competitive Pay",
    desc: "Top-of-market salaries, performance bonuses, and equity opportunities."
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Advanced Labs",
    desc: "Access to cutting-edge security tooling, sandboxes, and research infrastructure."
  },
];

const CareersPage = () => {
  const [hoveredJob, setHoveredJob] = useState(null);

  return (
    <>
      <Helmet>
        <title>Careers | Global Cyber Associates</title>
        <meta name="description" content="Join the Global Cyber Associates team. Explore open roles in cybersecurity, penetration testing, SOC operations, and more." />
      </Helmet>
      <Header />
      <main className="cp-page">

        <div className="cp-page-header">
          <span className="cp-eyebrow">We're Hiring</span>
          <h1 className="cp-page-title">Join Our Team</h1>
          <p className="cp-page-sub">
            We're a team of security professionals on a mission to protect the digital
            infrastructure that businesses depend on. If that excites you, read on.
          </p>
        </div>

        <section className="cp-culture">
          <div className="cp-container">
            <div className="cp-section-label">
              <span className="cp-section-tag">Our Culture</span>
              <h2 className="cp-section-title">A place where your work matters</h2>
              <p className="cp-section-sub">
                We invest in the people who make tough security challenges solvable.
              </p>
            </div>
            <div className="cp-culture-grid">
              {culturePoints.map((point, i) => (
                <div className="cp-culture-card" key={i}>
                  <div className="cp-culture-icon">{point.icon}</div>
                  <h3 className="cp-culture-title">{point.title}</h3>
                  <p className="cp-culture-desc">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cp-openings" id="openings">
          <div className="cp-container">
            <div className="cp-section-label">
              <span className="cp-section-tag">Open Positions</span>
              <h2 className="cp-section-title">Current Openings</h2>
              <p className="cp-section-sub">
                Find the role where you'll make the biggest impact.
              </p>
            </div>

            <div className="cp-jobs-list">
              {careers.map((job, i) => (
                <div
                  className={`cp-job-card${hoveredJob === i ? ' cp-job-card--hovered' : ''}`}
                  key={i}
                  onMouseEnter={() => setHoveredJob(i)}
                  onMouseLeave={() => setHoveredJob(null)}
                >
                  <div className="cp-job-left">
                    <div className="cp-job-header">
                      <h3 className="cp-job-title">{job.title}</h3>
                      <div className="cp-job-tags">
                        <span className="cp-tag cp-tag--location">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {job.location}
                        </span>
                        <span className="cp-tag cp-tag--type">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <p className="cp-job-desc">{job.description}</p>
                  </div>
                  <div className="cp-job-right">
                    <a href={job.applyLink} className="cp-apply-btn" target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="cp-no-role">
              <p>Don't see a fit?</p>
              <a href="mailto:info@globalcyberassociates.com" className="cp-link">
                Send us your CV anyway →
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
