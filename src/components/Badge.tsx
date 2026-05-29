import React from 'react';

interface BadgeProps {
  status: 'en cours' | 'terminé' | 'live' | 'upcoming' | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = "" }) => {
  const normStatus = status.toLowerCase().trim();

  let styles = "bg-opacity-10 text-xs px-3 py-1 rounded-full border inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-[10px]";

  if (normStatus === 'en cours') {
    styles += " bg-cyan/10 text-cyan border-cyan/20";
    return (
      <span className={`${styles} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan"></span>
        En Cours
      </span>
    );
  } else if (normStatus === 'terminé' || normStatus === 'completed') {
    styles += " bg-green-500/10 text-green-400 border-green-500/20";
    return (
      <span className={`${styles} ${className}`}>
        ✓ Terminé
      </span>
    );
  } else if (normStatus === 'live') {
    styles += " bg-red-500/10 text-red-400 border-red-500/20";
    return (
      <span className={`${styles} ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
        Live
      </span>
    );
  } else if (normStatus === 'upcoming') {
    styles += " bg-blue-500/10 text-blue-400 border-blue-500/20";
    return (
      <span className={`${styles} ${className}`}>
        • À Venir
      </span>
    );
  }

  // Fallback default style
  styles += " bg-text-muted/10 text-text-secondary border-border";
  return <span className={`${styles} ${className}`}>{status}</span>;
};

export default Badge;
