import React, { useEffect, useRef, useState } from 'react';
import './testimonials.css';

const testimonials = [
  { 
    name: 'Charan Gurudas', 
    role: 'CEO, PreciFast India Pvt Ltd', 
    text: 'Working with GCA was an absolute pleasure. They helped us strengthen our CRM security, and I feel confident knowing our data is well-protected. Their team truly cares about their clients.', 
    project: 'CRM Security' 
  },
  { 
    name: 'Prasanna Durga', 
    role: 'Director, NLigten Systems Pvt Ltd', 
    text: 'GCA did a wonderful job securing our cloud platform. Their approach is professional yet personal, and I always feel our systems are in safe hands.', 
    project: 'Cloud Collaboration' 
  },
  { 
    name: 'Vikram Singh', 
    role: 'Project Head, NSys Technologies', 
    text: 'The security assessment for our mobile app was thorough and insightful. GCA guided us through fixing issues clearly, and I genuinely appreciated their expertise and support.', 
    project: 'Mobile App Security' 
  },
  { 
    name: 'Anand', 
    role: 'CEO, Eshwari & Co.', 
    text: 'Partnering with GCA has been a very positive experience. They enhanced our network security and gave us real peace of mind. Their dedication and professionalism stand out.', 
    project: 'Network Security' 
  },
];



export default function InfiniteScrollTestimonials() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Clone testimonials for infinite effect
  const loopedTestimonials = [...testimonials, ...testimonials];

  // Auto-scroll
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    let scrollAmount = 0.5;
    let animationFrameId;

    const scroll = () => {
      if (!scrollRef.current || isHovered || isDragging) {
        animationFrameId = requestAnimationFrame(scroll);
        return;
      }

      scroller.scrollLeft += scrollAmount;

      // Reset scroll position when we reach the first duplicate set
      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  // Mouse drag handlers
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

    // Infinite loop while dragging
    if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 2;
    } else if (scrollRef.current.scrollLeft < 0) {
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 2;
    }
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-section__title">What Our Users Say</h2>
      <div
        className="testimonial-section__scroll-wrapper"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div className="testimonial-section__grid">
          {loopedTestimonials.map((item, index) => (
            <div className="testimonial-section__card" key={index}>
              <p className="testimonial-section__text">"{item.text}"</p>
              <p className="testimonial-section__project">{item.project}</p>
              <p className="testimonial-section__author">
                – {item.name}, {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
