import React from 'react';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import './service.css';
import FaqSection from './faq/faq.jsx';
import solutionsData from './services.js'; 
import b2 from './b2.jpg';

const ServicePage = () => {
  return (
    <>
      <Header />
        {/* <div className="service-banner">
        <img src={b2} alt="Cybersecurity Services Banner" />
      </div> */}
      <div className="services-page">
        <div className="container">
          <h2 className="section-title">Comprehensive Cybersecurity Solutions</h2>

          {solutionsData.map((categoryBlock, index) => (
            <div className="service-section" key={index}>
              <h3 className="section-subtitle">{categoryBlock.category}</h3>
              <div className="service-grid">
                {categoryBlock.solutions.map((solution, idx) => (
                  <div className="card" key={idx}>
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
