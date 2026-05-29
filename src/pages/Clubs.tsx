import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mockClubs } from '../mock/data';
import { ClubCard } from '../components/ClubCard';
import { MonoLabel } from '../components/MonoLabel';
import { Search, Trophy, Landmark } from 'lucide-react';

export const Clubs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [universityFilter, setUniversityFilter] = useState('Tous');

  const universities = ['Tous', 'UAC', 'INSTI Lokossa'];

  const filteredClubs = mockClubs.filter(club => {
    const matchesUniversity = universityFilter === 'Tous' || club.university.includes(universityFilter);
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          club.discipline.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesUniversity && matchesSearch;
  });

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// SCIENTIFIC_CELLS</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">CLUBS & GROUPES DE CHERCHEURS</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Les clubs d'étudiants FIERI constituent des pépinières d'excellence technologique. Ils disposent de leur propre autonomie de recherche et publient régulièrement des travaux à portée régionale.
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-bg-card border border-border p-6 rounded-lg mb-8 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono text-text-muted uppercase">FILTRE UNIVERSITAIRE :</span>
            <div className="flex gap-2">
              {universities.map(uni => (
                <button
                  key={uni}
                  onClick={() => setUniversityFilter(uni)}
                  className={`px-3 py-1 text-xs rounded transition-all font-mono border ${
                    universityFilter === uni 
                      ? 'bg-accent/20 border-cyan text-cyan' 
                      : 'bg-bg-surface border-border text-text-secondary hover:text-white'
                  }`}
                >
                  {uni}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Rechercher par discipline..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-bg-surface border border-border focus:border-cyan text-white pl-9 pr-4 py-2 rounded text-xs outline-none transition-all w-full md:w-64"
            />
          </div>
        </div>

        {/* Grid List */}
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <ClubCard 
                key={club.id} 
                club={club} 
                onSelect={(id) => navigate(`/clubs/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-bg-card border border-border p-12 text-center rounded-lg">
            <Landmark className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <span className="text-sm font-mono text-text-secondary">// AUCUN_LAB_TROUVÉ</span>
            <p className="text-xs text-text-muted mt-1">Aucun club ne correspond à votre recherche universitaire.</p>
          </div>
        )}

        {/* Dynamic CTA at the bottom */}
        <section className="mt-20 bg-gradient-to-r from-bg-card to-bg-surface border border-border p-8 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-xl">
            <MonoLabel>// INITIATIVE_CLUSTERS</MonoLabel>
            <h3 className="text-lg font-bold text-white mt-1 uppercase">Crée un Club FIERI dans ton Université</h3>
            <p className="text-xs text-text-secondary mt-1 max-w-lg">
              Tu es un étudiant passionné de sciences et tu veux fonder une antenne cyber, IA ou réseau dans ton école ? Nous t'accompagnons avec du mentorat et du matériel.
            </p>
          </div>
          <Link 
            to="/members" 
            className="px-6 py-3 rounded bg-accent hover:bg-accent-hover text-white text-xs font-semibold whitespace-nowrap transition-all uppercase"
          >
            Faire une demande d'affiliation
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Clubs;
