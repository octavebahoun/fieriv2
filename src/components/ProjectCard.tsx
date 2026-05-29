import React from 'react';
import { Project } from '../types';
import { TiltCard } from './TiltCard';
import { MonoLabel } from './MonoLabel';
import { Badge } from './Badge';
import { Microscope, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect?: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <TiltCard onClick={() => onSelect?.(project.id)}>
      <div className="flex justify-between items-start mb-4">
        <MonoLabel>{`// THEME_${project.theme.toUpperCase()}`}</MonoLabel>
        <Badge status={project.status} />
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-bold font-sans text-white line-clamp-1 group-hover:text-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary mt-2 line-clamp-2 h-10 leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="border-t border-border/40 pt-4 mt-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Chercheurs</span>
          <span className="text-xs text-text-secondary line-clamp-1 mt-0.5 font-medium">
            {project.team.join(", ")}
          </span>
        </div>
        <div className="bg-bg-surface p-2 rounded-full border border-border group-hover:border-cyan text-text-muted group-hover:text-cyan transition-all">
          <ArrowUpRight className="w-4 h-4 text-cyan" />
        </div>
      </div>
    </TiltCard>
  );
};

export default ProjectCard;
