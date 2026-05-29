import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MonoLabel } from '../components/MonoLabel';
import { Award, ShieldCheck, HelpCircle, ArrowRight, CheckCircle, Send, Star, Users, MapPin, Zap } from 'lucide-react';
import siteContent from '../content/siteContent.json';

export const DevenirAmbassadeur: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', region: '', motivation: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.region || !formData.motivation) {
      setError('Tous les champs sont requis.');
      return;
    }
    setError('');
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', region: '', motivation: '' });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.ambassadeur.hero.subtitle}</MonoLabel>
          <h1 className="text-4xl sm:text-5xl font-black font-sans text-white mt-1 uppercase leading-none">
            {siteContent.ambassadeur.hero.title}
          </h1>
          <p className="text-sm text-[#8892A4] mt-4 leading-relaxed">
            {siteContent.ambassadeur.hero.lead}
          </p>
          <div className="mt-6 flex justify-center">
            <a 
              href="#apply-form"
              className="px-6 py-3 rounded bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white text-xs font-bold uppercase transition-all duration-300 shadow-lg shadow-[#2B7FFF]/20 flex items-center gap-2 group"
            >
              {siteContent.ambassadeur.hero.cta.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Why Grid */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <MonoLabel className="text-[#00D4FF]">// IMPACT_PILLARS</MonoLabel>
            <h2 className="text-2xl font-bold font-sans text-white uppercase mt-1">
              {siteContent.ambassadeur.why.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.ambassadeur.why.items.map((item, idx) => (
              <div key={idx} className="bg-[#1C2130] border border-[#252D3D] p-5 rounded-[6px] hover:border-[#2B7FFF]/30 transition-all">
                <div className="w-10 h-10 rounded-md bg-[#2B7FFF]/10 border border-[#2B7FFF]/25 text-[#2B7FFF] flex items-center justify-center mb-4">
                  <Star className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white uppercase mb-2 leading-tight">{item.title}</h4>
                <p className="text-xs text-[#8892A4] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Details */}
        <section className="mb-20 bg-[#161A23]/40 border border-[#252D3D] p-8 sm:p-12 rounded-[12px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4FF]/5 rounded-full filter blur-[80px]" />
          
          <div className="max-w-3xl mb-10">
            <MonoLabel className="text-[#00D4FF]">// SCOPE_OF_WORK</MonoLabel>
            <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase mt-1">
              {siteContent.ambassadeur.mission.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#8892A4] mt-2 leading-relaxed">
              {siteContent.ambassadeur.mission.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteContent.ambassadeur.mission.blocks.map((block, idx) => (
              <div key={idx} className="space-y-4">
                <span className="font-mono text-xs text-[#00D4FF] uppercase">// {block.title}</span>
                <ul className="space-y-3">
                  {block.items.map((item, id) => (
                    <li key={id} className="flex gap-2.5 items-start text-xs text-[#8892A4] leading-relaxed">
                      <span className="text-[#2B7FFF] shrink-0">◇</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <MonoLabel className="text-[#2B7FFF]">// ENABLING_RESOURCES</MonoLabel>
            <h2 className="text-2xl font-bold font-sans text-white uppercase mt-1">
              {siteContent.ambassadeur.offer.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteContent.ambassadeur.offer.items.map((item, idx) => (
              <div key={idx} className="bg-[#1C2130] border border-[#252D3D] p-6 rounded-[8px] flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center shrink-0">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1">{item.title}</h4>
                  <p className="text-xs text-[#8892A4] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Setup Steps */}
        <section className="mb-20 text-center">
          <div className="mb-10">
            <MonoLabel className="text-[#00D4FF]">// STEP_BY_STEP</MonoLabel>
            <h2 className="text-2xl font-bold text-white uppercase mt-1">
              {siteContent.ambassadeur.apply.title}
            </h2>
            <p className="text-xs text-[#8892A4] mt-2 max-w-xl mx-auto">
              {siteContent.ambassadeur.apply.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-5xl mx-auto">
            {siteContent.ambassadeur.apply.steps.map((step, idx) => (
              <div key={idx} className="bg-[#161A23] border border-[#252D3D] p-5 rounded relative">
                <span className="font-mono text-xl text-[#00D4FF] font-bold block mb-2">0{idx+1}.</span>
                <h4 className="text-white font-bold text-xs uppercase mb-1">{step.title}</h4>
                <p className="text-xs text-[#8892A4] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form Formulaire */}
        <section id="apply-form" className="max-w-2xl mx-auto bg-[#1C2130] border border-[#252D3D] p-6 sm:p-8 rounded-[12px] mb-24">
          <div className="mb-6 text-center">
            <MonoLabel className="text-[#00D4FF]">// ACCREDITATION_APPLICATION</MonoLabel>
            <h3 className="text-lg font-bold text-white uppercase mt-1">Soumettez votre candidature</h3>
          </div>

          {submitted ? (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-6 rounded text-center text-xs space-y-2 uppercase font-mono py-12">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-400" />
              <p className="font-bold">Candidature enregistrée avec succès !</p>
              <p className="text-[10px] text-[#8892A4] lowercase normal-case">Notre comité d'évaluation examinera vos motivations et vous contactera par email sous 72h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-xs text-red-500 font-mono uppercase">{error}</p>}

              <div>
                <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Aminata Sow"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Email académique / professionnel *</label>
                <input
                  type="email"
                  required
                  placeholder="Ex : aminata@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Région / Université d'affiliation *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Dakar, Sénégal // Université Cheikh Anta Diop"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Pourquoi souhaitez-vous devenir ambassadeur FIERI ? *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Détaillez vos motivations, votre réseau local et l'impact que vous visez..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Postuler mon accréditation <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
};

export default DevenirAmbassadeur;
