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
import Hero from "./hero/hero.jsx";
import AboutSection from "../about/about.jsx";
import Features from "../4phases/phases.jsx";

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
        <Hero />
        <Features />


        {services.map((service, index) => (
          <section
            className="service-section"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div
              className="service-container"
              style={{
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
              }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="service-content">
                <h2 className="service-title">{service.title}</h2>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          </section>
        ))}
        <div data-aos="slide-in">
          {/* <ClientsSection /> */}
        </div>

        <div data-aos="slide-in">
          <TestimonialSection />
        </div>

        <div className="section why-us" data-aos="slide-in">
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
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
