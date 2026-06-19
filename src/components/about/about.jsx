import React from 'react';
import { Helmet } from 'react-helmet-async';
import './about.css';
import Head from '../head.jsx';
import Footer from '../footer/footer.jsx';
import office from './team2.jpg';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: '50+', label: 'Businesses Protected' },
  { value: '24/7', label: 'Monitoring & Response' },
  { value: '2', label: 'Proprietary Products' },
];

const features = [
  {
    title: 'Expert Team Collaboration',
    detail: 'Work with seasoned professionals dedicated to delivering lasting value.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Startup-to-Enterprise Reach',
    detail: 'Same rigour, right-sized engagement for where you are today.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us | Global Cyber Associates</title>
        <meta name="description" content="Built by defenders, for every business. Learn about Global Cyber Associates — our mission, team, and approach to enterprise-grade cybersecurity." />
        <meta name="keywords" content="about Global Cyber Associates, cybersecurity company, cybersecurity experts, security team, cybersecurity firm India, enterprise security provider, cybersecurity mission, trusted cybersecurity partner" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.globalcyberassociates.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us | Global Cyber Associates" />
        <meta property="og:description" content="Built by defenders, for every business. Learn about Global Cyber Associates — our mission, team, and approach to enterprise-grade cybersecurity." />
        <meta property="og:url" content="https://www.globalcyberassociates.com/about" />
        <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Global Cyber Associates" />
        <meta name="twitter:description" content="Built by defenders, for every business. Learn about Global Cyber Associates — our mission, team, and approach to enterprise-grade cybersecurity." />
        <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.globalcyberassociates.com/" },
            { "@type": "ListItem", position: 2, name: "About", item: "https://www.globalcyberassociates.com/about" }
          ]
        })}</script>
      </Helmet>
      <Head />
      <main className="about-page">

        <div className="about-hero" data-aos="fade-up">
          <p className="about-label">Who We Are</p>
          <h1 className="about-heading">
            Built by Defenders.<br />For Every Business.
          </h1>
          <p className="about-sub">
            We built this practice to level the playing field.
          </p>
        </div>

        <div className="about-stats-bar" data-aos="fade-up" data-aos-delay="100">
          {stats.map((s, i) => (
            <div key={i} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="about-content-wrap">
          <div className="about-grid">

            <div className="about-image-col" data-aos="fade-right" data-aos-delay="150">
              <div className="about-image-wrap">
                <img
                  src={office}
                  alt="Global Cyber Associates cybersecurity team collaborating in office"
                  className="about-image"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-image-badge">
                  <span className="about-badge-dot" />
                  Actively Protecting Clients
                </div>
              </div>
            </div>

            <div className="about-text-col" data-aos="fade-left" data-aos-delay="200">
              <h2 className="about-section-title">
                Driving Security Through Equal Access
              </h2>

              <p className="about-lead">
                The biggest cybersecurity risk facing businesses today isn't sophistication
                — it's assumption. The assumption that "we're too small to be targeted."
                We exist to fix that.
              </p>

              <p className="about-body">
                Our team brings deep enterprise experience to every engagement — and we
                deploy it at the scale and price point that actually fits your business.
                From a founder-led startup to a multi-branch MSME, we meet you where you
                are and build you up from there.
              </p>

              <div className="about-features">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="about-feature-card"
                    data-aos="fade-up"
                    data-aos-delay={300 + i * 70}
                  >
                    <div className="about-feature-icon">{f.icon}</div>
                    <div className="about-feature-text">
                      <h3 className="about-feature-title">{f.title}</h3>
                      <p className="about-feature-detail">{f.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                id="about-explore-btn"
                className="about-cta-btn"
                onClick={() => navigate('/solutions')}
              >
                Explore Our Services
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  width="16" height="16">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
};

export default AboutSection;
