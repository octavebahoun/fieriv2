import React, { useState, useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Springs for smooth movement
  const rotateX = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate values relative to card size: range -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Compute rotations
    rotateX.set(-y * 12); // Maximum 12 degrees
    rotateY.set(x * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!shouldReduceMotion) {
      scale.set(1.03); // Request specified 1.03
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  const techGridPatternSrc = "data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1' fill='rgba(0, 212, 255, 0.04)'/%3E%3C/svg%3E";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        scale: shouldReduceMotion ? 1 : scale,
        transformStyle: shouldReduceMotion ? undefined : 'preserve-3d',
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
      className={`bg-bg-card border border-border p-6 rounded-lg select-none transition-all duration-300 card-glow-hover flex flex-col justify-between h-full relative cursor-pointer overflow-hidden will-change-transform ${className}`}
    >
      {/* 1. Tech Blueprint background grid motif */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-color-dodge transition-all duration-500" 
        style={{ 
          backgroundImage: `url("${techGridPatternSrc}")`,
          backgroundRepeat: 'repeat',
          opacity: isHovered ? 0.85 : 0.6,
        }}
      />

      {/* 2. Sleek Corner brackets / tick marks */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 ${isHovered ? 'border-[#00D4FF]/80 w-4 h-4' : 'border-[#252D3D]/60'}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 ${isHovered ? 'border-[#00D4FF]/80 w-4 h-4' : 'border-[#252D3D]/60'}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 ${isHovered ? 'border-[#00D4FF]/80 w-4 h-4' : 'border-[#252D3D]/60'}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 ${isHovered ? 'border-[#00D4FF]/80 w-4 h-4' : 'border-[#252D3D]/60'}`} />

      {/* 3. Tech indicator notch decoration on left border */}
      <div className={`absolute left-0 top-[28%] w-[2px] h-[35%] transition-all duration-500 ${isHovered ? 'bg-[#00D4FF]' : 'bg-[#252D3D]'}`} />

      {/* 4. Subtle micro neon coordinate tracking at top margin */}
      <div className="absolute top-1 right-3 opacity-20 hover:opacity-50 transition-opacity font-mono text-[6.5px] text-[#00D4FF] tracking-widest pointer-events-none select-none">
        LOC_SYS_45A1 // FIERI_R&D
      </div>

      <div className="relative z-10" style={{ transform: shouldReduceMotion ? undefined : 'translateZ(15px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;
