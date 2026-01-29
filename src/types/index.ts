// Type definitions for portfolio data
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  featured?: boolean;
  completedAt?: Date;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price?: number;
  duration?: string;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number; // 0-100
  category: string;
  icon?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}