import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../head.jsx";
import Footer from "../footer/footer.jsx";
import services from "./service.js";
import TestimonialSection from "../testimonials/testimonials.jsx";
import "./home.css";
import ClientsSection from "../clients/clients.jsx";
import LinkedInPostCard from "../posts/post.jsx";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    const scroller = document.getElementById("testimonialScroller");
    let scrollAmount = 0;
    const scrollStep = 1;
    const maxScrollLeft = () => scroller.scrollWidth - scroller.clientWidth;

    const scrollInterval = setInterval(() => {
      if (scroller.scrollLeft >= maxScrollLeft()) {
        scrollAmount = 0;
        scroller.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        scroller.scrollLeft += scrollStep;
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <Header />

      <main>
        <section className="hero" data-aos="fade-in">
          <div className="hero-overlay">
            <div className="hero-content container">
              <h1 className="hero-title" data-aos="fade-up">Fortify Your Digital Infrastructure</h1>
              <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
                GlobalCyberAssociates delivers expert-level penetration testing, network audits,
                and infrastructure hardening to defend your business against modern cyber threats.
              </p>
              <a href="/contact" className="btn btn-primary" data-aos="zoom-in" data-aos-delay="200">
                Request a Security Assessment
              </a>
            </div>
          </div>
        </section>

        <section className="section about-card">
          <div className="about-container">
            <h2 className="about-title" data-aos="">Who We Are</h2>
            <p className="about-text" data-aos="" data-aos-delay="100">
              <span className="highlight">GlobalCyberAssociates (GCA)</span> is a cybersecurity firm
              dedicated to safeguarding digital ecosystems through practical, realistic security services.
              With decades of experience in offensive and defensive security, we offer clarity, confidence, and peace of mind to tech-driven organizations.
            </p>
            <p className="about-subtext" data-aos="" data-aos-delay="200">
              From startups to global enterprises, we adapt to your environment and goals to deliver measurable impact.
            </p>
          </div>
        </section>

        <div data-aos="fade-up">
          <ClientsSection />
        </div>

        <section className="section" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">Our Services</h2>
            <div className="service-grid">
              {services.map((service, index) => (
                <div className="card" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div data-aos="fade-up">
          <TestimonialSection />
        </div>

        <section className="section why-us" data-aos="fade-up">
          <div className="container">
            <h2 className="section-title">Why Choose Us?</h2>
            <ul className="reasons-list">
              <li data-aos="fade-right" data-aos-delay="100">✔️ Realistic testing based on latest attacker tactics and techniques</li>
              <li data-aos="fade-right" data-aos-delay="200">✔️ Practical, business-focused remediation guidance</li>
              <li data-aos="fade-right" data-aos-delay="300">✔️ Independent and confidential assessments</li>
              <li data-aos="fade-right" data-aos-delay="400">✔️ Flexible engagements — from startups to enterprise systems</li>
              <li data-aos="fade-right" data-aos-delay="500">✔️ Transparent reporting and actionable outcomes</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
