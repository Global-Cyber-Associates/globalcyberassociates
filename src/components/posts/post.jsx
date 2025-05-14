// components/LinkedInPostCard.jsx
import React from 'react';
import './post.css'

const LinkedInPostCard = ({ title, description, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="linkedin-post-card"
    >
      <div className="linkedin-post-content">
        <h4 className="post-title">{title}</h4>
        <p className="post-description">{description}</p>
        <span className="view-post">View on LinkedIn →</span>
      </div>
    </a>
  );
};

export default LinkedInPostCard;
