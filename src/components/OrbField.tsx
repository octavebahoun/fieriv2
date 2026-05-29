import React, { useEffect, useState, useRef } from 'react';

export const OrbField: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth lerping kinetic flow for the interactive energy orb
  useEffect(() => {
    const animate = () => {
      setOrbPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        // Ease or "spring ratio" factor
        return {
          x: prev.x + dx * 0.06,
          y: prev.y + dy * 0.06,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  return (
    <div id="kinetic-orb-field" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Dynamic Cursor-following Glowing Energy Orb */}
      <div
        className="absolute w-[35rem] h-[35rem] rounded-full filter blur-[120px] transition-opacity duration-1000"
        style={{
          left: `${orbPos.x - 280}px`,
          top: `${orbPos.y - 280}px`,
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.09) 0%, rgba(43, 127, 255, 0.03) 50%, transparent 100%)',
          willChange: 'transform, left, top',
        }}
      />

      {/* Floating Orange / Bronze Accented Spot from the visual manual */}
      <div
        className="absolute w-[25rem] h-[25rem] rounded-full filter blur-[100px] animate-pulse"
        style={{
          right: '15%',
          top: '25%',
          background: 'radial-gradient(circle, rgba(232, 100, 12, 0.06) 0%, rgba(232, 100, 12, 0.01) 60%, transparent 100%)',
          animationDuration: '12s',
        }}
      />

      {/* Left Deep Indigo Static Ambient Nebula */}
      <div
        className="absolute w-[40rem] h-[40rem] rounded-full filter blur-[140px]"
        style={{
          left: '-10%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(43, 127, 255, 0.07) 0%, rgba(13, 15, 20, 0) 70%)',
        }}
      />

      {/* Center Bottom cyan ambient grid backdrop */}
      <div
        className="absolute w-[30rem] h-[30rem] rounded-full filter blur-[100px]"
        style={{
          left: '40%',
          bottom: '5%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.04) 0%, rgba(13, 15, 20, 0) 80%)',
        }}
      />

    </div>
  );
};

export default OrbField;
