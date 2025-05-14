
import './testimonials.css';

const testimonials = [
  {
    quote: "GlobalCyberAssociates helped us uncover serious vulnerabilities before attackers could. Their professionalism and insights were top-tier.",
    author: "Amanda R., CTO at FinTechHub"
  },
  {
    quote: "We’ve worked with many firms, but none match GCA’s clarity in reporting and strategic remediation plans.",
    author: "Rajiv P., Security Lead at HealthCore"
  },
  {
    quote: "Their testing mimicked real-world attacks exactly. We gained more than just a report — we gained resilience.",
    author: "Sarah L., Infrastructure Manager at InnoSoft"
  }
];

export default function TestimonialSection() {
  return (
    <div className="section testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <div id="testimonialScroller" className="testimonial-cards">
          {testimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <p>"{t.quote}"</p>
              <h4>— {t.author}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
