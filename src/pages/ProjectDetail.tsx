import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockProjects, mockResearchers } from '../mock/data';
import { MonoLabel } from '../components/MonoLabel';
import { Badge } from '../components/Badge';
import { ArrowLeft, User, Share2, Clipboard, ShieldCheck, Microscope, Database, FileCode } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-bg-card border border-border rounded-lg max-w-sm">
          <MonoLabel className="mb-2">// ERROR_404</MonoLabel>
          <h2 className="text-xl font-bold text-white mb-2">PROJET NON TROUVÉ</h2>
          <p className="text-xs text-text-secondary mb-6">
            L'identifiant du projet scientifique demandé n'existe pas ou a été déplacé.
          </p>
          <Link to="/projects" className="px-4 py-2 bg-accent rounded text-xs font-semibold text-white">
            Retourner aux projets
          </Link>
        </div>
      </div>
    );
  }

  // Find corresponding researchers info if applicable
  const associatedResearchers = mockResearchers.filter(r => 
    project.team.some(member => member.includes(r.name) || r.name.includes(member))
  );

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-text-secondary hover:text-cyan text-xs font-mono mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>// RETOUR_A_LA_LISTE</span>
        </button>

        {/* Project Header */}
        <div className="bg-bg-card border border-border p-8 rounded-lg mb-8 relative overflow-hidden">
          {/* Subtle Radial Blue Glow behind header */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-accent/20 rounded-full filter blur-[80px]" />

          <div className="flex flex-wrap justify-between items-start gap-4 mb-4 relative z-10">
            <MonoLabel>{`// SPECIFICATION_TECH_${project.theme.toUpperCase()}`}</MonoLabel>
            <Badge status={project.status} />
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-4 relative z-10 leading-snug">
            {project.title}
          </h1>

          <p className="text-text-secondary text-sm leading-relaxed max-w-3xl mb-6 relative z-10">
            {project.summary}
          </p>

          <div className="flex flex-wrap items-center gap-6 border-t border-border/40 pt-6 mt-6 relative z-10 text-xs text-text-secondary font-mono">
            <div>
              <span className="text-text-muted block text-[10px] uppercase">Domaine</span>
              <span className="text-white font-semibold">{project.theme}</span>
            </div>
            <div className="h-6 w-px bg-border/40 hidden sm:block"></div>
            <div>
              <span className="text-text-muted block text-[10px] uppercase">Réseau Scientifique</span>
              <span className="text-cyan font-semibold">FIERI West Africa Project</span>
            </div>
          </div>
        </div>

        {/* Detailed Scientific Report Mocked */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Context & Description */}
            <div className="bg-bg-card border border-border p-6 rounded-lg">
              <h2 className="text-lg font-bold font-sans text-white mb-4 uppercase flex items-center gap-2">
                <Microscope className="w-5 h-5 text-cyan" />
                Contexte & Objectifs
              </h2>
              <div className="text-xs text-text-secondary space-y-4 leading-relaxed font-sans mt-2">
                <p>
                  Ce travail scientifique s'inscrit dans le cadre du plan d'accélération numérique de l'Afrique de l'Ouest. En associant des étudiants de masters universitaires et des docteurs émérites, nous créons des systèmes technologiques hautement optimisés répondant aux contraintes locales d'infrastructure énergétique et réseau.
                </p>
                <p>
                  <strong>Les objectifs majeurs du projet sont :</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Formuler un algorithme open-source hautement adapté et parallélisable sur du matériel à faible budget.</li>
                  <li>Déposer un brevet de souveraineté numérique locale auprès de l'OAPI.</li>
                  <li>Inculquer l'excellence en rédaction et expérimentation scientifique aux étudiants membres des clubs affiliés à FIERI.</li>
                </ul>
              </div>
            </div>

            {/* Tech Specifications */}
            <div className="bg-bg-card border border-border p-6 rounded-lg">
              <h2 className="text-lg font-bold font-sans text-white mb-4 uppercase flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan" />
                Ressources et Données d'analyse
              </h2>
              <div className="text-xs text-text-secondary space-y-3 font-mono leading-relaxed">
                <div>
                  <span className="text-cyan text-[10px] uppercase block">// SOURCE_DATASET</span>
                  <span>fieri-internal-publib-data-v10.sqlite3 (124k rows)</span>
                </div>
                <div>
                  <span className="text-cyan text-[10px] uppercase block">// TECH_STACK</span>
                  <span>LlamaCPP, FastAPI, Rust Core SDK, React Native Client, Microcontrollers-IOT (C++)</span>
                </div>
                <div>
                  <span className="text-cyan text-[10px] uppercase block">// ACCURACY_METRIC</span>
                  <span>94.2% ROC-AUC score validate on localized cross-entropy datasets.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Members / Team Section */}
          <div className="space-y-6">
            <div className="bg-bg-card border border-border p-6 rounded-lg">
              <h3 className="text-sm font-mono text-cyan uppercase tracking-wider mb-4">// ÉQUIPE_SCIENTIFIQUE</h3>
              
              <div className="space-y-4">
                {project.team.map((teamMember, index) => {
                  const researcherDetails = associatedResearchers.find(r => teamMember.includes(r.name) || r.name.includes(teamMember));

                  return (
                    <div key={index} className="flex gap-3 text-xs leading-normal">
                      <div className="w-8 h-8 rounded bg-bg-surface border border-border flex items-center justify-center text-cyan shrink-0 font-bold">
                        {teamMember.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">{teamMember}</span>
                        {researcherDetails ? (
                          <>
                            <span className="text-text-muted text-[10px] uppercase">{researcherDetails.title}</span>
                            <Link 
                              to={`/researchers`} 
                              className="text-cyan hover:underline hover:text-cyan-muted text-[10px] font-mono mt-1"
                            >
                              // VOIR_PROFIL
                            </Link>
                          </>
                        ) : (
                          <span className="text-text-muted text-[10px]">Cofondateur Club Étudiant</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions / Share Card */}
            <div className="bg-bg-card border border-border p-6 rounded-lg text-center">
              <span className="font-mono text-text-muted text-[10px] block mb-3">// ACTIONS</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => alert(`Lien de partage du projet copié !`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 border border-border hover:border-cyan text-text-secondary hover:text-white rounded text-xs transition-all font-mono uppercase"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                <button 
                  onClick={() => alert(`Téléchargement de l'Abstract scientifique sollicité`)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-cyan/15 border border-cyan/25 hover:border-cyan hover:bg-cyan/25 text-cyan hover:text-white rounded text-xs transition-all font-mono uppercase"
                >
                  <FileCode className="w-3.5 h-3.5" /> PDF Abstract
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
