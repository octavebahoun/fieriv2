import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Database, Award, ShieldAlert, CheckCircle, 
  RotateCw, Layers, BrainCircuit, ShieldCheck, ChevronRight, 
  Binary, ArrowRight, Zap, Target, Network, BookOpen, Clock, 
  Activity, HelpCircle, Mail, Phone, MapPin, Sparkles, Send,
  Globe, MessageSquare
} from 'lucide-react';
import { MonoLabel } from '../components/MonoLabel';
import { HeroCollage } from '../components/HeroCollage';
import { Magnetic } from '../components/Magnetic';
import siteContent from '../content/siteContent.json';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // Section 10 API / Interactive state for FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Section 11 Interactive Form states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  // Rotating subtitle tags for Hero
  const morphTexts = [
    "Intelligence Artificielle · Cybersécurité · IoT",
    "Recherche Scientifique · Innovation · Impact",
    "Académie · Cité étudiante · Institut R&D"
  ];
  const [morphIndex, setMorphIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % morphTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen pt-20">
      
      {/* SECTION 1: HERO SECTION (SectionAccueil) */}
      <section className="relative z-10 pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* Version / Live tag badge */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 text-[#00D4FF] font-mono text-[10px] tracking-widest uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse"></span>
                {siteContent.hero.badge.label}
              </motion.div>

              {/* Eyebrow Label */}
              <div className="mb-4">
                <span className="font-mono text-[#00D4FF] text-[12px] sm:text-[13px] tracking-widest uppercase">
                  {siteContent.hero.eyebrow.prefix}
                  <span className="text-[#2B7FFF] font-bold"> {siteContent.hero.eyebrow.highlight}</span>
                </span>
              </div>

              {/* Big Header (Arial Black display style as in Immersive UI) */}
              <h1 className="font-sans text-[42px] sm:text-[68px] lg:text-[72px] xl:text-[84px] leading-[0.95] uppercase font-black text-white tracking-tighter">
                FORGE LA <span className="text-[#00D4FF] underline decoration-[#00D4FF]/20">RECHERCHE</span>
                <br/>INNOVE POUR <span className="text-[#2B7FFF]">L'AFRIQUE</span>
              </h1>

              {/* Dynamic rotating subtitle tags */}
              <div className="h-10 mt-6 overflow-hidden flex items-center lg:justify-start justify-center">
                <motion.p
                  key={morphIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                  className="text-xs sm:text-sm text-[#8892A4] font-mono uppercase tracking-[2px] font-semibold"
                >
                  // {morphTexts[morphIndex]}
                </motion.p>
              </div>

              <p className="mt-6 text-[#8892A4] text-base sm:text-lg max-w-xl leading-relaxed lg:max-w-lg">
                {siteContent.hero.description}
              </p>

              {/* Hero CTAs - Wrapped in tactile Magnetic physics wrappers */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <Magnetic>
                  <button 
                    onClick={() => navigate('/projects')}
                    className="bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white px-8 py-3.5 rounded-[6px] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#2B7FFF]/25 hover:scale-[1.02] flex items-center gap-2 group cursor-pointer"
                  >
                    {siteContent.hero.buttons[0].label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Magnetic>
                
                <Magnetic>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('clubs-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="border border-[#252D3D] bg-[#161A23] hover:bg-[#1C2130] text-[#F0F4FF] px-8 py-3.5 rounded-[6px] font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    {siteContent.hero.buttons[1].label}
                  </button>
                </Magnetic>
              </div>

            </div>

            {/* Right Interactive Community Collage Column */}
            <div className="lg:col-span-5 w-full mt-12 lg:mt-0">
              <HeroCollage />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: STATS (SectionStats) - Centered impact banner moved higher */}
      <section className="relative z-10 border-y border-[#252D3D] bg-[#161A23]/30 backdrop-blur-sm py-10 px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteContent.stats.counters.map((counter, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-sans">{counter.value}</span>
                <span className="text-[#00D4FF] text-2xl font-bold font-mono">{counter.suffix}</span>
              </div>
              <span className="font-mono text-[#8892A4] text-[10px] tracking-widest uppercase mt-2">// {counter.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: NOUS DECOUVRIR (SectionNousDecouvrir - Les 3 Entités) */}
      <section id="decouvrir" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-12">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.decouvrir.label}</MonoLabel>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
            {siteContent.decouvrir.title} · <span className="text-[#00D4FF]">{siteContent.decouvrir.subtitle}</span>
          </h2>
          <p className="text-sm text-[#8892A4] max-w-3xl mx-auto mt-4 leading-relaxed">
            {siteContent.decouvrir.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#2B7FFF]/10 border border-[#2B7FFF]/20 px-4 py-2 rounded text-xs text-[#2B7FFF] font-mono uppercase">
            <Target className="w-4 h-4 shrink-0" />
            VISION: {siteContent.decouvrir.vision}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.decouvrir.entities.map((entity, idx) => (
            <div key={entity.id} className="bg-[#161A23]/50 border border-[#252D3D] hover:border-[#2B7FFF]/40 p-6 rounded-[8px] transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#2B7FFF]/30 group-hover:bg-[#2B7FFF] transition-all" />
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-[#8892A4] bg-[#2B7FFF]/10 border border-[#2B7FFF]/20 px-2 py-0.5 rounded tracking-widest">{entity.id}</span>
                <Cpu className="w-5 h-5 text-[#2B7FFF]/60 group-hover:text-[#2B7FFF] transition-colors" />
              </div>
              <h3 className="font-sans text-lg font-bold text-white uppercase mb-3 text-left">{entity.title}</h3>
              <p className="text-[#8892A4] text-xs leading-relaxed text-left">
                {entity.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MISSION (SectionMission - Les 4 Piliers) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#252D3D]/60 mb-24 bg-gradient-to-b from-transparent to-[#161A23]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <MonoLabel className="text-[#00D4FF]">// ENGAGEMENT_FRAMEWORK</MonoLabel>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
              LES PIliers DE NOTRE MISSION
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.mission.pillars.map((pillar, i) => (
              <div key={i} className="bg-[#1C2130]/40 border border-[#252D3D] p-5 rounded-[6px] hover:border-[#00D4FF]/30 transition-all">
                <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/25 flex items-center justify-center font-mono text-xs font-bold mb-4">
                  0{i+1}
                </div>
                <h4 className="text-sm font-bold font-sans text-white uppercase tracking-wider mb-2">{pillar.title}</h4>
                <p className="text-xs text-[#8892A4] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CLUB (SectionClub - Les Laboratoires Spécialisés) */}
      <section id="clubs-section" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-12">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.clubs.heading.label}</MonoLabel>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase max-w-xl mx-auto">
            {siteContent.clubs.heading.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.clubs.club.map((club, idx) => (
            <div key={idx} className="bg-[#1C2130] border border-[#252D3D] p-6 rounded-[8px] hover:border-[#00D4FF]/30 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    {club.kicker}
                  </span>
                  <span className="font-mono text-[#8892A4] text-[9px]">ID: 0{idx+1}</span>
                </div>
                <h3 className="font-bold font-sans text-base text-white mb-2 leading-snug group-hover:text-[#00D4FF] transition-colors uppercase">
                  {club.title}
                </h3>
                <p className="text-[#8892A4] text-xs leading-relaxed mb-4">
                  {club.description}
                </p>
                
                {/* Divisions breakdown */}
                <div className="mb-4">
                  <span className="font-mono text-[9px] text-[#2B7FFF] block uppercase mb-1">// Divisions :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {club.division.map((div, dIdx) => (
                      <span key={dIdx} className="text-[10px] bg-[#161A23] border border-[#252D3D] text-[#8892A4] px-2 py-0.5 rounded">
                        {div}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252D3D] space-y-2 text-xs">
                <div>
                  <span className="text-[#8892A4] font-semibold font-mono text-[10px] block opacity-80 uppercase uppercase">// Projet Phare :</span>
                  <span className="text-[#00D4FF] font-medium">{club.projetPhare}</span>
                </div>
                <div className="text-[10px] text-[#8892A4] italic leading-tight">
                  <span className="font-semibold not-italic">Activités :</span> {club.activites}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: ACTUALITES (SectionActualites - Le Journal) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#252D3D]/50 bg-[#161A23]/10 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <MonoLabel className="text-[#00D4FF]">// {siteContent.actualites.label}</MonoLabel>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
                {siteContent.actualites.title}
              </h2>
            </div>
            <Link 
              to="/blog" 
              className="text-xs text-[#00D4FF] hover:text-white font-mono font-bold tracking-widest uppercase flex items-center gap-1 group"
            >
              EXPLORER LE BLOG // <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.actualites.items.map((news, i) => (
              <div key={i} className="bg-[#1C2130] border border-[#252D3D] p-5 rounded-[8px] hover:border-[#2B7FFF]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] text-[#2B7FFF]">{news.date}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2B7FFF]"></span>
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2 uppercase leading-snug">{news.titre}</h3>
                  <p className="text-xs text-[#8892A4] leading-relaxed mb-4">{news.extrait}</p>
                </div>
                <Link to="/blog" className="text-[11px] font-mono text-[#00D4FF] hover:underline uppercase tracking-wider flex items-center gap-1 mt-auto">
                  Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: HIBLOG (SectionHiBlog - Aperçu Inspirations) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
        <div className="text-center mb-12">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.hiblog.label}</MonoLabel>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
            {siteContent.hiblog.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteContent.hiblog.articles.map((art, idx) => (
            <div key={idx} className="bg-[#161A23] border border-[#252D3D] p-5 rounded-[6px] hover:bg-[#1C2130] transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase block mb-1">/ {art.categorie}</span>
                <h4 className="text-sm font-sans font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug">
                  {art.titre}
                </h4>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[#8892A4] font-mono uppercase mt-4">
                <Clock className="w-3 h-3 text-[#2B7FFF]" /> {art.tempsLecture} de lecture
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: EVENEMENTS (SectionEvenements - Concours & Livestream) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#252D3D]/50 bg-[#161A23]/30 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <MonoLabel className="text-[#2B7FFF]">// {siteContent.evenements.label}</MonoLabel>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
              {siteContent.evenements.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteContent.evenements.blocks.map((block, idx) => (
              <div key={idx} className="bg-[#1C2130] border border-[#252D3D] p-6 rounded-[8px] hover:border-[#2B7FFF]/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-md bg-[#2B7FFF]/10 border border-[#2B7FFF]/20 flex items-center justify-center text-[#2B7FFF] mb-4 font-bold">
                    0{idx+1}
                  </div>
                  <h3 className="font-bold text-base text-white uppercase mb-2">{block.title}</h3>
                  <p className="text-xs text-[#8892A4] leading-relaxed mb-6">{block.description}</p>
                </div>
                
                {/* Dynamically bind button click to routing, avoiding hash issues */}
                <button
                  onClick={() => {
                    if (idx === 0) navigate('/events');
                    else if (idx === 1) navigate('/formations');
                    else navigate('/events');
                  }}
                  className="w-full bg-[#161A23] hover:bg-[#2B7FFF]/15 border border-[#252D3D] hover:border-[#2B7FFF]/40 text-[#F0F4FF] hover:text-white py-2.5 rounded text-xs font-mono uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  {block.cta.label} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PAF (SectionPAF - Accompagnement & Mentorat) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1C2130] border border-[#252D3D] p-8 sm:p-12 rounded-[12px] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2B7FFF]/5 rounded-full filter blur-[80px] pointer-events-none" />

          {/* Left info column */}
          <div className="lg:col-span-5 space-y-4">
            <MonoLabel className="text-[#00D4FF]">// {siteContent.paf.label}</MonoLabel>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white leading-tight uppercase">
              {siteContent.paf.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#8892A4] leading-relaxed">
              {siteContent.paf.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/formations')}
                className="bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-[#00D4FF]/25 text-[#00D4FF] text-xs font-mono uppercase tracking-wider py-2.5 px-5 rounded"
              >
                Explorer le programme académique
              </button>
            </div>
          </div>

          {/* Right features column */}
          <div className="lg:col-span-7 space-y-4">
            {siteContent.paf.features.map((feat, idx) => (
              <div key={idx} className="bg-[#161A23]/60 border border-[#252D3D]/80 p-4 rounded-[6px] hover:border-[#00D4FF]/30 transition-all flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase mb-1">{feat.title}</h4>
                  <p className="text-[11px] text-[#8892A4] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 10: FAQ (SectionFAQ - Accordéon) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-24">
        <div className="text-center mb-12">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.faq.label}</MonoLabel>
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
            {siteContent.faq.title}
          </h2>
        </div>

        <div className="space-y-4">
          {siteContent.faq.questions.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div 
                key={i} 
                className={`bg-[#161A23]/60 border rounded-[6px] transition-all overflow-hidden ${
                  isOpen ? 'border-[#2B7FFF]' : 'border-[#252D3D] hover:border-[#8892A4]/30'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 focus:outline-none flex justify-between items-center gap-4"
                >
                  <span className="text-xs sm:text-sm font-semibold uppercase text-white tracking-wide">{faq.q}</span>
                  <span className="text-lg text-[#00D4FF] font-mono leading-none select-none">{isOpen ? '−' : '+'}</span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs text-[#8892A4] leading-relaxed border-t border-[#252D3D]/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11: CONTACT (SectionContact - Formulaire & Localisation) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 border-t border-[#252D3D]/50 bg-[#161A23]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form details / left */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <MonoLabel className="text-[#00D4FF]">// {siteContent.contact.label}</MonoLabel>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white mt-1 uppercase">
                {siteContent.contact.title}
              </h2>
              <p className="text-xs text-[#8892A4] mt-2 leading-relaxed">
                {siteContent.contact.subtitle}
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3.5 bg-[#161A23] p-4 rounded border border-[#252D3D]">
                <Mail className="w-4 h-4 text-[#00D4FF]" />
                <div>
                  <span className="text-[10px] text-[#8892A4] block uppercase font-mono">// EMAIL</span>
                  <a href={`mailto:${siteContent.contact.info.email}`} className="text-white hover:underline uppercase">{siteContent.contact.info.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-[#161A23] p-4 rounded border border-[#252D3D]">
                <Phone className="w-4 h-4 text-[#00D4FF]" />
                <div>
                  <span className="text-[10px] text-[#8892A4] block uppercase font-mono">// TÉLÉPHONE</span>
                  <a href={`tel:${siteContent.contact.info.tel}`} className="text-white hover:underline">{siteContent.contact.info.tel}</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-[#161A23] p-4 rounded border border-[#252D3D]">
                <MapPin className="w-4 h-4 text-[#00D4FF]" />
                <div>
                  <span className="text-[10px] text-[#8892A4] block uppercase font-mono">// SIÈGE</span>
                  <span className="text-white uppercase">{siteContent.contact.info.adresse}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submission Panel / right */}
          <div className="lg:col-span-7 bg-[#1C2130] border border-[#252D3D] p-6 sm:p-8 rounded-[10px]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2B7FFF]" />
              Formulaire de contact professionnel
            </h3>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded text-center text-xs space-y-2 uppercase font-mono py-12"
              >
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="font-bold">Message transmis avec succès !</p>
                <p className="text-[10px] text-[#8892A4] lowercase normal-case">L'équipe FIERI vous recontactera dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <p className="text-xs text-red-500 font-mono font-bold uppercase">{formError}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Nom Complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nom, Prénoms"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Courriel *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre@adresse.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Objet</label>
                  <input
                    type="text"
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Saisissez votre message académique ou professionnel..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#2B7FFF] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white py-3 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    Transmettre le message <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
