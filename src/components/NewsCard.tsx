import React from 'react';
import { NewsItem } from '../types';
import { TiltCard } from './TiltCard';
import { MonoLabel } from './MonoLabel';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  onSelect?: (id: number) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, onSelect }) => {
  return (
    <TiltCard onClick={() => onSelect?.(news.id)}>
      <div className="flex justify-between items-start mb-4">
        <MonoLabel>{`// CAT_${news.category.toUpperCase()}`}</MonoLabel>
        <span className="text-[11px] font-mono text-cyan flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {news.date}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold font-sans text-white line-clamp-2 min-h-[3.5rem] leading-snug">
          {news.title}
        </h3>
        <p className="text-sm text-text-secondary mt-2 line-clamp-2 h-10 leading-relaxed">
          {news.summary}
        </p>
      </div>

      <div className="border-t border-border/40 pt-4 mt-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-cyan/10 flex items-center justify-center text-cyan text-xs font-bold border border-cyan/20">
            {news.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Auteur</span>
            <span className="text-xs text-text-secondary font-medium">{news.author}</span>
          </div>
        </div>
        <div className="bg-bg-surface p-2 rounded-full border border-border text-cyan">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </TiltCard>
  );
};

export default NewsCard;
