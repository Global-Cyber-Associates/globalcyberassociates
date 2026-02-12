import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './careers.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import careers from './careers.js';
import { useNavigate } from 'react-router-dom';

const CareersPage = () => {
  // Initialize navigation
  const navigate = useNavigate();
  const showAbout = () => {
    navigate('/About');
  }

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Header />
      <main className="careers-page">
        {/* Hero Section */}
        <section className="careers-hero" data-aos="fade-up">
          <div className="careers-container">
            <h1>Join Our Team</h1>
            <p>
              We're on a mission to build a safer digital world. Help shape the future of cybersecurity with us.
            </p>
          </div>
        </section>

        {/* Job Openings */}
        <section className="careers-jobs" data-aos="fade-up">
          <div className="careers-container">
            <h2>Current Job Openings</h2>
            <div className="careers-job-list">
              {careers.map((job, index) => (
                <div
                  className="careers-job-card"
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3>{job.title}</h3>
                  <div className="careers-job-meta">
                    {job.location} | {job.type}
                  </div>
                  <p className="careers-job-desc">{job.description}</p>
                  <a href={job.applyLink} className="careers-btn">
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="careers-why" data-aos="fade-up">
          <div className="careers-container">
            <h2>Why Join Us?</h2>
            <p>We foster innovation and personal growth, and empower our team to lead change in cybersecurity.</p>
            <ul className="careers-reasons">
              <li data-aos="fade-left" data-aos-delay="100">Competitive salary & benefits</li>
              <li data-aos="fade-left" data-aos-delay="200">Access to advanced security labs & tools</li>
              <li data-aos="fade-left" data-aos-delay="300">Inclusive, high-performance culture</li>
              <li data-aos="fade-left" data-aos-delay="400">Career growth and skill development</li>
            </ul>
          </div>
        </section>

        {/* Culture Section */}
        <section className="careers-culture" data-aos="zoom-in-up">
          <div className="careers-container">
            <h2>Our Culture</h2>
            <p>
              Innovation, inclusion, and impact define who we are. We believe in solving tough challenges together.
            </p>
            <div className="cta-button" onClick={showAbout}>
              <span>Learn More About Our Culture</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
