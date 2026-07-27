import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (!hoveredElement) return;
      const computedStyle = window.getComputedStyle(hoveredElement);
      setIsPointer(computedStyle.cursor === 'pointer' || hoveredElement.tagName.toLowerCase() === 'a' || hoveredElement.tagName.toLowerCase() === 'button');
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', updateCursorType);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, [position.x, position.y]);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <div 
        className="custom-cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`custom-cursor-outline ${isPointer ? 'expand' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
