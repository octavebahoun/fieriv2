import React from 'react';
import { EventItem } from '../types';
import { TiltCard } from './TiltCard';
import { MonoLabel } from './MonoLabel';
import { Badge } from './Badge';
import { MapPin, Clock, Ticket } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onSelect?: (id: number) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <TiltCard onClick={() => onSelect?.(event.id)}>
      <div className="flex justify-between items-start mb-4">
        <MonoLabel>{`// TYPE_${event.type.toUpperCase()}`}</MonoLabel>
        <Badge status={event.status} />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold font-sans text-white group-hover:text-cyan transition-colors">
          {event.title}
        </h3>
        
        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan" />
            <span>{event.date} à {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <MapPin className="w-3.5 h-3.5 text-cyan" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 pt-4 mt-auto flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Ticket className="w-4 h-4 text-cyan" />
          <span>
            {event.remaining} places restantes (sur {event.spots})
          </span>
        </div>
        <button 
          className="bg-bg-surface hover:bg-cyan/10 text-cyan hover:text-white border border-border hover:border-cyan text-xs px-3 py-1.5 rounded transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Demande d'inscription enregistrée pour: ${event.title}`);
          }}
        >
          S'inscrire
        </button>
      </div>
    </TiltCard>
  );
};

export default EventCard;
