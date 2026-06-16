import React, { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../head.jsx";
import Footer from "../footer/footer.jsx";
import TestimonialSection from "../testimonials/testimonials.jsx";
import "./home.css";
import "./scroll-journey.css";
import Hero from "./hero/hero.jsx";
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

const WHY_ITEMS = [
  "Realistic testing based on current attacker tactics — not checkbox audits",
  "Business-focused remediation guidance, not just raw findings",
  "Independent and confidential assessments — your data stays yours",
  "Flexible engagements — from a lean startup to a multi-site enterprise",
  "Transparent reporting with clear, prioritised next steps"
];

const CHAPTER_LABELS = ["Hero", "Clients", "Features", "Myth", "CTA", "Why Us"];

const Divider = () => (
  <div className="sj-divider" aria-hidden="true">
    <div className="sj-divider-line" />
    <div className="sj-divider-center">
      <span className="sj-divider-dot" />
      <span className="sj-divider-dot" />
      <span className="sj-divider-dot" />
    </div>
    <div className="sj-divider-line" />
  </div>
);

const Home = () => {
  const progressRef = useRef(null);
  const heroInnerRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const rafRef = useRef(null);

  /* ── Scroll progress bar ── */
  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    if (progressRef.current) progressRef.current.style.width = `${pct}%`;
  }, []);

  /* ── Hero parallax ── */
  const updateParallax = useCallback(() => {
    if (!heroInnerRef.current) return;
    const scrollY = window.scrollY;
    const heroHeight = heroInnerRef.current.offsetHeight;
    if (scrollY < heroHeight * 1.2) {
      heroInnerRef.current.style.transform = `translateY(${scrollY * 0.22}px)`;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        updateParallax();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress, updateParallax]);

  /* ── Intersection observer: reveal on scroll ── */
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".sj-reveal, .sj-reveal-left, .sj-reveal-right, .sj-reveal-scale, .sj-reveal-clip, .sj-why-item-wrap, .sj-section-glow"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sj-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );

    targets.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  /* ── Intersection observer: track active chapter ── */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]");

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(Number(entry.target.dataset.chapter));
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((el) => chapterObserver.observe(el));
    return () => chapterObserver.disconnect();
  }, []);

  const scrollToChapter = (idx) => {
    const el = document.querySelector(`[data-chapter="${idx}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Cybersecurity Services for Startups &amp; MSMEs | Global Cyber Associates</title>
        <meta name="description" content="Global Cyber Associates delivers enterprise-grade cybersecurity — VAPT, compliance, SOC, and training — right-sized for startups and MSMEs. Get your free risk assessment today." />
        <meta name="keywords" content="cybersecurity services, VAPT, penetration testing, vulnerability assessment, ISO 27001 compliance, SOC 2 audit, SOC monitoring, managed security services, MSSP, cybersecurity for startups, cybersecurity for MSMEs, cybersecurity company India, cybersecurity company Chennai, security audit, cyber security training, incident response, threat detection, data protection, network security, web application security, risk assessment" />
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

      {/* Scroll progress bar */}
      <div className="sj-progress-wrap" aria-hidden="true">
        <div className="sj-progress-fill" ref={progressRef} />
      </div>

      {/* Ambient background orbs */}
      <div className="sj-ambient" aria-hidden="true">
        <div className="sj-orb sj-orb-1" />
        <div className="sj-orb sj-orb-2" />
        <div className="sj-orb sj-orb-3" />
      </div>

      {/* Chapter navigation dots */}
      <nav className="sj-chapter-nav" aria-label="Page sections">
        {CHAPTER_LABELS.map((label, i) => (
          <button
            key={i}
            className={`sj-chapter-btn${activeChapter === i ? " sj-active" : ""}`}
            onClick={() => scrollToChapter(i)}
            title={label}
            aria-label={`Scroll to ${label}`}
          />
        ))}
      </nav>

      <Header />

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ── Chapter 0: Hero ── */}
        <div data-chapter="0">
          <div ref={heroInnerRef} className="sj-hero-inner">
            <Hero />
          </div>
        </div>

        <Divider />

        {/* ── Chapter 1: Client Logos ── */}
        <div data-chapter="1" className="sj-reveal sj-section-glow">
          <TestimonialSection />
        </div>

        <Divider />

        {/* ── Chapter 2: Features ── */}
        <div data-chapter="2" className="sj-reveal sj-section-glow">
          <Features />
        </div>

        <Divider />

        {/* ── Chapter 3: MythBuster ── */}
        <div data-chapter="3" className="sj-reveal-scale sj-section-glow">
          <MythBuster />
        </div>

        <Divider />

        {/* ── Chapter 4: Lead Magnet ── */}
        <div data-chapter="4" className="sj-reveal-clip sj-section-glow">
          <LeadMagnet />
        </div>

        <Divider />

        {/* ── Chapter 5: Why Us ── */}
        <div data-chapter="5">
          <section className="ent-why-us-section">
            <div className="ent-why-us-container">

              <div className="ent-why-us-header sj-reveal-left">
                <h2 className="ent-why-title">
                  Built on <span className="text-cyan">Honesty.</span><br />
                  Measured by <span className="text-white">Outcomes.</span>
                </h2>
                <p className="ent-why-subtitle">
                  We don't sell fear. We deliver engineered resilience. Here is exactly how we execute our engagements differently from legacy providers.
                </p>
              </div>

              <div className="ent-why-us-list">
                {WHY_ITEMS.map((text, idx) => (
                  <div
                    key={idx}
                    className={`ent-why-item sj-why-item-wrap sj-d${idx + 1}`}
                  >
                    <div className="ent-why-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                        strokeLinejoin="round" className="ent-check-svg">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="ent-why-text">{text}</p>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default Home;
