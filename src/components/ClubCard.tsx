import React from 'react';
import { Club } from '../types';
import { TiltCard } from './TiltCard';
import { MonoLabel } from './MonoLabel';
import { Users, BookOpen } from 'lucide-react';

interface ClubCardProps {
  club: Club;
  onSelect?: (id: number) => void;
}

export const ClubCard: React.FC<ClubCardProps> = ({ club, onSelect }) => {
  return (
    <TiltCard onClick={() => onSelect?.(club.id)}>
      <div className="mb-4">
        <MonoLabel>{`// DISC_${club.discipline.toUpperCase().replace(/\s+/g, '_')}`}</MonoLabel>
        <h3 className="text-xl font-bold font-sans text-white mt-2 group-hover:text-cyan transition-colors">
          {club.name}
        </h3>
        <p className="text-xs text-text-secondary font-mono mt-1 uppercase">
          {club.university}
        </p>
      </div>

      <div className="border-t border-border/40 pt-4 mt-auto flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-cyan" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-text-muted uppercase">Membres</span>
            <span className="text-sm text-white font-bold">{club.members}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-cyan" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-text-muted uppercase">Pubs</span>
            <span className="text-sm text-white font-bold">{club.publications}</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ClubCard;
