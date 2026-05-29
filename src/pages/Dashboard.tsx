import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MonoLabel } from '../components/MonoLabel';
import { Terminal, Cpu, Database, Award, ShieldAlert, CheckCircle, RefreshCw, Layers } from 'lucide-react';
import * as orgApi from '../api/organization';

export const Dashboard: React.FC = () => {
  const { member, logoutMember, refreshMember } = useAuth();
  
  // Real branch and university resolve states
  const [branchDetail, setBranchDetail] = useState<any>(null);
  const [uniDetail, setUniDetail] = useState<any>(null);
  const [countryDetail, setCountryDetail] = useState<any>(null);
  const [loadingContext, setLoadingContext] = useState(false);

  // Load branch hierarchy details dynamically
  useEffect(() => {
    const resolveMetadata = async () => {
      if (!member || !member.branchId) return;
      setLoadingContext(true);
      try {
        const branch = await orgApi.getBranch(member.branchId);
        setBranchDetail(branch);
        
        if (branch && branch.universityId) {
          const uni = await orgApi.getUniversity(branch.universityId);
          setUniDetail(uni);
          
          if (uni && uni.countryId) {
            const country = await orgApi.getCountry(uni.countryId);
            setCountryDetail(country);
          }
        }
      } catch (err) {
        console.warn("Could not resolve real branch metadata from API. Using dynamic simulated fallbacks.");
        // Fallback simulated metadata matching selected branch ID
        setBranchDetail({ id: member.branchId, name: `Secteur Recherche ID #${member.branchId}` });
        setUniDetail({ id: 10, name: "Université de Recherche locale d'Afrique de l'Ouest" });
        setCountryDetail({ id: 1, name: "Afrique de l'Ouest" });
      } finally {
        setLoadingContext(false);
      }
    };

    resolveMetadata();
  }, [member]);

  // Terminal commands simulator
  const [consoleLog, setConsoleLog] = useState<string[]>([
    "Initializing secure shell session...",
    `Auth token validated: fieri_token_active (SHA-256)`,
    "Connection established with master cluster //backend-fieri.vercel.app"
  ]);
  const [commandInput, setCommandInput] = useState('');

  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    
    const cmd = commandInput.trim().toLowerCase();
    let response = `Unknown command: '${cmd}'. Type 'help' for available commands.`;
    
    if (cmd === 'help') {
      response = "Available: 'help', 'clear', 'status', 'gpu-info', 'publications'";
    } else if (cmd === 'clear') {
      setConsoleLog([]);
      setCommandInput('');
      return;
    } else if (cmd === 'status') {
      response = `MEMBER: ${member?.firstName} ${member?.lastName} || BRANCH: ${branchDetail?.name || 'Inconnue'} || STATUS: ONLINE`;
    } else if (cmd === 'gpu-info') {
      response = "CLUSTER: West-Africa-G1 || SHARDS: 4 || USED: 42% || AVAIL: 58% [RTX 4095 Ti Nodes]";
    } else if (cmd === 'publications') {
      response = "INDEX: FIERI_INDEX_V3 // ACTIVE: 3 list // READS: 1478";
    }

    setConsoleLog(prev => [...prev, `fieri-usr@root:~$ ${commandInput}`, response]);
    setCommandInput('');
  };

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-gradient-to-r from-bg-card to-bg-surface border border-border p-6 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan/5 rounded-full filter blur-[70px] pointer-events-none" />
          
          <div>
            <MonoLabel className="mb-1">// CORE_RESEARCHER_IDENTIFICATION</MonoLabel>
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase font-sans">
              SALUTATIONS, {member?.firstName || "MEMBRE"} {member?.lastName || ""}
            </h1>
            <p className="text-xs text-text-secondary mt-1 font-mono uppercase">
              RÉSEAU : <span className="text-cyan">{countryDetail?.name || "Afrique de l'Ouest"}</span> 
              {" · "} AFFILIATION : <span className="text-cyan">{uniDetail?.name || "Université Locale"}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={refreshMember}
              className="px-3.5 py-2 rounded bg-bg-surface border border-border text-xs font-mono text-cyan hover:border-cyan transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> SYNCHRONISER
            </button>
            <button 
              onClick={logoutMember}
              className="px-3.5 py-2 rounded border border-red-500/30 text-xs font-mono text-red-400 hover:bg-red-500/10 transition-all uppercase"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main system / left */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive console */}
            <div className="bg-[#0b0c10] border border-border rounded-lg overflow-hidden flex flex-col h-[340px]">
              <div className="bg-bg-card px-4 py-2 flex justify-between items-center border-b border-border font-mono text-[10px] text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan animate-pulse" />
                  SHELL INTERACTIF // FIERI_OS_V1.2
                </span>
                <span className="text-[9px] bg-cyan/10 text-cyan border border-cyan/20 px-1.5 py-0.5 rounded uppercase">
                  Connected
                </span>
              </div>

              {/* Console log box */}
              <div className="p-4 flex-1 overflow-y-auto font-mono text-[11px] text-green-400 space-y-1.5 bg-black/60 custom-scrollbar-thin">
                {consoleLog.map((log, index) => (
                  <p key={index} className="leading-relaxed whitespace-pre-wrap">{log}</p>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={executeCommand} className="border-t border-border bg-[#0d0e12] px-4 py-3 flex gap-2 items-center">
                <span className="text-xs font-mono text-cyan select-none">fieri-usr@root:~$</span>
                <input
                  type="text"
                  placeholder="Tapez 'help' pour les commandes disponibles..."
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  className="flex-1 bg-transparent font-mono text-xs text-white outline-none border-none py-0.5"
                />
              </form>
            </div>

            {/* Simulated research checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-bg-card border border-border p-6 rounded-lg">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu className="w-4.5 h-4.5 text-cyan" />
                  Ressources Labo
                </h3>
                <div className="space-y-3 font-mono text-xs text-text-secondary leading-normal">
                  <div className="flex justify-between border-b border-border/40 pb-2">
                    <span>Cluster Calcul</span>
                    <span className="text-green-400">Node_West_Africa #1 (Activé)</span>
                  </div>
                  <div className="flex justify-between border-b border-border/40 pb-2">
                    <span>Stockage Cloud NFS</span>
                    <span className="text-green-400">10GB / 10GB Surchargé (Ok)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Clé d'API Interne</span>
                    <span className="text-cyan">fieri_usr_key_***b39f (Valide)</span>
                  </div>
                </div>
              </div>

              <div className="bg-bg-card border border-border p-6 rounded-lg">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-cyan" />
                  Statut de ma Branche
                </h3>
                <div className="space-y-2 text-xs leading-relaxed text-text-secondary">
                  <div>
                    <span className="text-[10px] font-mono text-cyan uppercase block">// BRANCHE_ID_REF</span>
                    <span className="text-white font-semibold font-mono">#{member?.branchId || "101"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan uppercase block">// DESIGNATION</span>
                    <span className="text-white font-semibold">{branchDetail?.name || "Recherche et Développement"}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right sidebar info */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Membership badge */}
            <div className="bg-bg-card border border-border p-6 rounded-lg text-center relative overflow-hidden">
              <div className="w-16 h-16 bg-cyan/10 border border-cyan/30 rounded-full flex items-center justify-center text-cyan mx-auto mb-4 font-mono font-bold text-xl">
                FR
              </div>
              
              <MonoLabel className="mb-1">// ID_CARD_VERIFIED</MonoLabel>
              <h4 className="text-base font-bold text-white uppercase font-sans">
                {member?.firstName} {member?.lastName}
              </h4>
              <p className="text-[10px] font-mono text-text-muted uppercase mt-0.5">
                Membre d'excellence
              </p>

              <div className="border-t border-border/40 pt-4 mt-4 grid grid-cols-2 gap-2 text-left text-xs font-mono">
                <div>
                  <span className="text-[9px] text-text-muted block uppercase">Rang</span>
                  <span className="text-cyan font-bold">Chercheur</span>
                </div>
                <div>
                  <span className="text-[9px] text-text-muted block uppercase">Compte</span>
                  <span className="text-cyan font-bold">Vérifié ✓</span>
                </div>
              </div>
            </div>

            {/* Certifications and credentials checkup */}
            <div className="bg-bg-card border border-border p-6 rounded-lg space-y-4">
              <h3 className="text-xs font-mono text-cyan uppercase tracking-wider">// CHECKS_SCIENTIFIQUES</h3>
              
              <div className="space-y-3.5 text-xs text-text-secondary leading-normal">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span>Test de raccordement réseau au Cloud validé.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <span>Fiche biographique publiée au catalogue d'excellence Ouest-Africain.</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <span>Soumettez un article scientifique pour obtenir le badge de chercheur émérite.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
