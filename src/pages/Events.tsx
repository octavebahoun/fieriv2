import React from 'react';
import { mockEvents } from '../mock/data';
import { EventCard } from '../components/EventCard';
import { MonoLabel } from '../components/MonoLabel';
import { Calendar, Compass, Bell } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// CONFERENCES_AND_SUMMITS</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">ÉVÉNEMENTS & RENCONTRES SCIENTIFIQUES</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            FIERI dynamise l'écosystème de recherche ouest-africain en organisant des sommets de haut niveau, des compétitions de sécurité (CTF) et des hackathons de développement de solutions durables.
          </p>
        </div>

        {/* Live / Upcoming Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mockEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Informative Side Card on HackByIFRI */}
        <div className="bg-bg-card border border-border p-8 rounded-lg relative overflow-hidden">
          <div className="absolute top-1/2 -right-12 w-48 h-48 bg-cyan/10 rounded-full filter blur-[60px] pointer-events-none" />
          
          <div className="flex items-start gap-4 flex-col lg:flex-row justify-between lg:items-center">
            <div className="max-w-2xl">
              <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded font-mono uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                Archives HackByIFRI 2026
              </span>
              <h3 className="text-xl font-bold text-white uppercase font-sans">Hackathon National de Cybersécurité</h3>
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                Revis l'intensité de la grande finale ouest-africaine qui s'est tenue à l'Institut de Formation et de Recherche en Informatique (IFRI). Douze clubs d'élite se sont affrontés durant 36 heures non-stop sur des épreuves d'exploitation binaire, d'ingénierie inverse et de cryptanalyse.
              </p>
            </div>
            <button 
              onClick={() => alert("Chargement de la galerie photo et des résultats...")}
              className="px-5 py-2.5 rounded bg-bg-surface border border-border hover:border-cyan hover:text-cyan text-white text-xs font-semibold whitespace-nowrap tracking-wide uppercase transition-all"
            >
              Voir le palmarès 2026
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Events;
