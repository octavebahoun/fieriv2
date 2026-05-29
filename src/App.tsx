/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthGuard from './components/AuthGuard';
import OrbField from './components/OrbField';

// Pages
import Home from './pages/Home';
import Students from './pages/Students';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Clubs from './pages/Clubs';
import ClubDetail from './pages/ClubDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Formations from './pages/Formations';
import Events from './pages/Events';
import Members from './pages/Members';
import Dashboard from './pages/Dashboard';
import ResearcherProfile from './pages/ResearcherProfile';
import Help from './pages/Help';
import DevenirAmbassadeur from './pages/DevenirAmbassadeur';
import Connexion from './pages/Connexion';
import Blog from './pages/Blog';
import EspaceMembres from './pages/EspaceMembres';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Animated Wrapper for Page Transitions
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, delay: 0.05, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

// Combined route transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/students" element={<AnimatedPage><Students /></AnimatedPage>} />
        <Route path="/news" element={<AnimatedPage><News /></AnimatedPage>} />
        <Route path="/news/:id" element={<AnimatedPage><NewsDetail /></AnimatedPage>} />
        <Route path="/clubs" element={<AnimatedPage><Clubs /></AnimatedPage>} />
        <Route path="/clubs/:id" element={<AnimatedPage><ClubDetail /></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
        <Route path="/projects/:id" element={<AnimatedPage><ProjectDetail /></AnimatedPage>} />
        <Route path="/formations" element={<AnimatedPage><Formations /></AnimatedPage>} />
        <Route path="/events" element={<AnimatedPage><Events /></AnimatedPage>} />
        <Route path="/researchers" element={<AnimatedPage><ResearcherProfile /></AnimatedPage>} />
        <Route path="/members" element={<AnimatedPage><Members /></AnimatedPage>} />
        <Route path="/help" element={<AnimatedPage><Help /></AnimatedPage>} />
        
        {/* Dynamic & Immersive UI Specified Routes */}
        <Route path="/devenir-ambassadeur" element={<AnimatedPage><DevenirAmbassadeur /></AnimatedPage>} />
        <Route path="/connexion" element={<AnimatedPage><Connexion /></AnimatedPage>} />
        <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
        
        <Route 
          path="/espace-membre" 
          element={
            <AuthGuard>
              <AnimatedPage>
                <EspaceMembres />
              </AnimatedPage>
            </AuthGuard>
          } 
        />
        
        <Route path="/profil" element={<AnimatedPage><ResearcherProfile /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Help /></AnimatedPage>} />

        {/* Protected Member Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <AuthGuard>
              <AnimatedPage>
                <Dashboard />
              </AnimatedPage>
            </AuthGuard>
          } 
        />
        
        {/* Fallback router */}
        <Route path="*" element={<AnimatedPage><Home /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Custom Cursor mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, select, input, textarea, [role="button"]') !== null;
      setIsHovered(isClickable);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#0D0F14] text-[#F0F4FF] selection:bg-cyan/20 selection:text-cyan antialiased md:cursor-none relative overflow-x-hidden">
          {/* Dynamic background kinetic orbs */}
          <OrbField />

          {/* Immersive UI Radial Glow Background Accent */}
          <div className="absolute top-0 left-0 right-0 h-[650px] z-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 10%, #2B7FFF 0%, transparent 60%)' }} />

          {/* Custom Cursor */}
          <div 
            className={`custom-cursor hidden pointer-events-none md:block ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`
            }}
          />

          {/* Main Layout Navigation */}
          <Navbar />
          
          <main className="relative z-10 w-full">
            <AnimatedRoutes />
          </main>

          {/* Master Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
