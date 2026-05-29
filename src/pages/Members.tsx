import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MonoLabel } from '../components/MonoLabel';
import * as orgApi from '../api/organization';
import { Country, University, Branch } from '../types';
import { ShieldCheck, LogIn, UserPlus, Heart, Handshake, Eye, EyeOff, Terminal } from 'lucide-react';

export const Members: React.FC = () => {
  const { loginMember, registerMember, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'don' | 'partenariat'>('login');
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Register states
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [showRegPwd, setShowRegPwd] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSubmitting, setRegSubmitting] = useState(false);

  // Metadata dropdown state
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');

  // Fallbacks if backend doesn't resolve/has CORS issues
  const fallbackCountries: Country[] = [
    { id: 1, name: "Bénin" },
    { id: 2, name: "Togo" },
    { id: 3, name: "Sénégal" }
  ];
  const fallbackUniversities: University[] = [
    { id: 10, name: "UAC (Université d'Abomey-Calavi)", countryId: 1 },
    { id: 11, name: "INSTI Lokossa", countryId: 1 },
    { id: 12, name: "Université de Lomé", countryId: 2 },
    { id: 13, name: "UAM Dakar", countryId: 3 }
  ];
  const fallbackBranches: Branch[] = [
    { id: 101, name: "Branche Cybersécurité", universityId: 10 },
    { id: 102, name: "Branche IA & ML", universityId: 10 },
    { id: 103, name: "Branche Génie Logiciel", universityId: 11 },
    { id: 104, name: "Branche Systèmes cyber-physiques", universityId: 12 },
    { id: 105, name: "Branche IoT & Cloud", universityId: 13 }
  ];

  // Fetch initial countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await orgApi.getCountries();
        setCountries(data || fallbackCountries);
      } catch (err) {
        console.warn("Backend /countries failed. Using offline fallbacks.");
        setCountries(fallbackCountries);
      }
    };
    if (activeTab === 'register') {
      loadCountries();
    }
  }, [activeTab]);

  // Cascading universities
  useEffect(() => {
    const loadUniversities = async () => {
      if (!selectedCountryId) {
        setUniversities([]);
        return;
      }
      try {
        const data = await orgApi.getUniversitiesOfCountry(selectedCountryId);
        setUniversities(data || fallbackUniversities.filter(u => u.countryId === Number(selectedCountryId)));
      } catch (err) {
        setUniversities(fallbackUniversities.filter(u => u.countryId === Number(selectedCountryId)));
      }
    };
    loadUniversities();
    setSelectedUniversityId('');
    setBranches([]);
    setSelectedBranchId('');
  }, [selectedCountryId]);

  // Cascading branches
  useEffect(() => {
    const loadBranches = async () => {
      if (!selectedUniversityId) {
        setBranches([]);
        return;
      }
      try {
        const data = await orgApi.getBranchesOfUniversity(selectedUniversityId);
        setBranches(data || fallbackBranches.filter(b => b.universityId === Number(selectedUniversityId)));
      } catch (err) {
        setBranches(fallbackBranches.filter(b => b.universityId === Number(selectedUniversityId)));
      }
    };
    loadBranches();
    setSelectedBranchId('');
  }, [selectedUniversityId]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginPassword) {
      setLoginError("Tous les champs sont obligatoires.");
      return;
    }
    setLoginSubmitting(true);
    try {
      await loginMember({ email: loginEmail, password: loginPassword });
      navigate('/dashboard');
    } catch (err: any) {
      setLoginError(err?.response?.data?.message || "La connexion a échoué. Veuillez vérifier vos accès.");
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regEmail || !regPassword || !regFirstName || !regLastName || !selectedBranchId) {
      setRegError("Tous les champs (y compris le choix de votre branche universitaire) sont obligatoires.");
      return;
    }
    setRegSubmitting(true);
    try {
      await registerMember({
        email: regEmail,
        password: regPassword,
        firstName: regFirstName,
        lastName: regLastName,
        branchId: Number(selectedBranchId)
      });
      alert("Votre compte de chercheur FIERI a été créé avec succès.");
      navigate('/dashboard');
    } catch (err: any) {
      setRegError(err?.response?.data?.message || "Erreur d'inscription. Cet e-mail est peut-être déjà enregistré.");
    } finally {
      setRegSubmitting(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Informational sidebar */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              <MonoLabel>// MEMBER_ACCESS</MonoLabel>
              <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white mt-1 leading-tight">
                PORTAIL CHERCHEUR UNIFIÉ
              </h1>
              <p className="text-sm text-text-secondary mt-3 leading-relaxed">
                Rejoins l'un des plus grands réseaux universitaires de recherche avancée en informatique d'Afrique de l'Ouest.
              </p>
            </div>

            <div className="bg-bg-card border border-border p-6 rounded-lg space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pourquoi nous rejoindre ?</h3>
              
              <ul className="space-y-3.5 text-xs text-text-secondary leading-relaxed font-sans">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <span><strong>Infrastructure GPU de pointe</strong> : Accès aux serveurs de calcul FIERI pour vos modèles de Deep Learning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <span><strong>Mentorats prestigieux</strong> : Encadrement continu par des docteurs et professionnels chevronnés.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                  <span><strong>Réseau Ouest-Africain</strong> : Collaborez avec des chercheurs du Bénin, du Togo, du Sénégal, et de Côte de d'Ivoire.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Interactive Portal (Tabs & Forms) */}
          <div className="lg:col-span-7">
            <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
              
              {/* Tab headers */}
              <div className="flex border-b border-border font-mono text-xs select-none">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 text-center border-r border-border hover:text-white transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'login' ? 'bg-bg-primary text-cyan border-b border-b-cyan font-bold' : 'text-text-secondary'
                  }`}
                >
                  <LogIn className="w-4 h-4" /> SE CONNECTER
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-4 text-center border-r border-border hover:text-white transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'register' ? 'bg-bg-primary text-cyan border-b border-b-cyan font-bold' : 'text-text-secondary'
                  }`}
                >
                  <UserPlus className="w-4 h-4" /> S'INSCRIRE
                </button>
                <button
                  onClick={() => setActiveTab('don')}
                  className={`flex-1 py-4 text-center border-r border-border hover:text-white transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'don' ? 'bg-bg-primary text-cyan border-b border-b-cyan font-bold' : 'text-text-secondary'
                  }`}
                >
                  <Heart className="w-4 h-4" /> DON
                </button>
                <button
                  onClick={() => setActiveTab('partenariat')}
                  className={`flex-1 py-4 text-center hover:text-white transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'partenariat' ? 'bg-bg-primary text-cyan border-b border-b-cyan font-bold' : 'text-text-secondary'
                  }`}
                >
                  <Handshake className="w-4 h-4" /> PARTENAIRES
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6 sm:p-8">
                
                {/* 1. LOGIN TAB */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <h3 className="text-white text-base font-bold font-sans uppercase">Accéder au Cloud FIERI</h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      Saisissez vos identifiants académiques cryptés pour accéder à l'intranet de publication.
                    </p>

                    {loginError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded font-mono">
                        {loginError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// EMAIL_DE_CONNEXION</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: koffi@fieri-research.org"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// MOT_DE_PASSE</label>
                      <div className="relative">
                        <input
                          type={showLoginPwd ? "text" : "password"}
                          required
                          placeholder="Saisissez votre mot de passe..."
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full bg-bg-surface border border-border focus:border-cyan text-white pl-3 pr-10 py-2 rounded text-xs outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPwd(!showLoginPwd)}
                          className="absolute right-3 top-2.5 text-text-muted hover:text-white"
                        >
                          {showLoginPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loginSubmitting}
                      className="w-full mt-6 py-3 bg-accent hover:bg-accent-hover disabled:bg-accent-hover text-white text-xs font-semibold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Terminal className="w-4 h-4 text-cyan" />
                      {loginSubmitting ? "Authentification..." : "Exécuter l'accès"}
                    </button>
                  </form>
                )}

                {/* 2. REGISTER TAB */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <h3 className="text-white text-base font-bold font-sans uppercase">Créer ma fiche chercheur</h3>
                    
                    {regError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded font-mono">
                        {regError}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// PRÉNOM</label>
                        <input
                          type="text"
                          required
                          placeholder="Koffi"
                          value={regFirstName}
                          onChange={(e) => setRegFirstName(e.target.value)}
                          className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// NOM</label>
                        <input
                          type="text"
                          required
                          placeholder="Agbodji"
                          value={regLastName}
                          onChange={(e) => setRegLastName(e.target.value)}
                          className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// EMAIL_ACADEMIQUE</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: koffi.ag@student.uac.bj"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full bg-bg-surface border border-border focus:border-cyan text-white px-3 py-2 rounded text-xs outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-cyan uppercase mb-1">// MOT_DE_PASSE</label>
                      <div className="relative">
                        <input
                          type={showRegPwd ? "text" : "password"}
                          required
                          placeholder="Minimum 6 caractères"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          className="w-full bg-bg-surface border border-border focus:border-cyan text-white pl-3 pr-10 py-2 rounded text-xs outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPwd(!showRegPwd)}
                          className="absolute right-3 top-2.5 text-text-muted hover:text-white"
                        >
                          {showRegPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Cascading metadata selects */}
                    <div className="border-t border-border/40 pt-4 mt-4 space-y-4">
                      <span className="text-[10px] bg-cyan/15 text-cyan border border-cyan/25 px-2.5 py-0.5 rounded font-mono uppercase">
                        // CIBLAGE_PÉDAGOGIQUE
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Country select */}
                        <div>
                          <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1">Pays</label>
                          <select
                            value={selectedCountryId}
                            onChange={(e) => setSelectedCountryId(e.target.value)}
                            className="w-full bg-bg-surface border border-border focus:border-cyan text-white text-xs px-2.5 py-2 rounded outline-none cursor-pointer"
                          >
                            <option value="">Sélectionner</option>
                            {countries.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* University select */}
                        <div>
                          <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1">Université</label>
                          <select
                            disabled={!selectedCountryId}
                            value={selectedUniversityId}
                            onChange={(e) => setSelectedUniversityId(e.target.value)}
                            className="w-full bg-bg-surface border border-border focus:border-cyan text-white text-xs px-2.5 py-2 rounded outline-none disabled:opacity-40 cursor-pointer"
                          >
                            <option value="">Sélectionner</option>
                            {universities.map(u => (
                              <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                          </select>
                        </div>

                        {/* Branch select */}
                        <div>
                          <label className="block text-[10px] font-mono text-text-secondary uppercase mb-1">Branche</label>
                          <select
                            disabled={!selectedUniversityId}
                            value={selectedBranchId}
                            onChange={(e) => setSelectedBranchId(e.target.value)}
                            className="w-full bg-bg-surface border border-border focus:border-cyan text-white text-xs px-2.5 py-2 rounded outline-none disabled:opacity-40 cursor-pointer"
                          >
                            <option value="">Sélectionner</option>
                            {branches.map(b => (
                              <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={regSubmitting}
                      className="w-full mt-6 py-3 bg-accent hover:bg-accent-hover disabled:bg-accent-hover text-white text-xs font-semibold rounded uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      {regSubmitting ? "Enregistrement cryptographique..." : "Valider mon inscription"}
                    </button>
                  </form>
                )}

                {/* 3. DON TAB */}
                {activeTab === 'don' && (
                  <div className="space-y-4 font-sans text-xs">
                    <h3 className="text-white text-base font-bold uppercase font-sans">Soutenir Fieri Research</h3>
                    <p className="text-text-secondary leading-relaxed">
                      FIERI est une association scientifique d'intérêt public. Votre contribution financière ou de matériel informatique permet de financer du matériel de calcul GPU et des bourses d'études pour la nouvelle génération ouest-africaine.
                    </p>
                    
                    <div className="p-4 bg-bg-surface border border-border rounded space-y-2 mt-4 text-xs font-mono">
                      <span className="text-cyan uppercase block">// METHODES_DE_TRANSFERT_PREMIUM</span>
                      <p>• Mobile Money (MTN / MOOV Bénin - Togo)</p>
                      <p>• Crypto-monnaies (USDT ERC20 / TRC20)</p>
                      <p>• Virement bancaire direct (BOA / Ecobank)</p>
                    </div>

                    <p className="text-text-muted mt-6 text-[11px]">
                      Pour finaliser une promesse de don ou expédier du matériel de laboratoire physique (Raspberry Pi, GPU), contactez le trésorier à : <a href="mailto:treasury@fieri-research.org" className="text-cyan underline">treasury@fieri-research.org</a>
                    </p>
                  </div>
                )}

                {/* 4. PARTNERS TAB */}
                {activeTab === 'partenariat' && (
                  <div className="space-y-4 font-sans text-xs">
                    <h3 className="text-white text-base font-bold uppercase font-sans">Devenir Partenaire Académique ou Tech</h3>
                    <p className="text-text-secondary leading-relaxed">
                      Vous représentez un institut supérieur, un centre d'incubation ou une entreprise de cybersécurité ? Créez des ponts avec notre réseau d'étudiants d'élite.
                    </p>

                    <div className="p-4 bg-bg-surface border border-border rounded space-y-2 text-xs font-mono">
                      <span className="text-cyan uppercase block">// MODALITES_DECOSYSTÈME</span>
                      <p>✔ Accès prioritaire au recrutement de nos majors de filière.</p>
                      <p>✔ Co-supervision académique et d'accréditations de brevets.</p>
                      <p>✔ Parrainage de sessions de worskhops ou de compétitions de CTF.</p>
                    </div>

                    <p className="text-text-muted mt-6 text-[11px]">
                      Entrez en contact avec la cellule de développement des partenariats : <a href="mailto:partnerships@fieri-research.org" className="text-cyan underline">partnerships@fieri-research.org</a>
                    </p>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Members;
