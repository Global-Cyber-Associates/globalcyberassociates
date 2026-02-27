import React, { useEffect, useRef, useState } from 'react';
import './testimonials.css';
import precifastLogo  from '../../assets/precifast.jpg';
import eshwaricoLogo  from '../../assets/eshwarico.png';
import nligtenLogo    from '../../assets/nligten.svg';
import nsysLogo       from '../../assets/nsys.svg';
import gigitLogo      from '../../assets/gigit.png';
import savantLogo     from '../../assets/savant.png';
import sortinsLogo    from '../../assets/sortins.png';

const clients = [
  { name: "PreciFast India",       sector: "Manufacturing",          logo: precifastLogo  },
  { name: "NLigten Systems",       sector: "Cloud & Collaboration",  logo: nligtenLogo    },
  { name: "NSys Technologies",     sector: "Mobile & Web Apps",      logo: nsysLogo       },
  { name: "Eshwari & Co.",         sector: "Network Infrastructure", logo: eshwaricoLogo  },
  { name: "Gigit Security",        sector: "Cybersecurity",          logo: gigitLogo      },
  { name: "Savant Solutions",      sector: "IT Solutions",           logo: savantLogo     },
  { name: "Sortins Technologies",  sector: "Enterprise IT",          logo: sortinsLogo    },
];

const loopedClients = [...clients, ...clients, ...clients];

export default function ClientLogoStrip() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let animationFrameId;

    const scroll = () => {
      if (!scroller || isHovered || isDragging) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }
      scroller.scrollLeft += 0.6;
      if (scroller.scrollLeft >= scroller.scrollWidth / 3) {
        scroller.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 3) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 3;
    } else if (scrollRef.current.scrollLeft < 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 3;
    }
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="logo-strip-section">
      <p className="logo-strip-eyebrow">Trusted By</p>
      <div
        className="logo-strip-scroll"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsDragging(false); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="logo-strip-track">
          {loopedClients.map((client, index) => (
            <div className="logo-card" key={index}>
              <img src={client.logo} alt={client.name} className="logo-card-img" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
