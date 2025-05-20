import React from 'react';
import './effects.css'; // include the CSS above

const BackgroundEffect = () => {
  return (
    <div className="radial-container">
      <div className="radial-blur-circle" style={{ top: '-100px', left: '-100px' }} />
      <div className="radial-blur-circle" style={{ bottom: '0', right: '0', background: 'radial-gradient(circle, rgba(0,255,135,0.4) 0%, transparent 70%)' }} />
      
      {/* Your site content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '3rem', color: '#fff' }}>
        <h1>Welcome to GlobalCyberAssociates</h1>
        <p>We protect your digital future.</p>
      </div>
    </div>
  );
};

export default BackgroundEffect;
