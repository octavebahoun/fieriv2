import React, { useState } from 'react';
import { MonoLabel } from '../components/MonoLabel';
import { Search, Clock, User, Calendar, BookOpen, Layers, Newspaper } from 'lucide-react';
import siteContent from '../content/siteContent.json';

export const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Dynamically group categories
  const categories = ['Tous', 'Intelligence Artificielle', 'Robotique', 'Éco-énergie', 'Vie du club'];

  const filteredArticles = siteContent.blogPage.articles.filter(article => {
    const matchesCategory = selectedCategory === 'Tous' || article.categorie.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = article.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.extrait.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <MonoLabel className="text-[#00D4FF]">// {siteContent.blogPage.hero.label}</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-sans font-black text-white mt-1 uppercase">
            {siteContent.blogPage.hero.title}
          </h1>
          <p className="text-sm text-[#8892A4] mt-2 leading-relaxed">
            {siteContent.blogPage.hero.description}
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-[#161A23]/60 border border-[#252D3D] p-5 rounded-[8px] mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] font-mono rounded border uppercase transition-all tracking-wider ${
                  selectedCategory === cat 
                    ? 'bg-[#2B7FFF]/10 border-[#2B7FFF] text-[#2B7FFF]' 
                    : 'bg-[#161A23] border-[#252D3D] text-[#8892A4] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8892A4]" />
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161A23] border border-[#252D3D] focus:border-[#2B7FFF] text-white pl-9 pr-4 py-2 rounded text-xs outline-none transition-all placeholder-[#8892A4]/50"
            />
          </div>

        </div>

        {/* Bento Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-20">
            {filteredArticles.map((art, idx) => {
              // Custom span for bento geometry on larger screens
              const isFirst = idx === 0;
              const gridSpan = isFirst 
                ? "md:col-span-4" 
                : idx === 1 
                  ? "md:col-span-2" 
                  : "md:col-span-3";

              return (
                <div 
                  key={idx}
                  className={`bg-[#1C2130] border border-[#252D3D] rounded-[10px] p-6 hover:border-[#00D4FF]/30 transition-all duration-300 flex flex-col justify-between group ${gridSpan}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono">
                        {art.categorie}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-[#8892A4] font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#2B7FFF]" /> {art.date}
                      </div>
                    </div>

                    <h3 className={`font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#00D4FF] transition-colors leading-tight ${isFirst ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                      {art.titre}
                    </h3>

                    <p className="text-xs text-[#8892A4] leading-relaxed mb-6">
                      {art.extrait}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#252D3D] flex justify-between items-center text-[10px] font-mono text-[#8892A4] uppercase">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#2B7FFF]" /> {art.auteur}
                    </span>
                    <span className="bg-[#161A23] border border-[#252D3D] text-white px-2 py-0.5 rounded text-[9px]">
                      PREMIUM READ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#1C2130] border border-[#252D3D] p-12 text-center rounded-lg mb-20">
            <Newspaper className="w-10 h-10 text-[#8892A4]/40 mx-auto mb-3" />
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider block mb-1">// AUCUN_ARTICLE_TROUVÉ</span>
            <p className="text-xs text-[#8892A4]">Aucun écrit ne correspond à vos filtres thématiques.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;
