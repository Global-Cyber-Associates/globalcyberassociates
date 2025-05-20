import React from 'react';
import './hero.css'; // Make sure to style it
import image from './img.png';


const HeroSection = () => {
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
              <div className="main-heading">
                <h1>
                  Next-Gen Security for Next-Level Business.
                </h1>
              </div>

              <div className="divider"></div>

              <div className="description">
                <p>
We are a next-generation cybersecurity company helping startups, enterprises, and individuals stay safe in the digital world. Whether it's securing your infrastructure, detecting threats, or training your team — we've got you covered.

                </p>
              </div>

              <div className="cta-button">
                <a href="/Solutions">
                  <span>EXPLORE SOLUTIONS</span>
                </a>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="col-lg-5" data-aos="zoom-out">
            <div className="visual-content">
              <div className="fluid-shape">
                <img src={image} />
              </div>

              {/* <div className="stats-card">
                <div className="stats-number">
                  <h2>0</h2>
                </div>
                <div className="stats-label">
                  <p>Successful Campaigns</p>
                </div>
                <div className="stats-arrow">
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
