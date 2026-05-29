import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNews } from '../mock/data';
import { NewsCard } from '../components/NewsCard';
import { MonoLabel } from '../components/MonoLabel';

export const News: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// JOURNAL_OFFICIEL</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">JOURNAL DE PUBLICATION & ACTUALITÉS</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Suivez les réalisations majeures, les annonces de sommets, les résolutions scientifiques et les exploits des étudiants de notre écosystème au Bénin, au Togo et dans toute l'Afrique de l'Ouest.
          </p>
        </div>

        {/* Featured / Big Banner News */}
        {mockNews.filter(n => n.featured).map(featuredItem => (
          <div 
            key={featuredItem.id}
            onClick={() => navigate(`/news/${featuredItem.id}`)}
            className="bg-gradient-to-r from-bg-card to-bg-surface border border-cyan/30 p-8 rounded-lg mb-12 cursor-pointer hover:border-cyan transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan/5 rounded-full filter blur-[80px]" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-[10px] bg-cyan/15 text-cyan border border-cyan/25 px-2.5 py-0.5 rounded font-mono uppercase">
                // ARTICLE PHARE (A LA UNE)
              </span>
              <span className="text-xs font-mono text-cyan">{featuredItem.date}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-bold text-white uppercase group-hover:text-cyan transition-colors mb-4 relative z-10 leading-tight">
              {featuredItem.title}
            </h2>

            <p className="text-sm text-text-secondary max-w-3xl mb-6 relative z-10 leading-relaxed">
              {featuredItem.summary}
            </p>

            <div className="flex items-center gap-2 relative z-10">
              <span className="text-xs text-text-muted font-mono uppercase">Auteur:</span>
              <span className="text-xs text-white font-semibold">{featuredItem.author}</span>
              <span className="text-text-muted text-xs">•</span>
              <span className="text-xs font-mono text-cyan">// LIRE_SUR_LE_HUB</span>
            </div>
          </div>
        ))}

        {/* Normal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map(item => (
            <NewsCard 
              key={item.id} 
              news={item} 
              onSelect={(id) => navigate(`/news/${id}`)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default News;
