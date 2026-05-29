import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockNews } from '../mock/data';
import { MonoLabel } from '../components/MonoLabel';
import { ArrowLeft, Share2, Calendar, User, ShieldAlert, Award } from 'lucide-react';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const newsItem = mockNews.find(n => n.id === Number(id));

  if (!newsItem) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-bg-card border border-border rounded-lg max-w-sm">
          <MonoLabel className="mb-2">// ERROR_404</MonoLabel>
          <h2 className="text-xl font-bold text-white mb-2">ARTICLE NON TROUVÉ</h2>
          <p className="text-xs text-text-secondary mb-6">
            L'identifiant de l'actualité ou de la publication sollicitée n'existe pas.
          </p>
          <Link to="/news" className="px-4 py-2 bg-accent rounded text-xs font-semibold text-white">
            Retourner aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button 
          onClick={() => navigate('/news')}
          className="flex items-center gap-2 text-text-secondary hover:text-cyan text-xs font-mono mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>// RETOUR_A_LA_REDACTION</span>
        </button>

        {/* Article Body */}
        <article className="bg-bg-card border border-border rounded-lg p-8 space-y-6 relative overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-border/40 pb-6 mb-6">
            <MonoLabel>{`// PRESS_${newsItem.category.toUpperCase()}`}</MonoLabel>
            <div className="flex gap-4 text-xs text-text-secondary font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan" /> {newsItem.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan" /> {newsItem.author}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white uppercase leading-normal tracking-tight font-sans">
            {newsItem.title}
          </h1>

          <div className="text-sm text-text-secondary space-y-4 leading-relaxed font-sans">
            <p className="text-white font-medium text-base">
              {newsItem.summary}
            </p>
            <p>
              Cotonou, Bénin — Le déploiement de solutions technologiques de pointe en Afrique de l'Ouest connaît une croissance exponentielle. Grâce à l'implication des clubs scientifiques et d'étudiants affiliés à l'association FIERI Research, de nouvelles perspectives s'ouvrent pour adapter l'Intelligence Artificielle et la Cybersécurité aux spécificités locales.
            </p>
            <p>
              <em>« L'Afrique de l'Ouest ne doit pas seulement consommer la technologie, elle doit la forger. »</em> nous confie l'Équipe FIERI. L'approche collaborative structurée autour de laboratoires décentralisés permet de mutualiser les ressources technologiques clés de différentes universités d'appui pour asseoir une dynamique pérenne de souveraineté et d'innovation.
            </p>
            <blockquote className="border-l-4 border-cyan bg-bg-surface/50 p-4 rounded font-mono text-xs text-cyan">
              // NOTICE : Le rapport technique issu de ces travaux de recherche fera l'objet d'un atelier pratique exhaustif lors du prochain FIERI Research Summit.
            </blockquote>
            <p>
              La plateforme FIERI met à disposition des clubs affiliés des kits IoT et des GPU cloud sécurisés pour leur permettre d'implémenter de manière sécurisée et rigoureuse ces architectures d'excellence. Tous les codes sources validés sont publiés en format open-source.
            </p>
          </div>

          <div className="border-t border-border/40 pt-6 mt-8 flex justify-between items-center text-xs text-text-muted">
            <span>Rédigé par le Pôle Communication FIERI Research</span>
            <button 
              onClick={() => alert("Lien de l'article copié dans votre presse-papier !")}
              className="flex items-center gap-1 py-1.5 px-3 border border-border hover:border-cyan hover:text-white rounded text-xs transition-all font-mono uppercase"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan" /> Partager l'article
            </button>
          </div>
        </article>

      </div>
    </div>
  );
};

export default NewsDetail;
