import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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
        <MythBuster />
        <LeadMagnet />        


        <div data-aos="slide-in">
          <TestimonialSection />
        </div>

        <div className="section why-us" data-aos="slide-in">
          <div className="container">
            <h2 className="section-title">Built on Honesty. Measured by Outcomes.</h2>
            <ul className="reasons-list">
              <li data-aos="fade-right" data-aos-delay="100">✔️ Realistic testing based on current attacker tactics — not checkbox audits</li>
              <li data-aos="fade-right" data-aos-delay="200">✔️ Business-focused remediation guidance, not just raw findings</li>
              <li data-aos="fade-right" data-aos-delay="300">✔️ Independent and confidential assessments — your data stays yours</li>
              <li data-aos="fade-right" data-aos-delay="400">✔️ Flexible engagements — from a lean startup to a multi-site enterprise</li>
              <li data-aos="fade-right" data-aos-delay="500">✔️ Transparent reporting with clear, prioritised next steps</li>
              <li data-aos="fade-right" data-aos-delay="600">✔️ Accessible pricing — serious security without the enterprise invoice</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
