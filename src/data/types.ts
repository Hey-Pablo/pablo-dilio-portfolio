export interface Project {
  id: number;
  title: string;
  description: string;
  category: "fullstack" | "frontend" | "backend" | string;
  technologies: string[];
  status: string;
  images?: string[];
  link?: string;
  expiresText?: string;
}

export interface EducationItem {
  institution: string;
  course: string;
  period: string;
  status: string;
  description?: string;
  highlights: string[];
}

export interface TechnicalCourse {
  institution: string;
  course: string;
  period: string;
  status: string;
  highlights: string[];
}

export interface Certificate {
  id: number | string;
  title: string;
  institution: string;
  date: string;
  status: string;
  skills: string[];
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  type: "ti" | "administrativo" | "vendas" | string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}
