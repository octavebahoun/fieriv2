import React, { useState } from 'react';
import { mockResearchers } from '../mock/data';
import { MonoLabel } from '../components/MonoLabel';
import { Award, BookOpen, GraduationCap, Microscope, Search } from 'lucide-react';

export const ResearcherProfile: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResearchers = mockResearchers.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// SCIENTIFIC_COMMITTEE</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">COMITÉ ET ENSEIGNANTS-CHERCHEURS</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Découvrez les docteurs et ingénieurs de recherche qui supervisent et authentifient les travaux scientifiques de nos clubs d'excellence. Ils garantissent la rigueur scientifique de chaque publication.
          </p>
        </div>

        {/* Search */}
        <div className="bg-bg-card border border-border p-5 rounded-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-text-secondary font-mono uppercase tracking-wider">
            // EFFECTIF : {mockResearchers.length} CHERCHEURS ENREGISTRÉS
          </span>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Rechercher par nom ou spécialité (IoT, ML...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-bg-surface border border-border focus:border-cyan text-white pl-9 pr-4 py-2 rounded text-xs outline-none transition-all w-full"
            />
          </div>
        </div>

        {/* Researchers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResearchers.map(researcher => (
            <div 
              key={researcher.id}
              className="bg-bg-card border border-border p-6 rounded-lg flex flex-col justify-between hover:border-cyan/40 transition-all duration-300 card-glow-hover"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">{researcher.name}</h3>
                    <p className="text-xs text-cyan font-mono uppercase mt-1 tracking-wider">{researcher.title}</p>
                  </div>
                  <span className="text-[10px] bg-bg-surface text-text-secondary border border-border px-2.5 py-1 rounded font-mono uppercase">
                    {researcher.university}
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {researcher.specialties.map((spec, i) => (
                    <span 
                      key={i}
                      className="text-[10px] bg-cyan/15 text-cyan border border-cyan/20 px-2 py-0.5 rounded font-mono uppercase"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research stats */}
              <div className="border-t border-border/40 pt-4 flex gap-8">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-text-muted uppercase">Publications</span>
                    <span className="text-xs text-white font-bold">{researcher.publications} papiers</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-cyan" />
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-text-muted uppercase">Projets Supervisés</span>
                    <span className="text-xs text-white font-bold">{researcher.projects} actifs</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResearcherProfile;
