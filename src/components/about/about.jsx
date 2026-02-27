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
            We built this practice to level the playing field.
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
                  Driving Security Through Equal Access
                </h2>
                <p className="about-section__lead">
                  The biggest cybersecurity risk facing businesses today isn't sophistication — it's assumption. The assumption that "we're too small to be targeted." We exist to fix that.
                </p>
                <p className="about-section__description">
                  Our team brings deep enterprise experience to every engagement — and we deploy it at the scale and price point that actually fits your business. From a founder-led startup to a multi-branch MSME, we meet you where you are and build you up from there.
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
                      <h5>Startup-to-Enterprise Reach</h5>
                      <p>Same rigour, right-sized engagement for where you are today.</p>
                    </div>
                  </div>
                </div>

                <div className="cta-button" onClick={showSolutions}>
                  Explore Our Services
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
