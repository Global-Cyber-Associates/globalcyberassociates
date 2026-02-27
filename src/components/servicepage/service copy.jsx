import React from 'react';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import './service.css';
import FaqSection from './faq/faq.jsx';
import solutionsData from './services.js';
import core from '../homepage/service.js';

const ServicePage = () => {
  return (
    <>
      <Header />
      <div className="services-page">
        <div className="container">

          {/* Service Overview — 4 pillars with imagery */}
          <p className="services-eyebrow">What We Do</p>
          <h2 className="section-title">Our Services</h2>
          <div className="service-overview-grid">
            {core.map((service, index) => (
              <div className="overview-card" key={index} data-aos="fade-up" data-aos-delay={index * 80}>
                <img src={service.image} alt={service.title} className="overview-card-img" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed Breakdown */}
          <div className="services-detail-header">
            <h2 className="section-title">What's Included</h2>
          </div>

          {solutionsData.map((categoryBlock, index) => (
            <div className="service-section" key={index}>
              <h3 className="section-subtitle">{categoryBlock.category}</h3>
              <div className="service-grid">
                {categoryBlock.solutions.map((solution, idx) => (
                  <div className="card card-bg" key={idx}>
                    <h4>{solution.title}</h4>
                    <p>{solution.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        <FaqSection />
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
