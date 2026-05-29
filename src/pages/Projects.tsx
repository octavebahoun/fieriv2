import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../mock/data';
import { ProjectCard } from '../components/ProjectCard';
import { MonoLabel } from '../components/MonoLabel';
import { Grid, Eye, Search, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [themeFilter, setThemeFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique themes from our dataset
  const themes = ['Tous', ...Array.from(new Set(mockProjects.map(p => p.theme)))];
  const statuses = ['Tous', 'en cours', 'terminé'];

  const filteredProjects = mockProjects.filter((p) => {
    const matchesTheme = themeFilter === 'Tous' || p.theme === themeFilter;
    const matchesStatus = statusFilter === 'Tous' || p.status === statusFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTheme && matchesStatus && matchesSearch;
  });

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <MonoLabel>// ACADEMIC_PROTOTYPES</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">PROJETS DE RECHERCHE</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Consultez les projets d'innovation et travaux scientifiques menés par nos clubs d'étudiants d'excellence et encadrés par des enseignants-chercheurs de la sous-région.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="bg-bg-card border border-border p-6 rounded-lg mb-8 flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Theme filter */}
            <div className="flex flex-col gap-1.5 min-w-[150px]">
              <span className="text-[10px] font-mono text-text-muted uppercase">FILTRE THÉMATIQUE</span>
              <div className="flex flex-wrap gap-2">
                {themes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => setThemeFilter(theme)}
                    className={`px-3 py-1.5 text-xs rounded font-medium border transition-all ${
                      themeFilter === theme 
                        ? 'bg-accent/20 border-cyan text-cyan' 
                        : 'bg-bg-surface border-border text-text-secondary hover:text-white'
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            {/* Status filter */}
            <div className="flex flex-col gap-1.5 min-w-[150px] ml-0 lg:ml-4">
              <span className="text-[10px] font-mono text-text-muted uppercase">STATUT</span>
              <div className="flex gap-2">
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-xs rounded font-medium border uppercase transition-all ${
                      statusFilter === status 
                        ? 'bg-accent/20 border-cyan text-cyan' 
                        : 'bg-bg-surface border-border text-text-secondary hover:text-white'
                    }`}
                  >
                    {status === 'Tous' ? 'Tous' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex flex-col gap-1.5 justify-end">
            <span className="text-[10px] font-mono text-text-muted uppercase">RECHERCHE</span>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Ex. paludisme, blockchain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-64 bg-bg-surface border border-border focus:border-cyan text-white pl-9 pr-4 py-2 rounded text-xs outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Results layout */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <ProjectCard 
                key={p.id} 
                project={p} 
                onSelect={(id) => navigate(`/projects/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-bg-card border border-border p-12 text-center rounded-lg">
            <Layers className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <span className="text-sm font-mono text-text-secondary">// AUCUN_PROJET_TROUVÉ</span>
            <p className="text-xs text-text-muted mt-1">Essayez de réinitialiser vos paramètres de filtrage pour explorer d'autres projets.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
