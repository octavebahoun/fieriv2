import React from 'react';
import { Formation } from '../types';
import { TiltCard } from './TiltCard';
import { MonoLabel } from './MonoLabel';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

interface FormationCardProps {
  formation: Formation;
  onSelect?: (id: number) => void;
}

export const FormationCard: React.FC<FormationCardProps> = ({ formation, onSelect }) => {
  return (
    <TiltCard onClick={() => onSelect?.(formation.id)}>
      <div className="flex justify-between items-start mb-4">
        <MonoLabel>{`// TECH_${formation.theme.toUpperCase()}`}</MonoLabel>
        <span className="bg-cyan/10 text-cyan border border-cyan/20 px-2 py-0.5 rounded text-[10px] font-mono uppercase">
          {formation.level}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold font-sans text-white group-hover:text-cyan transition-colors">
          {formation.title}
        </h3>
        <p className="text-xs text-text-secondary font-mono mt-2 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-cyan" />
          Session : {formation.date}
        </p>
      </div>

      <div className="border-t border-border/40 pt-4 mt-auto flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs">
          <GraduationCap className="w-4 h-4 text-cyan" />
          <span className="text-text-secondary text-xs">
            {formation.remaining} places sur {formation.spots}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[9px] font-mono text-text-muted uppercase">Instructeur</span>
          <span className="text-xs font-semibold text-white">{formation.instructors.join(', ')}</span>
        </div>
      </div>
    </TiltCard>
  );
};

export default FormationCard;
