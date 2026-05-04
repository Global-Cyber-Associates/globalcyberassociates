/*
import React from "react";
import "./phases.css";
import one from "./1.png";
import two from "./2.png";
import three from "./3.png";
import four from "./4.png";

const features = [
    {
        id: 1,
        title: "Reliability",
        description:
            "We deliver trusted, proven protection across your digital infrastructure. Our experts ensure every vulnerability is identified and addressed — no compromises.",
        img: one, // Replace with your actual image path
    },
    {
        id: 2,
        title: "Scalability",
        description:
            "From startups to large enterprises, our cybersecurity solutions grow with you. Cloud-native and future-ready defenses for your evolving business.",
        img: two,
    },
    {
        id: 3,
        title: "Efficiency",
        description:
            "We detect threats faster, respond smarter, and automate where it counts. Get comprehensive protection without the complexity.",
        img: three,
    },
    {
        id: 4,
        title: "Innovation",
        description:
            "Stay ahead of attackers with AI-powered threat detection, ethical hacking, and zero-trust architecture. We don’t just follow trends — we set them.",
        img: four,
    },
];

const Features = () => {
    return (
        <>
            <section className="features-container">
                {features.map((feature) => (
                    <div className="feature-card" key={feature.id}>
                        <div className="feature-number">{feature.id}</div>
                        <img src={feature.img} alt={feature.title} className="feature-img" />
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-desc">{feature.description}</p>
                    </div>
                ))}
            </section>
        </>

    );
};

export default Features;

*/

import React from "react";
import "./phases.css";

const features = [
    {
        id: "rel",
        title: "Reliability",
        description: "We deliver trusted, proven protection across your digital infrastructure. Our experts ensure every vulnerability is identified and addressed — no compromises.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feat-icon accent-blue">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
        )
    },
    {
        id: "sca",
        title: "Scalability",
        description: "From startups to large enterprises, our cybersecurity solutions grow with you. Cloud-native and future-ready defenses for your evolving business.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feat-icon accent-purple">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                <line x1="6" y1="18" x2="6.01" y2="18"></line>
            </svg>
        )
    },
    {
        id: "eff",
        title: "Efficiency",
        description: "We detect threats faster, respond smarter, and automate where it counts. Get comprehensive protection without the complexity.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feat-icon accent-cyan">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
        )
    },
    {
        id: "inn",
        title: "Innovation",
        description: "Stay ahead of attackers with AI-powered threat detection, ethical hacking, and zero-trust architecture. We don’t just follow trends — we set them.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feat-icon accent-indigo">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M2 12h20"></path>
            </svg>
        )
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="ent-features-container">
                {features.map((feature, index) => (
                    <div className="ent-feature-card" key={feature.id} data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className="icon-wrapper">
                            <div className="icon-glow"></div>
                            {feature.icon}
                        </div>
                        <h3 className="ent-feature-title">{feature.title}</h3>
                        <p className="ent-feature-desc">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
