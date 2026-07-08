
import { useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface Translations {
  pt: Record<string, string>;
  en: Record<string, string>;
}

const translations: Translations = {
  pt: {
    // Hero Section
    'hero.title': 'Pablo Adriano Maciel Dilio',
    'hero.subtitle': 'Analista de Implantação e Suporte ERP',
    'hero.description': 'Formado em Análise e Desenvolvimento de Sistemas, com experiência na implantação, configuração, parametrização e suporte de sistemas ERP. Conduzo projetos B2B do levantamento de necessidades até a homologação e produção, com foco em módulos fiscais, financeiros, compras, vendas, estoque e transporte.',
    'hero.downloadCV': 'Download CV',
    'hero.contact': 'Entre em Contato',
    
    // Skills Section
    'skills.title': 'Minhas Habilidades',
    'skills.description': 'Conjunto de competências técnicas e comportamentais adquiridas ao longo da minha jornada',
    'skills.technical': 'Técnicas',
    'skills.tools': 'Ferramentas',
    'skills.soft': 'Soft Skills',
    'skills.methodologies': 'Metodologias',
    
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.experience': 'Experiência',
    'nav.contact': 'Contato'
  },
  en: {
    // Hero Section
    'hero.title': 'Pablo Adriano Maciel Dilio',
    'hero.subtitle': 'Full Stack Developer',
    'hero.description': '4th semester ADS student, passionate about technology and full-stack development. Currently working as IT Assistant Jr. at TID Software, focused on expanding knowledge in frontend and backend.',
    'hero.downloadCV': 'Download CV',
    'hero.contact': 'Get in Touch',
    
    // Skills Section
    'skills.title': 'My Skills',
    'skills.description': 'Set of technical and behavioral competencies acquired throughout my journey',
    'skills.technical': 'Technical',
    'skills.tools': 'Tools',
    'skills.soft': 'Soft Skills',
    'skills.methodologies': 'Methodologies',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('pt');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage === 'pt' ? 'pt-BR' : 'en';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return {
    language,
    changeLanguage,
    t
  };
};
