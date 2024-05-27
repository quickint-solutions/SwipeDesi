import React, { useState } from 'react';
import './ImageMagnifier.css';

function ImageMagnifier(props: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.currentTarget.getBoundClient;

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x: x, y: y });
    setCursorPosition({ x: e.pageX - left, y: e.pageY - top });
  };

  return (
    <div
      className="img-magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <img className="magnifier-img" src={props.image} alt="" />
      <div
        style={{
          position: 'absolute',
          left: `${cursorPosition.x - 100}px`,
          top: `${cursorPosition.y - 100}px`,
          pointerEvents: 'none',
        }}
      >
        <div
          className="magnifier-image"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundPosition: `${position.x}% ${position.y}%`,
          }}
        />
      </div>
    </div>
  );
}
export default ImageMagnifier;
