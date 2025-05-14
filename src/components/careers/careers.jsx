import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './careers.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import careers from './careers.js';  

const CareersPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Header />
      <main className="careers-page">
        {/* Hero */}
        <section className="careers-hero" data-aos="fade-up">
          <h1>Join Our Team</h1>
          <p>We're on a mission to build a safer digital world. Help shape the future of cybersecurity with us.</p>
        </section>

        {/* Job Openings */}
        <section className="careers-listings" data-aos="fade-up">
          <h2>Current Job Openings</h2>
          <div className="jobs-table">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((job, index) => (
                  <tr className="job-card" key={index} data-aos="fade-right" data-aos-delay={index * 100}>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>{job.type}</td>
                    <td>{job.description}</td>
                    <td><a href={job.applyLink} className="cta-button">Apply Now</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="why-join-us" data-aos="fade-up">
          <h2>Why Join Us?</h2>
          <p>We foster innovation and personal growth, and we empower our team to lead change in the cybersecurity space.</p>
          <div className="reasons">
            <ul>
              <li data-aos="fade-left" data-aos-delay="100">Competitive salary & benefits</li>
              <li data-aos="fade-left" data-aos-delay="200">Access to advanced security labs & tools</li>
              <li data-aos="fade-left" data-aos-delay="300">Inclusive, high-performance culture</li>
              <li data-aos="fade-left" data-aos-delay="400">Career growth and skill development</li>
            </ul>
          </div>
        </section>

        {/* Culture */}
        <section className="culture" data-aos="zoom-in-up">
          <h2>Our Culture</h2>
          <p>Innovation, inclusion, and impact define who we are. We believe in solving tough challenges together.</p>
          <div className="cta-container">
            <a href="/culture" className="cta-button">Learn More About Our Culture</a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default CareersPage;
