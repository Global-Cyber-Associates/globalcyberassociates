import React from 'react';
import './about.css';
import Head from '../head.jsx';
import office from './team.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AboutSection = () => {

  const navigate = useNavigate();
  const showSolutions = () => {
    navigate('/Solutions');
  }

  return (
    <>
      <Head />
      <section id="about" className="about-section">
        <div className="about-section__title" data-aos="fade-up">
          <h2>About Us</h2>
          <p className="about-section__subtitle">
            Empowering innovation through intelligent solutions.
          </p>
        </div>

        <div className="about-section__content">
          <div className="about-section__row">
            {/* Image Column */}
            <div className="about-section__image-col" data-aos="fade-right" data-aos-delay="200">
              <div className="about-section__image-wrapper">
                <img
                  src={office}
                  alt="About"
                  className="about-section__image"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="about-section__text-col" data-aos="fade-left" data-aos-delay="300">
              <div className="about-section__text">
                <h2 className="about-section__heading">
                  Driving Success Through Digital Excellence
                </h2>
                <p className="about-section__lead">
                  We design smart strategies that solve real problems and power business growth.
                </p>
                <p className="about-section__description">
                  From advanced analytics to creative execution, our team brings clarity and momentum
                  to organizations ready to scale and adapt in a fast-moving world.
                </p>

                <div className="about-section__features">
                  <div className="about-section__feature" data-aos="zoom-in" data-aos-delay="400">
                    <i className="bi bi-people-fill"></i>
                    <div>
                      <h5>Expert Team Collaboration</h5>
                      <p>Work with seasoned professionals dedicated to delivering lasting value.</p>
                    </div>
                  </div>

                  <div className="about-section__feature" data-aos="zoom-in" data-aos-delay="450">
                    <i className="bi bi-rocket-takeoff-fill"></i>
                    <div>
                      <h5>Innovation-First Mindset</h5>
                      <p>We leverage emerging technologies to create forward-thinking solutions.</p>
                    </div>
                  </div>
                </div>

                <div className="cta-button" onClick={showSolutions}>
                  Explore Our Solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default AboutSection;
