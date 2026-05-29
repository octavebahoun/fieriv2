import React from 'react';
import { MonoLabel } from '../components/MonoLabel';
import { Award, BookOpen, Cpu, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Students: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// ACADEMIC_GRANTS_AND_BENEFITS</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">AVANTAGES ET RESSOURCES ÉTUDIANTS</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            FIERI Research se concentre sur l'élévation du niveau scientifique des étudiants d'Afrique de l'Ouest. En devenant membre actif de nos clubs affiliés, vous accédez à des ressources inestimables.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          <div className="bg-bg-card border border-border p-6 rounded-lg hover:border-cyan/50 transition-all duration-300">
            <div className="p-3 bg-cyan/10 border border-cyan/20 rounded-md w-12 h-12 flex items-center justify-center text-cyan mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-sans">Crédits de Calcul GPU</h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              Vos projets de fin d'études ou de recherche académique nécessitent de l'entraînement de modèles ? Obtenez des ressources cloud sécurisées sur nos grappes de serveurs régionales.
            </p>
          </div>

          <div className="bg-bg-card border border-border p-6 rounded-lg hover:border-cyan/50 transition-all duration-300">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md w-12 h-12 flex items-center justify-center text-green-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-sans">Bourses de Mémoire</h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              Chaque année, FIERI accorde des bourses de fin de cycle aux meilleurs étudiants des clubs d'excellence pour financer la rédaction de leur mémoire en IA ou Cybersécurité.
            </p>
          </div>

          <div className="bg-bg-card border border-border p-6 rounded-lg hover:border-cyan/50 transition-all duration-300">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md w-12 h-12 flex items-center justify-center text-blue-400 mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-sans">Publication Scientifique</h3>
            <p className="text-xs text-text-secondary mt-2 leading-relaxed">
              Bénéficiez de la relecture de vos abstracts et papiers par notre comité scientifique de docteurs pour postuler aux plus grandes conférences internationales.
            </p>
          </div>

        </div>

        {/* Roadmap Steps */}
        <section className="bg-bg-card border border-border p-8 rounded-lg mb-16">
          <div className="mb-8">
            <MonoLabel>// PIPELINE_STEPS</MonoLabel>
            <h3 className="text-xl font-bold text-white font-sans mt-1 uppercase">Comment en bénéficier ?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-text-secondary">
            <div className="space-y-2">
              <span className="font-mono text-cyan text-base font-bold">01.</span>
              <h4 className="text-white font-semibold uppercase">Rejoindre un club</h4>
              <p className="leading-relaxed">Inscris-toi sur notre plateforme en sélectionnant ton université d'origine et la cellule locale.</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-cyan text-base font-bold">02.</span>
              <h4 className="text-white font-semibold uppercase">Contribuer au code</h4>
              <p className="leading-relaxed">Prends part aux projets scientifiques en modifiant, écrivant et validant des repositories libres.</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-cyan text-base font-bold">03.</span>
              <h4 className="text-white font-semibold uppercase">Postuler aux ressources</h4>
              <p className="leading-relaxed">Soumets ta demande motivée avec l'abstract de ton projet pour obtenir GPU ou subvention financière.</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-cyan text-base font-bold">04.</span>
              <h4 className="text-white font-semibold uppercase">Soutenir & Publier</h4>
              <p className="leading-relaxed">Présente tes prototypes devant les jurys universitaires ou profs lors de nos sommets annuels.</p>
            </div>
          </div>
        </section>

        {/* Bottom Call to action banner */}
        <section className="bg-gradient-to-r from-bg-card to-bg-surface border border-accent/20 p-8 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <MonoLabel>// S'ENGAGER</MonoLabel>
            <h3 className="text-lg font-bold text-white uppercase mt-1">Prêt à accélérer ton excellence scientifique ?</h3>
            <p className="text-xs text-text-secondary mt-1 max-w-xl">
              Fais valider ton profil et commence à collaborer dès aujourd'hui avec d'autres étudiants passionnés de la sous-région.
            </p>
          </div>
          <Link 
            to="/members" 
            className="px-6 py-3 rounded bg-accent hover:bg-accent-hover text-white text-xs font-semibold whitespace-nowrap uppercase tracking-wider flex items-center gap-2 group transition-all"
          >
            Créer ma fiche chercheur 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Students;
