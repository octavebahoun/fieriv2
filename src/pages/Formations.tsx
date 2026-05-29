import React from 'react';
import { mockFormations } from '../mock/data';
import { FormationCard } from '../components/FormationCard';
import { MonoLabel } from '../components/MonoLabel';
import { Award, ShieldAlert, CheckCircle } from 'lucide-react';

export const Formations: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// SKILL_ACCELERATORS</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">WORKSHOPS & FORMATIONS</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            FIERI organise des ateliers pratiques intensifs de haut niveau. Ces sessions de perfectionnement technique sont dispensées par des experts reconnus et visent à combler le fossé entre la théorie universitaire et la pratique industrielle.
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-card border border-border p-5 rounded-lg flex items-start gap-4">
            <div className="p-2 bg-cyan/10 border border-cyan/20 rounded text-cyan mt-1">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-sans">Certificats FIERI</h4>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">Chaque atelier validé donne lieu à une certification de niveau, valorisée par nos entreprises partenaires.</p>
            </div>
          </div>

          <div className="bg-bg-card border border-border p-5 rounded-lg flex items-start gap-4">
            <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-green-400 mt-1">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-sans">Accès Gratuit</h4>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">Toutes nos formations sont gratuites pour les membres actifs de nos clubs et universités affiliées.</p>
            </div>
          </div>

          <div className="bg-bg-card border border-border p-5 rounded-lg flex items-start gap-4">
            <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 mt-1">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-sans">Places Limitées</h4>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">Pour maintenir un ratio d'encadrement exceptionnel, le nombre de places est strictement contingenté.</p>
            </div>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFormations.map(formation => (
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="bg-bg-card border border-border p-8 rounded-lg mt-16 text-center max-w-3xl mx-auto">
          <MonoLabel className="mb-2">// SUGGEST_A_WORKSHOP</MonoLabel>
          <h3 className="text-lg font-bold text-white uppercase font-sans">Besoin d'une formation spécifique ?</h3>
          <p className="text-xs text-text-secondary max-w-xl mx-auto mt-2 leading-relaxed">
            Si votre club universitaire souhaite bénéficier d'un workshop dédié (ex: Rust, Cryptographie, DevOps), demandez un accompagnement auprès du bureau FIERI.
          </p>
          <a
            href="mailto:formations@fieri-research.org"
            className="mt-4 inline-block text-cyan font-mono text-xs hover:underline uppercase"
          >
            // Contactez le pôle pédagogique →
          </a>
        </div>

      </div>
    </div>
  );
};

export default Formations;
