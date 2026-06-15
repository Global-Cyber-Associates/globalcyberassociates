import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../head.jsx";
import Footer from "../footer/footer.jsx";
import TestimonialSection from "../testimonials/testimonials.jsx";
import "./home.css";
import ClientsSection from "../clients/clients.jsx";
import LinkedInPostCard from "../posts/post.jsx";
import Hero from "./hero/hero.jsx";
import AboutSection from "../about/about.jsx";
import Features from "../4phases/phases.jsx";
import MythBuster from "./mythbuster/mythbuster.jsx";
import LeadMagnet from "./leadmagnet/leadmagnet.jsx";

const SITE_URL = "https://www.globalcyberassociates.com";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Global Cyber Associates",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@globalcyberassociates.com",
    contactType: "customer support"
  },
  sameAs: []
};

const Home = () => {

  return (
    <>
      <Helmet>
        <title>Cybersecurity Services for Startups &amp; MSMEs | Global Cyber Associates</title>
        <meta name="description" content="Global Cyber Associates delivers enterprise-grade cybersecurity — VAPT, compliance, SOC, and training — right-sized for startups and MSMEs. Get your free risk assessment today." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cybersecurity Services for Startups &amp; MSMEs | Global Cyber Associates" />
        <meta property="og:description" content="Enterprise-grade cybersecurity right-sized for your business. VAPT, compliance audits, SOC operations, and team training." />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cybersecurity Services for Startups &amp; MSMEs | GCA" />
        <meta name="twitter:description" content="Enterprise-grade cybersecurity right-sized for your business. VAPT, compliance audits, SOC operations, and team training." />
        <meta name="twitter:image" content={`${SITE_URL}/logo.png`} />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      <Header />

      <main>

        <Hero />
        <TestimonialSection />
        <Features />
        <MythBuster />
        <LeadMagnet />

        <section className="ent-why-us-section">
          <div className="ent-why-us-container">
            <div className="ent-why-us-header" data-aos="fade-right">
              <h2 className="ent-why-title">
                Built on <span className="text-cyan">Honesty.</span><br />
                Measured by <span className="text-white">Outcomes.</span>
              </h2>
              <p className="ent-why-subtitle">
                We don't sell fear. We deliver engineered resilience. Here is exactly how we execute our engagements differently from legacy providers.
              </p>
            </div>

            <div className="ent-why-us-list">
              {[
                "Realistic testing based on current attacker tactics — not checkbox audits",
                "Business-focused remediation guidance, not just raw findings",
                "Independent and confidential assessments — your data stays yours",
                "Flexible engagements — from a lean startup to a multi-site enterprise",
                "Transparent reporting with clear, prioritised next steps"
              ].map((text, idx) => (
                <div className="ent-why-item" key={idx} data-aos="fade-up" data-aos-delay={idx * 100}>
                  <div className="ent-why-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ent-check-svg">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="ent-why-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
