import React, { useState } from 'react';
import { MonoLabel } from '../components/MonoLabel';
import { ShieldCheck, HelpCircle, Mail, Globe, MapPin, Send } from 'lucide-react';

export const Help: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }
    // Simulate API POST /contact
    setSent(true);
    setTimeout(() => {
      alert("Votre message de support a été envoyé avec succès à l'équipe FIERI Research.");
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 400);
  };

  const faqs = [
    {
      q: "Comment puis-je rejoindre un club FIERI ?",
      a: "Vous devez vous enregistrer dans l'onglet 'S'Inscrire' de notre réseau Membre, sélectionner votre université et la branche ID correspondante. Votre club local vous contactera après validation."
    },
    {
      q: "Les formations sont-elles payantes ?",
      a: "Non, toutes les formations organisées par FIERI Research sont entièrement gratuites pour les étudiants régulièrement inscrits et affiliés au réseau."
    },
    {
      q: "Puis-je fonder un nouveau club dans mon école ?",
      a: "Absolument. Si votre école ou institut n'est pas encore affilié, vous pouvez remplir notre formulaire de contact ci-dessous pour lancer une demande de charte FIERI."
    }
  ];

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <MonoLabel>// TECH_SUPPORT_CENTER</MonoLabel>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-white mt-1">AIDE & SUPPORT SCIENTIFIQUE</h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Consultez nos réponses aux questions fréquentes ou contactez directement l'équipe de support FIERI si vous rencontrez d'autres difficultés.
          </p>
        </div>

        {/* FAQ list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white uppercase font-sans flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan" /> FAQ Scientifique
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-bg-card border border-border p-5 rounded-lg">
                  <h4 className="text-sm font-bold text-white mb-2">{faq.q}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-bg-card border border-border p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white uppercase font-sans flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-cyan" /> Formulaire de Contact
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// VOTRE_NOM</label>
                <input
                  type="text"
                  placeholder="Ex: Amavi Dossou"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// MON_EMAIL</label>
                <input
                  type="email"
                  placeholder="Ex: amavi@student.uac.bj"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// VOTRE_MESSAGE</label>
                <textarea
                  placeholder="Expliquez-nous en quoi nous pouvons vous assister..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="w-full py-2.5 bg-accent hover:bg-accent-hover disabled:bg-accent-hover text-white text-xs font-semibold rounded uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all outline-none"
              >
                <Send className="w-3.5 h-3.5" />
                {sent ? "Envoi en cours..." : "Transmettre le message"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Help;
