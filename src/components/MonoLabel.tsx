import React from 'react';

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const MonoLabel: React.FC<MonoLabelProps> = ({ children, className = "" }) => {
  return (
    <span 
      className={`font-mono text-cyan uppercase tracking-[0.15em] text-[11px] block select-none ${className}`}
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {children}
    </span>
  );
};

export default MonoLabel;
