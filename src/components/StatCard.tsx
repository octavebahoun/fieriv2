import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MonoLabel } from './MonoLabel';

interface StatCardProps {
  value: number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds

    // easeOutExpo
    const easeOutExpo = (t: number) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutExpo(progress);
      const nextValue = Math.floor(easedProgress * value);
      
      setCurrentValue(nextValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCurrentValue(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [value, isInView]);

  return (
    <div 
      ref={ref} 
      className="bg-bg-card border border-border p-6 rounded-lg text-center flex flex-col justify-center items-center h-40 card-glow-hover transition-all duration-300 relative overflow-hidden"
    >
      <div className="flex items-baseline justify-center">
        <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
          {currentValue}
        </span>
        {currentValue === value && (
          <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="text-3xl font-display font-bold text-cyan ml-0.5"
          >
            +
          </motion.span>
        )}
      </div>
      <MonoLabel className="mt-2 text-text-secondary">
        {label}
      </MonoLabel>
    </div>
  );
};

export default StatCard;
