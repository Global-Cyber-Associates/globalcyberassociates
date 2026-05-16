import React from 'react';
import './testimonials.css';
import precifastLogo from '../../assets/precifast.jpg';
import eshwaricoLogo from '../../assets/eshwarico.png';
import nligtenLogo from '../../assets/nligten.svg';
import nsysLogo from '../../assets/nsys.svg';
import idesLabsLogo from '../../assets/ideslabs.png';

const clients = [
  { name: "PreciFast India", logo: precifastLogo, type: "img" },
  { name: "NLigten Systems", logo: nligtenLogo, type: "img" },
  { name: "NSys Technologies", logo: nsysLogo, type: "img" },
  { name: "Eshwari & Co.", logo: eshwaricoLogo, type: "img" },
  { name: "iDes Labs", logo: idesLabsLogo, type: "img" },
];

const marqueeItems = [...clients, ...clients];

export default function ClientLogoStrip() {
  return (
    <section className="ls-section">
      <p className="ls-eyebrow">
        <span className="ls-eyebrow-line" />
        Trusted by industry leaders
        <span className="ls-eyebrow-line" />
      </p>

      <div className="ls-marquee-outer">
        <div className="ls-fade ls-fade-left" aria-hidden="true" />
        <div className="ls-fade ls-fade-right" aria-hidden="true" />

        <div className="ls-marquee-track" aria-label="Client logos">
          {marqueeItems.map((client, i) => (
            <div className="ls-logo-item" key={`${client.name}-${i}`}>
              <img
                src={client.logo}
                alt={client.name}
                className="ls-logo-img"
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
