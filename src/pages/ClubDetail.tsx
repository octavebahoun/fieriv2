import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockClubs, mockProjects } from '../mock/data';
import { MonoLabel } from '../components/MonoLabel';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowLeft, Users, Landmark, BookOpen, Terminal, Sparkles } from 'lucide-react';

export const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const club = mockClubs.find(c => c.id === Number(id));

  if (!club) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-bg-card border border-border rounded-lg max-w-sm">
          <MonoLabel className="mb-2">// ERROR_404</MonoLabel>
          <h2 className="text-xl font-bold text-white mb-2">CLUB NON TROUVÉ</h2>
          <p className="text-xs text-text-secondary mb-6">
            L'identifiant du club universitaire demandé n'existe pas.
          </p>
          <Link to="/clubs" className="px-4 py-2 bg-accent rounded text-xs font-semibold text-white">
            Retourner aux clubs
          </Link>
        </div>
      </div>
    );
  }

  // Find simulated projects associated to this discipline
  const linkedProjects = mockProjects.filter(p => 
    p.theme.toLowerCase() === club.discipline.toLowerCase() ||
    p.summary.toLowerCase().includes(club.discipline.toLowerCase()) || 
    club.discipline.toLowerCase().includes(p.theme.toLowerCase())
  );

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/clubs')}
          className="flex items-center gap-2 text-text-secondary hover:text-cyan text-xs font-mono mb-8 transition-colors animate-pulse"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>// RETOUR_AUX_CLUBS</span>
        </button>

        {/* Club Details Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-bg-card border border-border p-8 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Terminal className="w-40 h-40 text-white" />
              </div>

              <MonoLabel>{`// CELL_METRIC_${club.discipline.toUpperCase().replace(/\s+/g, '_')}`}</MonoLabel>
              <h1 className="text-3xl font-bold text-white mt-2 leading-tight uppercase font-sans mb-3">
                {club.name}
              </h1>
              
              <div className="flex items-center gap-2 text-xs text-cyan font-mono uppercase tracking-wide mb-6">
                <Landmark className="w-4 h-4" />
                <span>Rattaché à : {club.university}</span>
              </div>

              <div className="border-t border-border/40 pt-6 space-y-4">
                <h3 className="text-white text-sm font-bold uppercase tracking-wider font-sans">Mission & Ligne de recherche</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Ce pôle est fondé et animé par les majors de promotion dans le but d'accélérer le partage de connaissances en {club.discipline}. Le club organise des sessions de vulgarisation bimensuelles et propose des projets scientifiques à implémenter en synergie avec les enseignants-chercheurs de l'université d'appui.
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  L'accès à cette division de recherche se fait par sélection académique ou sur présentation d'une preuve de contribution à un projet technologique sous licence libre (Github, Gitlab).
                </p>
              </div>
            </div>

            {/* LinkedIn Projects */}
            <div>
              <h3 className="text-sm font-mono text-cyan uppercase tracking-wider mb-6 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan" />
                // PROJETS_DU_CLUB
              </h3>
              
              {linkedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {linkedProjects.map(proj => (
                    <ProjectCard 
                      key={proj.id} 
                      project={proj} 
                      onSelect={(id) => navigate(`/projects/${id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-bg-card border border-border p-8 rounded text-center">
                  <span className="text-xs text-text-muted font-mono block">// AUCUN_PROJET_ENREGISTRÉ</span>
                  <Link to="/projects" className="text-cyan text-xs hover:underline mt-1 inline-block">
                    Explorer d'autres projets de la communauté →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Club stats sidebar */}
          <div className="space-y-6">
            <div className="bg-bg-card border border-border p-6 rounded-lg">
              <h3 className="text-xs font-mono text-cyan uppercase tracking-wider mb-6">// METRIQUES_CELLULAIRES</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-bg-surface p-3 border border-border rounded">
                  <span className="text-xs text-text-secondary flex items-center gap-1.5 font-sans">
                    <Users className="w-4 h-4 text-cyan" /> Effectif
                  </span>
                  <span className="text-sm font-bold text-white font-mono">{club.members} membres</span>
                </div>

                <div className="flex justify-between items-center bg-bg-surface p-3 border border-border rounded">
                  <span className="text-xs text-text-secondary flex items-center gap-1.5 font-sans">
                    <BookOpen className="w-4 h-4 text-cyan" /> Écrits scientifiques
                  </span>
                  <span className="text-sm font-bold text-white font-mono">{club.publications} publications</span>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border p-6 rounded-lg">
              <span className="font-mono text-text-muted text-[10px] uppercase block mb-3">// REJOINDRE_CE_CLUB</span>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Tu étudies dans cette université et désires obtenir ta carte de chercheur ?
              </p>
              <Link 
                to="/members" 
                className="w-full text-center block py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-semibold rounded uppercase shadow shadow-accent/20 transition-all"
              >
                Soumettre ma candidature
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ClubDetail;
