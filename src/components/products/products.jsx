import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './products.css';
import Header from '../head.jsx';
import Footer from '../footer/footer.jsx';
import visunImg from '../products/visun-dashboard.png';
import { Shield, Lock, ArrowRight, Zap, Network, BarChart3, Check, Monitor, Usb, FileSearch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── VisuN AI features for the featured card ── */
const VISUN_FEATURES = [
  { icon: Monitor,     text: 'Real-time device & network visibility' },
  { icon: Shield,      text: 'Vulnerability scanning & CVE scoring' },
  { icon: Usb,         text: 'USB monitoring & file activity logging' },
  { icon: FileSearch,  text: 'Executive analytics & RBAC' },
];

const LOCKED = [
  {
    name: 'CipherGuard',
    tag: 'Identity & Access · Zero Trust',
    tagline: 'Zero-Trust Identity Management',
    desc: 'Enterprise-grade identity and access management with AI-powered anomaly detection, SSO, and adaptive MFA.',
    icons: [Lock, Shield, Zap],
    accent: '#8b5cf6',
  },
  {
    name: 'ThreatPulse',
    tag: 'Threat Intelligence · SOC',
    tagline: 'AI-Driven Threat Intelligence',
    desc: 'Continuous threat intelligence aggregating global feeds, dark-web signals, and AI-powered risk correlation.',
    icons: [Zap, BarChart3, Shield],
    accent: '#f59e0b',
  },
];

/* ── Animated number on the featured card ── */
function PriceTag() {
  const numRef = useRef(null);
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: 5,
      duration: 1.4,
      ease: 'power2.out',
      delay: 0.6,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = `${Math.round(obj.v)}$`; },
      onComplete: () => { el.textContent = '5$'; },
    });
  }, []);
  return <span ref={numRef} className="pg-price-num">5$</span>;
}

/* ── Placeholder visual for locked cards ── */
function LockedVisual({ icons, accent }) {
  return (
    <div className="pg-locked-visual" style={{ '--acc': accent }}>
      <div className="pg-locked-rings">
        <div className="pg-ring pg-ring-1" />
        <div className="pg-ring pg-ring-2" />
        <div className="pg-ring pg-ring-3" />
      </div>
      <div className="pg-locked-icons">
        {icons.map((Icon, i) => (
          <div key={i} className="pg-locked-icon-item" style={{ animationDelay: `${i * 0.4}s` }}>
            <Icon size={22} />
          </div>
        ))}
      </div>
      <div className="pg-locked-label">In Development</div>
    </div>
  );
}

/* ── Main component ── */
const Products = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const lockedRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero words */
      const words = heroRef.current?.querySelectorAll('.pg-word');
      if (words?.length) {
        gsap.from(words, {
          y: 50, opacity: 0, duration: 0.75, stagger: 0.07,
          ease: 'power3.out', delay: 0.1,
        });
      }

      /* Hero sub */
      gsap.from('.pg-hero-sub', {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.55,
      });

      /* Featured card slide up */
      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          y: 90, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 88%', once: true },
        });
      }

      /* Feature list items stagger */
      gsap.from('.pg-feat-item', {
        x: -24, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.pg-feat-list', start: 'top 90%', once: true },
      });

      /* Locked cards stagger */
      const locked = lockedRef.current?.querySelectorAll('.pg-locked-card');
      if (locked?.length) {
        gsap.from(locked, {
          y: 60, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: lockedRef.current, start: 'top 88%', once: true },
        });
      }
    });

    /* 3D tilt — outside context since it uses event listeners */
    const card = featuredRef.current;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 22;
      const y = (e.clientY - r.top - r.height / 2) / 22;
      gsap.to(card, { rotateY: x, rotateX: -y, duration: 0.35, ease: 'power2.out', transformPerspective: 1200 });
    };
    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.6)' });
    };
    if (card) {
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    }

    return () => {
      ctx.revert();
      if (card) {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>VisuN AI &amp; Cybersecurity Products | Global Cyber Associates</title>
        <meta name="description" content="Explore GCA's AI-powered cybersecurity products. VisuN AI delivers real-time network visibility, employee monitoring, USB &amp; file activity logging, and vulnerability scanning — from $5 per endpoint/month." />
        <meta name="keywords" content="VisuN AI, employee monitoring software, network monitoring tool, endpoint monitoring, insider threat detection, USB monitoring, file activity logging, DLP software, vulnerability scanning, real-time network visibility, cybersecurity products, workforce analytics, device monitoring" />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://www.globalcyberassociates.com/products" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="VisuN AI — Real-Time Network &amp; Employee Visibility | GCA" />
        <meta property="og:description" content="VisuN AI: real-time endpoint monitoring, network topology, vulnerability scanning, and workforce analytics in one platform. From $5 per endpoint/month." />
        <meta property="og:url" content="https://www.globalcyberassociates.com/products" />
        <meta property="og:image" content="https://www.globalcyberassociates.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VisuN AI — Real-Time Network &amp; Employee Visibility | GCA" />
        <meta name="twitter:description" content="VisuN AI: real-time endpoint monitoring, network topology, vulnerability scanning, and workforce analytics. From $5 per endpoint/month." />
        <meta name="twitter:image" content="https://www.globalcyberassociates.com/logo.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "VisuN AI",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Windows",
          description: "Real-time endpoint monitoring, network topology visualization, vulnerability scanning, USB & file activity logging, and workforce analytics in one platform.",
          url: "https://www.globalcyberassociates.com/products/visunai",
          offers: {
            "@type": "Offer",
            price: "5",
            priceCurrency: "USD",
            description: "Per endpoint, per month"
          },
          publisher: {
            "@type": "Organization",
            name: "Global Cyber Associates",
            url: "https://www.globalcyberassociates.com/"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://www.globalcyberassociates.com/" },
            { "@type": "ListItem", position: 2, name: "Products", item: "https://www.globalcyberassociates.com/products" }
          ]
        })}</script>
      </Helmet>

      <Header />
      <main className="products-page">

        {/* ── Hero ── */}
        <div className="pg-hero" ref={heroRef}>
          <p className="pg-hero-label">Our Products</p>
          <h1 className="pg-hero-h1">
            {['Built', 'to', 'Secure.'].map((w, i) => (
              <React.Fragment key={i}><span className="pg-word">{w}</span>{' '}</React.Fragment>
            ))}
            <br />
            {['Designed', 'to', 'Scale.'].map((w, i) => (
              <React.Fragment key={i}><span className="pg-word">{w}</span>{' '}</React.Fragment>
            ))}
          </h1>
          <p className="pg-hero-sub">
            Purpose-built tools that give your team real-time visibility, control,
            and intelligence — without the overhead of a full security operation.
          </p>
        </div>

        <div className="pg-wrap">

          {/* ── Featured: VisuN AI ── */}
          <div
            ref={featuredRef}
            className="pg-featured"
            onClick={() => navigate('/products/visunai')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/products/visunai')}
          >
            {/* Top glow bar */}
            <div className="pg-featured-bar" />

            {/* Live badge */}
            <div className="pg-live-badge">
              <span className="pg-live-dot" />
              Live
            </div>

            <div className="pg-featured-inner">

              {/* Left: content */}
              <div className="pg-featured-left">
                <span className="pg-tag" style={{ color: '#22d3ee', borderColor: 'rgba(34,211,238,.25)', background: 'rgba(34,211,238,.08)' }}>
                  Network Security · AI-Powered
                </span>
                <h2 className="pg-featured-name">VisuN AI</h2>
                <p className="pg-featured-tagline">See Everything on Your Network</p>
                <p className="pg-featured-desc">
                  Real-time endpoint monitoring, network topology visualization, vulnerability scanning,
                  and workforce analytics — unified in one powerful platform.
                </p>

                <ul className="pg-feat-list">
                  {VISUN_FEATURES.map((f, i) => (
                    <li key={i} className="pg-feat-item">
                      <span className="pg-feat-icon"><f.icon size={13} /></span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                <div className="pg-featured-footer">
                  <div className="pg-price-block">
                    <span className="pg-price-starts">Starts from</span>
                    <PriceTag />
                    <span className="pg-price-unit">per endpoint / mo</span>
                  </div>
                  <button
                    className="pg-featured-cta"
                    onClick={e => { e.stopPropagation(); navigate('/products/visunai'); }}
                  >
                    Explore VisuN AI <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Right: dashboard image */}
              <div className="pg-featured-right">
                <div className="pg-img-shell">
                  <div className="pg-img-chrome">
                    <span className="pg-chrome-dot" style={{ background: '#ef4444' }} />
                    <span className="pg-chrome-dot" style={{ background: '#f59e0b' }} />
                    <span className="pg-chrome-dot" style={{ background: '#10b981' }} />
                    <span className="pg-chrome-url">visunai.globalcyberassociates.com</span>
                  </div>
                  <img src={visunImg} alt="VisuN AI Dashboard" className="pg-dashboard-img" />
                </div>
                <div className="pg-img-glow" />
              </div>

            </div>
          </div>

          {/* ── Coming Soon row ── */}
          <div className="pg-locked-row" ref={lockedRef}>
            {LOCKED.map((p) => (
              <div key={p.name} className="pg-locked-card" style={{ '--acc': p.accent }}>
                <div className="pg-locked-bar" />

                <div className="pg-locked-header">
                  <div className="pg-lock-chip">
                    <Lock size={11} />
                    Coming Soon
                  </div>
                  <span className="pg-tag" style={{ color: p.accent, borderColor: `${p.accent}40`, background: `${p.accent}14` }}>
                    {p.tag}
                  </span>
                  <h3 className="pg-locked-name">{p.name}</h3>
                  <p className="pg-locked-tagline">{p.tagline}</p>
                </div>

                <LockedVisual icons={p.icons} accent={p.accent} />

                <p className="pg-locked-desc">{p.desc}</p>

                <div className="pg-locked-footer">
                  <span className="pg-price-tbd">TBD</span>
                  <a
                    href={`mailto:ram@globalcyberassociates.com?subject=Product Interest: ${p.name}`}
                    className="pg-notify-btn"
                    onClick={e => e.stopPropagation()}
                  >
                    Notify Me
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
