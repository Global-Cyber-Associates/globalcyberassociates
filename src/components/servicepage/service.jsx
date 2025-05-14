import React from 'react';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import './service.css';

const ServicePage = () => {
  return (
    <>
      <Header />
      <div className="services-page">
        <div className="container">
          <h2 className="section-title">Comprehensive Cybersecurity Services</h2>

          {/* Pentesting Services */}
          <section className="service-section">
            <h3 className="section-subtitle">Penetration Testing</h3>
            <div className="service-grid">
              <div className="card">
                <h4>Network Penetration Testing</h4>
                <p>Identify vulnerabilities in LAN/WAN/Wi-Fi setups through simulated attack paths and exploitation.</p>
              </div>
              <div className="card">
                <h4>Application Penetration Testing</h4>
                <p>Test web and mobile applications for logic flaws, authentication bypass, and OWASP vulnerabilities.</p>
              </div>
              <div className="card">
                <h4>Firewall & Perimeter Testing</h4>
                <p>Audit firewall configurations and rule sets to expose misconfigurations and perimeter gaps.</p>
              </div>
              <div className="card">
                <h4>Internal Infrastructure Testing</h4>
                <p>Simulate insider threats and lateral movement scenarios across internal networks and systems.</p>
              </div>
            </div>
          </section>

          {/* Cybersecurity Consulting */}
          <section className="service-section">
            <h3 className="section-subtitle">Cybersecurity Consulting & Staffing</h3>
            <div className="service-grid">
              <div className="card">
                <h4>Security Talent Staffing</h4>
                <p>Hire vetted security professionals for short-term or long-term projects to meet your team's needs.</p>
              </div>
              <div className="card">
                <h4>Vulnerability Assessments</h4>
                <p>Proactively identify security gaps across your IT environment with detailed remediation guidance.</p>
              </div>
              <div className="card">
                <h4>Security Audits</h4>
                <p>Evaluate your organization's cybersecurity posture against industry best practices and benchmarks.</p>
              </div>
              <div className="card">
                <h4>Social Engineering Testing</h4>
                <p>Assess human risk vectors using phishing simulations, baiting, and impersonation exercises.</p>
              </div>
            </div>
          </section>

          {/* Custom Engagements */}
          <section className="service-section">
            <h3 className="section-subtitle">Custom Security Engagements</h3>
            <div className="service-grid">
              <div className="card">
                <h4>Red Team Simulations</h4>
                <p>Full-spectrum attack simulations combining technical, physical, and social vectors for maximum realism.</p>
              </div>
              <div className="card">
                <h4>CTF-Based Employee Training</h4>
                <p>Gamified security awareness and upskilling for employees via custom Capture-The-Flag platforms.</p>
              </div>
              <div className="card">
                <h4>Incident Response Readiness</h4>
                <p>Prepare your teams to respond efficiently to breaches with playbooks, drills, and tabletop exercises.</p>
              </div>
              <div className="card">
                <h4>Custom Assessments</h4>
                <p>Need something unique? We design assessments tailored precisely to your security objectives.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
