import React, { useState, useRef } from 'react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleInteractionStart = (e) => {
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    handleMove(clientX);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="before-after-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
    >
      <img src={beforeImage} alt="Before" className="before-after-img before-img" />
      <div 
        className="after-img-container" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="before-after-img after-img" />
      </div>
      <div 
        className="slider-handle" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle-line"></div>
        <div className="slider-handle-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
      <div className="slider-label before-label">Before</div>
      <div className="slider-label after-label">After</div>
    </div>
  );
};

export default BeforeAfterSlider;
