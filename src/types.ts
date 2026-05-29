export interface Stats {
  members: number;
  publications: number;
  patents: number;
  events: number;
}

export interface Project {
  id: number;
  title: string;
  theme: string;
  status: 'en cours' | 'terminé';
  summary: string;
  team: string[];
  featured: boolean;
}

export interface NewsItem {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  summary: string;
  featured: boolean;
}

export interface Club {
  id: number;
  name: string;
  discipline: string;
  university: string;
  members: number;
  publications: number;
}

export interface Formation {
  id: number;
  title: string;
  theme: string;
  level: string;
  date: string;
  spots: number;
  remaining: number;
  instructors: string[];
}

export interface EventItem {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  spots: number;
  remaining: number;
  status: 'upcoming' | 'live' | 'completed';
}

export interface Researcher {
  id: number;
  name: string;
  title: string;
  university: string;
  specialties: string[];
  publications: number;
  projects: number;
}

export interface Member {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  branchId?: number | string;
  branchName?: string;
  universityName?: string;
  countryName?: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface University {
  id: number;
  name: string;
  countryId: number;
}

export interface Branch {
  id: number;
  name: string;
  universityId: number;
}
