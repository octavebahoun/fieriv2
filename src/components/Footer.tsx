import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Globe, Github, Mail, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand/Logo Area */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/20 border border-cyan/40 rounded flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan" />
              </div>
              <span className="text-lg font-display font-bold text-white tracking-widest uppercase">
                FIERI
              </span>
            </Link>
            <p className="text-xs text-text-secondary leading-relaxed max-w-xs">
              Une initiative scientifique unifiée pour la recherche académique, IA, cybersécurité, et génie logiciel en Afrique de l'Ouest.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-mono text-cyan uppercase tracking-wider mb-4">// NAVIGATION</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li><Link to="/projects" className="hover:text-cyan transition-colors">Projets Scientifiques</Link></li>
              <li><Link to="/clubs" className="hover:text-cyan transition-colors">Clubs Universitaires</Link></li>
              <li><Link to="/formations" className="hover:text-cyan transition-colors">Formations / Workshops</Link></li>
              <li><Link to="/events" className="hover:text-cyan transition-colors">Événements & Sommets</Link></li>
            </ul>
          </div>

          {/* Research Branches or Universities info */}
          <div>
            <h4 className="text-xs font-mono text-cyan uppercase tracking-wider mb-4">// PARTENAIRES</h4>
            <ul className="space-y-2.5 text-sm text-text-secondary font-mono text-[12px]">
              <li>UAC COTONOU - BENIN</li>
              <li>INSTI LOKOSSA - BENIN</li>
              <li>UNIVERSITÉ DE LOMÉ - TOGO</li>
              <li>UAM DAKAR - SÉNÉGAL</li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col">
            <h4 className="text-xs font-mono text-cyan uppercase tracking-wider mb-4">// CONTACT_US</h4>
            <div className="space-y-3 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan" />
                <a href="mailto:contact@fieri-research.org" className="hover:text-cyan transition-colors">
                  contact@fieri-research.org
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan" />
                <span className="text-xs">UAC, Abomey-Calavi, Bénin</span>
              </span>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded bg-bg-surface hover:bg-cyan/10 border border-border text-text-secondary hover:text-cyan transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded bg-bg-surface hover:bg-cyan/10 border border-border text-text-secondary hover:text-cyan transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} FIERI Research. Tous droits réservés.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/help" className="hover:text-cyan transition-colors flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Aide & Support</span>
            </Link>
            <span>v1.2.0-Alpha</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
