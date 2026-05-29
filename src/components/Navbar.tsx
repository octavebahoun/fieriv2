import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MonoLabel } from './MonoLabel';
import { Menu, X, User, LogOut, Terminal, Layers } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { member, isAuthenticated, logoutMember } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMember();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Projets', path: '/projects' },
    { name: 'Clubs', path: '/clubs' },
    { name: 'Formations', path: '/formations' },
    { name: 'Événements', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Ambassadeur', path: '/devenir-ambassadeur' },
  ];  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-7xl mx-auto rounded-xl border transition-all duration-500 relative overflow-hidden ${
        scrolled 
          ? "bg-bg-primary/95 backdrop-blur-xl border-cyan/40 shadow-xl shadow-cyan/5" 
          : "bg-[#161A23]/65 backdrop-blur-md border-[#252D3D]/80"
      }`}>
        
        {/* Subtle Tech Glowing Top Line */}
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-90 ${scrolled ? 'animate-pulse' : ''}`} />

        {/* Tech Corner Coordinates Mock Markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan/30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/30" />

        {/* Outer Grid Panel Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-color-dodge bg-[linear-gradient(rgba(0,180,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"
        />

        <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between h-14 relative z-10">
          {/* Brand/Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 bg-accent/20 border border-cyan/40 rounded flex items-center justify-center group-hover:border-cyan transition-all duration-300">
              <Terminal className="w-4 h-4 text-cyan group-hover:rotate-12 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-black text-white tracking-widest uppercase transition-colors group-hover:text-cyan leading-none">
                FIERI
              </span>
              <span 
                className="text-[8px] font-mono tracking-widest text-[#00D4FF] uppercase mt-0.5"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                // RESEARCH_LAB_WEST_AFRICA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `px-3.5 py-1.5 rounded text-xs font-mono font-medium tracking-wider uppercase transition-all duration-200 border relative ${
                  isActive 
                    ? "text-[#00D4FF] border-[#00D4FF]/30 bg-[#00D4FF]/10 font-bold" 
                    : "text-text-secondary border-transparent hover:text-white hover:bg-bg-surface/10"
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right actions (Connected states / Join buttons with system status module) */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* System Status Node */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0D0F14]/70 border border-[#252D3D]/60 font-mono text-[8px] text-[#8892A4] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
              <span>SYS_STABLE // 120_FPS</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <Link 
                  to="/espace-membre" 
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-bg-surface border border-border text-[10px] font-mono text-cyan hover:border-cyan transition-all uppercase"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>ESPACE MEMBRE</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-1.5 rounded bg-bg-surface border border-border text-text-secondary hover:text-red-400 hover:border-red-500/30 transition-all font-mono"
                  title="Déconnexion"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/connexion" 
                className="px-4 py-2 rounded bg-accent hover:bg-accent-hover text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-accent/25 transition-all duration-200"
              >
                Rejoindre FIERI
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded bg-bg-surface border border-border text-white hover:text-cyan transition-all"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-bg-surface border-b border-border py-4 px-4 space-y-3">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `px-4 py-3 rounded text-sm font-semibold block ${
                  isActive 
                    ? "text-cyan bg-bg-card font-bold border-l-4 border-cyan" 
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="border-t border-border/40 pt-4 mt-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-4">
                <Link 
                  to="/espace-membre"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-cyan font-mono text-xs"
                >
                  <User className="w-4 h-4" />
                  <span>ESPACE MEMBRE ({member?.firstName || "Membres"})</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-400 font-mono text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="px-4">
                <Link 
                  to="/connexion"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 rounded bg-accent text-white font-semibold flex items-center justify-center"
                >
                  Rejoindre FIERI
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
