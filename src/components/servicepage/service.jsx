import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Cybersecurity Services — VAPT, Compliance, SOC &amp; Training | Global Cyber Associates</title>
        <meta name="description" content="Comprehensive cybersecurity services including VAPT, Compliance Audits, SOC Operations, and Corporate Training tailored to your threat landscape." />
        <meta name="keywords" content="cybersecurity services, VAPT services, penetration testing services, vulnerability assessment, compliance audit, ISO 27001, SOC 2 audit, SOC operations, security monitoring, cybersecurity training, security consulting, network security, web application security, cloud security audit, incident response, managed security services India" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.globalcyberassociates.com/solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cybersecurity Services — VAPT, Compliance, SOC &amp; Training | GCA" />
        <meta property="og:description" content="Comprehensive cybersecurity services including VAPT, Compliance Audits, SOC Operations, and Corporate Training tailored to your threat landscape." />
        <meta property="og:url" content="https://www.globalcyberassociates.com/solutions" />
        <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cybersecurity Services — VAPT, Compliance, SOC &amp; Training | GCA" />
        <meta name="twitter:description" content="Comprehensive cybersecurity services including VAPT, Compliance Audits, SOC Operations, and Corporate Training tailored to your threat landscape." />
        <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Cybersecurity Services",
          itemListElement: [
            "Vulnerability Assessment & Penetration Testing (VAPT)",
            "Compliance Audits (ISO 27001, SOC 2, GDPR)",
            "SOC Operations & 24/7 Security Monitoring",
            "Corporate Security Training",
          ].map((name, i) => ({
            "@type": "Service",
            position: i + 1,
            name,
            provider: { "@type": "Organization", name: "Global Cyber Associates", url: "https://www.globalcyberassociates.com/" },
            areaServed: ["IN", "US"],
          })),
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.globalcyberassociates.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://www.globalcyberassociates.com/solutions" }
          ]
        })}</script>
      </Helmet>
      <Header />
      <div className="services-page">
        <div className="container">

          <div className="ent-services-header">
            <p className="ent-services-eyebrow">What We Do</p>
            <h1 className="ent-services-title">Our Services</h1>
            <p className="ent-services-sub">
              Comprehensive cybersecurity engineering tailored to your threat landscape.
            </p>
          </div>

          <div className="ent-bento-grid">
            {core.map((service, index) => (
              <div className="ent-bento-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>

                <div className="ent-bento-icon-box">
                  <i className={`bi ${service.icon}`}></i>
                </div>

                <div className="ent-bento-content">
                  <h3 className="ent-bento-title">{service.title}</h3>
                  <p className="ent-bento-desc">{service.shortDescription}</p>
                </div>

                <div className="ent-bento-tags">
                  {service.tags.map((tag, t) => (
                    <span className="ent-bento-tag" key={t}>{tag}</span>
                  ))}
                </div>

                <a className="ent-bento-cta" href="#whats-included">
                  See what's included <span className="ent-arrow">&rarr;</span>
                </a>
              </div>
            ))}
          </div>

          <div className="ent-breakdown-header" id="whats-included">
            <p className="ent-breakdown-eyebrow">Service Breakdown</p>
            <h2 className="ent-breakdown-title">What's Included</h2>
            <p className="ent-breakdown-sub">A detailed look at every deliverable across our four core practice areas.</p>
          </div>

          {solutionsData.map((categoryBlock, index) => (
            <div className="service-section" key={index}>
              <div className="ent-category-header">
                <div className="ent-category-icon-box">
                  <i className={`bi ${categoryBlock.categoryIcon}`}></i>
                </div>
                <h3 className="ent-category-title">{categoryBlock.category}</h3>
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
