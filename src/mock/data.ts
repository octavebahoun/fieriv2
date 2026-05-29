import { Stats, Project, NewsItem, Club, Formation, EventItem, Researcher } from '../types';

export const mockStats: Stats = {
  members: 247,
  publications: 89,
  patents: 12,
  events: 34
};

export const mockProjects: Project[] = [
  { 
    id: 1, 
    title: "Détection précoce du paludisme par IA", 
    theme: "Santé", 
    status: "en cours", 
    summary: "Modèle ML pour analyser les images de frottis sanguins et identifier automatiquement les parasites avec une haute précision.", 
    team: ["Dr. Koffi Agbodji", "Amavi B."], 
    featured: true 
  },
  { 
    id: 2, 
    title: "Blockchain pour la traçabilité agricole", 
    theme: "AgriTech", 
    status: "terminé", 
    summary: "Système décentralisé de certification et de traçabilité des récoltes de cajou en Afrique de l'Ouest.", 
    team: ["Yemi A.", "Sonia K."], 
    featured: false 
  },
  { 
    id: 3, 
    title: "Système de prévision des crues", 
    theme: "Environnement", 
    status: "en cours", 
    summary: "Modèle prédictif basé sur des données météo et des capteurs de niveau d'eau IoT installés le long du fleuve Ouémé.", 
    team: ["Prof. Dossou"], 
    featured: false 
  }
];

export const mockNews: NewsItem[] = [
  { 
    id: 1, 
    title: "L'IA au service de la médecine tropicale", 
    author: "Dr. Koffi Agbodji", 
    date: "2026-05-20", 
    category: "Santé", 
    summary: "Nouvelles avancées africaines dans la détection automatisée des maladies infectieuses grâce au deep learning appliqué à l'imagerie microscopique.", 
    featured: true 
  },
  { 
    id: 2, 
    title: "Hackathon HackByIFRI 2026 : les résultats", 
    author: "Équipe FIERI", 
    date: "2026-05-15", 
    category: "Événements", 
    summary: "Retour sur la compétition nationale réunissant 12 équipes finalistes autour de défis de cybersécurité et d'architecture cloud.", 
    featured: false 
  },
  { 
    id: 3, 
    title: "Publication : modèles prédictifs en agriculture", 
    author: "Yemi Adékunlé", 
    date: "2026-05-10", 
    category: "AgriTech", 
    summary: "Résultats préliminaires du projet de traçabilité blockchain appliqué aux micro-coopératives agricoles locales au Bénin.", 
    featured: false 
  }
];

export const mockClubs: Club[] = [
  { 
    id: 1, 
    name: "Lab IA & Machine Learning", 
    discipline: "Intelligence Artificielle", 
    university: "UAC (Université d'Abomey-Calavi)", 
    members: 34, 
    publications: 12 
  },
  { 
    id: 2, 
    name: "Red Team & CTF", 
    discipline: "Cybersécurité", 
    university: "INSTI Lokossa", 
    members: 22, 
    publications: 5 
  },
  { 
    id: 3, 
    name: "Fullstack & Architecture", 
    discipline: "Génie Logiciel", 
    university: "UAC (Université d'Abomey-Calavi)", 
    members: 41, 
    publications: 8 
  }
];

export const mockFormations: Formation[] = [
  { 
    id: 1, 
    title: "RAG avec LangChain", 
    theme: "IA", 
    level: "Intermédiaire", 
    date: "2026-06-10", 
    spots: 20, 
    remaining: 7, 
    instructors: ["Oktav B."] 
  },
  { 
    id: 2, 
    title: "Pentest Web — OWASP Top 10", 
    theme: "Cybersécurité", 
    level: "Avancé", 
    date: "2026-06-20", 
    spots: 15, 
    remaining: 3, 
    instructors: ["Coach RedTeam"] 
  }
];

export const mockEvents: EventItem[] = [
  { 
    id: 1, 
    title: "Conférence IA & Santé Afrique", 
    type: "conférence", 
    date: "2026-06-05", 
    time: "09:00", 
    location: "UAC Cotonou", 
    spots: 200, 
    remaining: 45, 
    status: "upcoming" 
  },
  { 
    id: 2, 
    title: "FIERI Research Summit 2026", 
    type: "summit", 
    date: "2026-07-15", 
    time: "08:00", 
    location: "Cotonou", 
    spots: 500, 
    remaining: 120, 
    status: "upcoming" 
  }
];

export const mockResearchers: Researcher[] = [
  { 
    id: 1, 
    name: "Dr. Koffi Agbodji", 
    title: "Chercheur en IA médicale", 
    university: "UAC (Université d'Abomey-Calavi)", 
    specialties: ["Machine Learning", "Médecine tropicale"], 
    publications: 18, 
    projects: 3 
  },
  { 
    id: 2, 
    name: "Prof. Dossou", 
    title: "Expert en systèmes embarqués", 
    university: "INSTI Lokossa", 
    specialties: ["IoT", "Environnement"], 
    publications: 24, 
    projects: 5 
  }
];
