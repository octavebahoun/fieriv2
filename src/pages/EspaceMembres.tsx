import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MonoLabel } from '../components/MonoLabel';
import { 
  Terminal, Cpu, Database, Award, ShieldAlert, CheckCircle, 
  RotateCw, Layers, Send, FileText, Sparkles, LogOut, CheckCircle2 
} from 'lucide-react';
import { Dashboard } from './Dashboard';

export const EspaceMembres: React.FC = () => {
  const { member, isAuthenticated } = useAuth();

  // Project simulation states
  const [activeTab, setActiveTab] = useState<'workspace' | 'patent' | 'projects'>('workspace');
  
  // Patent submission state
  const [patentTitle, setPatentTitle] = useState('');
  const [patentDesc, setPatentDesc] = useState('');
  const [patentDomain, setPatentDomain] = useState('Intelligence Artificielle');
  const [patentSuccess, setPatentSuccess] = useState(false);

  const handlePatentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patentTitle || !patentDesc) return;
    setPatentSuccess(true);
    setTimeout(() => {
      setPatentTitle('');
      setPatentDesc('');
      setPatentSuccess(false);
    }, 4500);
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center px-4">
        <div className="bg-[#1C2130] border border-[#252D3D] p-8 max-w-sm w-full text-center rounded-lg">
          <ShieldAlert className="w-12 h-12 text-[#00D4FF] mx-auto mb-4 animate-bounce" />
          <MonoLabel className="text-[#00D4FF]">// ACCÈS_DÉNIÉ</MonoLabel>
          <h2 className="text-lg font-bold text-white uppercase mt-2">Zone Sécurisée</h2>
          <p className="text-xs text-[#8892A4] mt-2 mb-6">
            Vous devez être connecté (ou inscrit) pour accéder à l'Espace Membre exclusif du FIERI.
          </p>
          <a
            href="#/connexion"
            className="block text-center py-2.5 bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white text-xs font-mono font-bold uppercase rounded tracking-wider"
          >
            Se connecter / S'inscrire
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tabs Navigation */}
        <div className="flex border-b border-[#252D3D] mb-8 font-mono text-xs overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`py-3 px-6 hover:text-white transition-all uppercase tracking-wider ${
              activeTab === 'workspace' ? 'border-b-2 border-[#00D4FF] text-[#00D4FF] font-bold' : 'text-[#8892A4]'
            }`}
          >
            // Console de calcul & Réf
          </button>
          
          <button
            onClick={() => setActiveTab('patent')}
            className={`py-3 px-6 hover:text-white transition-all uppercase tracking-wider ${
              activeTab === 'patent' ? 'border-b-2 border-[#00D4FF] text-[#00D4FF] font-bold' : 'text-[#8892A4]'
            }`}
          >
            // Dépôt de Brevets & Idées
          </button>
          
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-3 px-6 hover:text-white transition-all uppercase tracking-wider ${
              activeTab === 'projects' ? 'border-b-2 border-[#00D4FF] text-[#00D4FF] font-bold' : 'text-[#8892A4]'
            }`}
          >
            // Suivi des Brevets & Projets
          </button>
        </div>

        {/* Tab content renders */}
        {activeTab === 'workspace' && (
          <Dashboard />
        )}

        {activeTab === 'patent' && (
          <div className="max-w-xl mx-auto bg-[#1C2130] border border-[#252D3D] p-6 sm:p-8 rounded-[10px] mb-20">
            <div className="mb-6 text-center">
              <MonoLabel className="text-[#00D4FF]">// PATENT_INTAKE_ENGINE</MonoLabel>
              <h2 className="text-xl font-bold font-sans text-white uppercase mt-1">SOUFFLER UNE IDÉE OU UN PROTO</h2>
              <p className="text-xs text-[#8892A4] mt-1">
                Soumettez un draft technique préliminaire. Nos docteurs affiliés évalueront le niveau de TRL (Technology Readiness Level) sous 7 jours.
              </p>
            </div>

            {patentSuccess ? (
              <div className="bg-[#2B7FFF]/10 border border-[#2B7FFF]/30 text-white p-6 rounded text-center text-xs space-y-2 uppercase font-mono py-12">
                <CheckCircle className="w-8 h-8 text-[#00D4FF] mx-auto mb-2" />
                <p className="font-bold text-[#00D4FF]">Soumission Enregistrée !</p>
                <p className="text-[10px] text-[#8892A4] lowercase normal-case">ID de suivi généré cryptographiquement : <span className="text-white font-mono">fieri-idea-{(Math.random()*10000).toFixed(0)}</span></p>
              </div>
            ) : (
              <form onSubmit={handlePatentSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Titre de l'innovation / projet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex : Capteurs IoT d'humidité autonome"
                    value={patentTitle}
                    onChange={(e) => setPatentTitle(e.target.value)}
                    className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Domaine technologique principal</label>
                  <select
                    value={patentDomain}
                    onChange={(e) => setPatentDomain(e.target.value)}
                    className="w-full bg-[#161A23] border border-[#252D3D] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF] cursor-pointer"
                  >
                    <option value="Intelligence Artificielle">Intelligence Artificielle</option>
                    <option value="IoT et Systèmes embarqués">IoT et Systèmes embarqués</option>
                    <option value="Éco-énergie & Climatisation">Éco-énergie & Climatisation</option>
                    <option value="Construction 4.0">Construction 4.0</option>
                    <option value="Génie Logiciel Avancé">Génie Logiciel Avancé</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#8892A4] block uppercase mb-1">Abstract / Spécification technique succincte *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Détaillez le problème résolu, l'originalité de l'invention, et les composants matériels ou algorithmiques visés..."
                    value={patentDesc}
                    onChange={(e) => setPatentDesc(e.target.value)}
                    className="w-full bg-[#161A23] border border-[#252D3D] rounded px-4 py-2 text-xs text-white focus:outline-none focus:border-[#2B7FFF] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2B7FFF] hover:bg-[#1A6FEF] text-white py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    Soumettre le dossier <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6 max-w-4xl mx-auto mb-20 text-xs">
            <h3 className="text-white text-sm font-bold uppercase mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00D4FF]" />
              Tableau de bord de vos brevets et publications
            </h3>
            
            <div className="bg-[#1C2130] border border-[#252D3D] rounded-[8px] overflow-hidden">
              <div className="bg-[#161A23] px-6 py-3.5 border-b border-[#252D3D] grid grid-cols-12 font-mono text-[10px] text-[#8892A4] uppercase tracking-wider">
                <span className="col-span-4">Innovation / Publication</span>
                <span className="col-span-3">Discipline</span>
                <span className="col-span-3">Date</span>
                <span className="col-span-2 text-right">Statut</span>
              </div>

              <div className="divide-y divide-[#252D3D]/60">
                <div className="px-6 py-4 grid grid-cols-12 items-center">
                  <div className="col-span-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00D4FF]/80 shrink-0" />
                    <div>
                      <span className="text-white font-semibold block">Détecteur de Paludisme Mobile v1</span>
                      <span className="text-[10px] text-[#8892A4]">ID: #90471</span>
                    </div>
                  </div>
                  <span className="col-span-3 text-[#8892A4]">IA / Pathologies</span>
                  <span className="col-span-3 text-[#8892A4]">15 Mai 2026</span>
                  <div className="col-span-2 text-right">
                    <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      En cours (TRL 4)
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 grid grid-cols-12 items-center">
                  <div className="col-span-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00D4FF]/80 shrink-0" />
                    <div>
                      <span className="text-white font-semibold block">Blockchain Cacao Tracker</span>
                      <span className="text-[10px] text-[#8892A4]">ID: #90311</span>
                    </div>
                  </div>
                  <span className="col-span-3 text-[#8892A4]">Blockchain & IoT</span>
                  <span className="col-span-3 text-[#8892A4]">24 Avril 2026</span>
                  <div className="col-span-2 text-right">
                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                      Accepté (TRL 7)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EspaceMembres;
