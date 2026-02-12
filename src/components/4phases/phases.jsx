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
