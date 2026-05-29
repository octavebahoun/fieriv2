import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PointStatut } from './PointStatut';
import { Users, Cpu, Activity, Brain } from 'lucide-react';

export const HeroCollage: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      id="hero-community-collage"
      className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center pointer-events-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      {/* 1. Backdrop Glow (The Halo) - Shifting horizontal orange and cyan gradients */}
      <div 
        className="absolute inset-0 rounded-full filter blur-[50px] transition-all duration-700 opacity-60"
        style={{
          background: hovered 
            ? 'radial-gradient(circle, rgba(43,127,255,0.18) 0%, rgba(232,100,12,0.08) 50%, transparent 100%)' 
            : 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(232,100,12,0.04) 50%, transparent 100%)'
        }}
      />

      {/* 2. Main Glassmorphic Vitrine Card */}
      <div 
        className="relative w-[85%] h-[85%] rounded-[16px] bg-[#161A23]/40 border border-[#252D3D]/80 backdrop-blur-md p-3 shadow-2xl transition-all duration-500 overflow-hidden group select-none flex flex-col justify-between"
        style={{
          transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
          borderColor: hovered ? 'rgba(0, 212, 255, 0.35)' : 'rgba(37, 45, 61, 0.8)'
        }}
      >
        {/* Photo Container */}
        <div className="relative w-full h-[82%] rounded-[12px] overflow-hidden bg-[#0D0F14]/80">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
            alt="FIERI Scientific Community Action"
            className="w-full h-full object-cover transition-all duration-700 ease-out"
            style={{
              filter: hovered ? 'none' : 'grayscale(1) contrast(1.1) brightness(0.85)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
          {/* Cyan/Blue overlay sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161A23] via-transparent to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Info Banner Inside Card */}
        <div className="px-2 py-1.5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-[#00D4FF] tracking-wider">// LOCAL_LAB_WEST_AFRICA</span>
            <span className="text-white text-xs font-bold font-sans uppercase">CO-CREATION & R&D IN ACTION</span>
          </div>
          <Cpu className={`w-4 h-4 transition-all duration-500 ${hovered ? 'text-[#00D4FF] rotate-45' : 'text-[#8892A4]'}`} />
        </div>

        {/* 3. Active Edge Highlight Border - horizontal highlight */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-500" 
          style={{
            background: hovered 
              ? 'linear-gradient(90deg, #2B7FFF 0%, #00D4FF 50%, #E8640C 100%)' 
              : 'linear-gradient(90deg, #252D3D 0%, #252D3D 100%)'
          }}
        />
      </div>

      {/* 4. Northwest Floating Widget: RADAR RECHERCHE */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          x: [0, 3, 0]
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[8%] left-[-4%] bg-[#1C2130]/90 border border-[#252D3D] rounded-[8px] p-3 shadow-xl backdrop-blur-md flex items-center gap-3 select-none hover:border-[#00D4FF]/40 transition-colors pointer-events-auto"
      >
        <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono text-[#8892A4] uppercase">// MONITOR_ACTIVE</span>
          <span className="text-[11px] font-bold text-white uppercase leading-tight font-sans">RADAR CELLULE R&D</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <PointStatut color="cyan" className="!p-0 !bg-transparent !border-none" />
            <span className="text-[8px] font-mono text-[#00D4FF]">TRL-7 DEEP EVALUATION</span>
          </div>
        </div>
      </motion.div>

      {/* 5. Southeast Floating Widget: ECOSYSTEME ACTIF */}
      <motion.div
        animate={{
          y: [0, 6, 0],
          x: [0, -3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-[10%] right-[-5%] bg-[#1C2130]/95 border border-[#252D3D] rounded-[8px] p-3.5 shadow-xl backdrop-blur-md text-left select-none hover:border-[#E8640C]/40 transition-colors pointer-events-auto"
      >
        <span className="text-[9px] font-mono text-[#8892A4] uppercase block mb-1">◇ ECOSYSTEME_COMMUNAUTE</span>
        <div className="flex items-center gap-2">
          {/* Overlapping small avatar face-cuts (face-cropped optimized urls) */}
          <div className="flex -space-x-2.5 overflow-hidden">
            <img 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1C2130] object-cover" 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face&q=80" 
              alt="Researcher avatar 1" 
            />
            <img 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1C2130] object-cover" 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop&crop=face&q=80" 
              alt="Researcher avatar 2" 
            />
            <img 
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#1C2130] object-cover" 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face&q=80" 
              alt="Researcher avatar 3" 
            />
            <div className="inline-block h-6 w-6 rounded-full bg-[#2B7FFF]/20 border border-[#2B7FFF]/50 flex items-center justify-center text-[8px] font-bold text-[#00D4FF] ring-2 ring-[#1C2130]">
              +5K
            </div>
          </div>
          <span className="text-xs font-black text-[#F0F4FF] tracking-wide">+5,400 ACTEURS</span>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroCollage;
