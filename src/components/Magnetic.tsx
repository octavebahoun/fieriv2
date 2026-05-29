import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactElement;
  range?: number; // Distance in pixels within which magnetic pull initiates
  strength?: number; // Speed of alignment
}

export const Magnetic: React.FC<MagneticProps> = ({ 
  children, 
  range = 80, 
  strength = 0.35 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from pointer to center
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < range) {
        // Attract element toward mouse position (controlled by strength and capped at 18px max)
        const targetX = distX * strength;
        const targetY = distY * strength;
        
        // Cap the offset to avoid elements breaking out of flow
        const maxOffset = 18;
        const boundedX = Math.max(-maxOffset, Math.min(maxOffset, targetX));
        const boundedY = Math.max(-maxOffset, Math.min(maxOffset, targetY));
        
        setPosition({ x: boundedX, y: boundedY });
      } else {
        // Return to dead center when outside range
        setPosition({ x: 0, y: 0 });
      }
    };

    const handlePointerLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('pointermove', handlePointerMove);
    const el = containerRef.current;
    if (el) {
      el.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (el) {
        el.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [range, strength]);

  return (
    <div
      ref={containerRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.1s cubic-bezier(0.1, 0.3, 0.1, 0.9)',
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
};

export default Magnetic;
