import React from 'react';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import './service.css';
import FaqSection from './faq/faq.jsx';
import solutionsData from './services.js';
import core from '../homepage/service.js';
import PricingCalculator from '../pricing/PricingCalculator.jsx';

const ServicePage = () => {
  return (
    <>
      <Header />
      <div className="services-page">
        <div className="container">

          {/* Service Overview — 4 pillars */}
          <p className="services-eyebrow">What We Do</p>
          <h2 className="section-title">Our Services</h2>

          <div className="image-tag-grid">
            {core.map((service, index) => (
              <div className="image-tag-card" key={index} data-aos="fade-up" data-aos-delay={index * 80}>
                <img src={service.image} alt={service.title} className="image-tag-img" />
                <div className="image-tag-body">
                  <div className="tag-chips">
                    {service.tags.map((tag, t) => (
                      <span className="tag-chip" key={t}>{tag}</span>
                    ))}
                  </div>
                  <h3 className="image-tag-title">{service.title}</h3>
                  <p className="image-tag-short">{service.shortDescription}</p>
                  <a className="icon-card-cta" href="#whats-included">See what's included &rarr;</a>
                </div>
              </div>
            ))}
          </div>


          {/* Detailed Breakdown */}
          <div className="services-detail-header" id="whats-included">
            <h2 className="section-title">What's Included</h2>
          </div>

          {solutionsData.map((categoryBlock, index) => (
            <div className="service-section" key={index}>
              <div className="category-header">
                <i className={`bi ${categoryBlock.categoryIcon} category-header-icon`}></i>
                <h3 className="section-subtitle">{categoryBlock.category}</h3>
              </div>
              <div className="service-grid">
                {categoryBlock.solutions.map((solution, idx) => (
                  <div className="solution-card" key={idx}>
                    <i className={`bi ${solution.icon} solution-card-icon`}></i>
                    <div>
                      <h4 className="solution-card-title">{solution.title}</h4>
                      <p className="solution-card-desc">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
        <PricingCalculator />
        <FaqSection />
      </div>
      <Footer />
    </>
  );
};

export default ServicePage;
