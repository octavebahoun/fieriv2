import React from 'react';

interface PointStatutProps {
  label?: string;
  color?: 'cyan' | 'green' | 'accent' | 'orange';
  className?: string;
}

export const PointStatut: React.FC<PointStatutProps> = ({ 
  label, 
  color = 'cyan', 
  className = '' 
}) => {
  const colorMap = {
    cyan: {
      bg: 'bg-[#00D4FF]',
      ping: 'bg-[#00D4FF]/40',
      text: 'text-[#00D4FF]',
      border: 'border-[#00D4FF]/20',
    },
    green: {
      bg: 'bg-green-500',
      ping: 'bg-green-500/40',
      text: 'text-green-400',
      border: 'border-green-500/20',
    },
    accent: {
      bg: 'bg-[#2B7FFF]',
      ping: 'bg-[#2B7FFF]/40',
      text: 'text-[#2B7FFF]',
      border: 'border-[#2B7FFF]/20',
    },
    orange: {
      bg: 'bg-orange-500',
      ping: 'bg-orange-500/40',
      text: 'text-orange-400',
      border: 'border-orange-500/20',
    }
  };

  const choice = colorMap[color];

  return (
    <div id="point-statut-container" className={`inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#161A23]/60 border ${choice.border} ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${choice.bg}`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${choice.bg}`}></span>
      </span>
      {label && (
        <span className={`font-mono text-[9.5px] uppercase tracking-widest ${choice.text}`}>
          // {label}
        </span>
      )}
    </div>
  );
};

export default PointStatut;
