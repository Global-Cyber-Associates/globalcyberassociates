import React, { useEffect, useRef } from 'react';
import './testimonials.css';


const testimonials = [
  {
    name: 'Ananya Desai',
    role: 'CTO, FinEdge Bank',
    text: 'Helped us fix critical issues before our audit. Fast and professional.',
  },
  {
    name: 'Rahul Verma',
    role: 'IT Manager, HealthPlus Clinics',
    text: 'Their quick response kept our systems safe during an attack.',
  },
  {
    name: 'Priya K.',
    role: 'Founder, SaaS Startup',
    text: 'Their assessment gave us the clarity we needed on our risks.',
  },
  {
    name: 'Mohammed A.',
    role: 'DevOps Lead, EcomSphere',
    text: 'The red team test was real-world and revealed key gaps.',
  },
  {
    name: 'Sonal Mehta',
    role: 'Compliance Officer, MediSecure',
    text: 'Their guidance helped us pass ISO 27001 with ease.',
  },
  {
    name: 'Kiran J.',
    role: 'CEO, DataSync Solutions',
    text: 'Reliable 24/7 monitoring that gives us real peace of mind.',
  },
];


export default function AutoScrollGrid() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 1;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollAmount;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-section__title">What Our Users Say</h2>
      <div className="testimonial-section__scroll-wrapper" ref={scrollRef}>
        <div className="testimonial-section__grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-section__card" key={index}>
              <p className="testimonial-section__text">"{item.text}"</p>
              <p className="testimonial-section__author">- {item.name}, {item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
