export interface CaseStudy {
  number: string;
  projectTitle: string;
  projectId: number;
  label: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  evidence: string[];
  technologies: string[];
  access: string;
}

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    projectTitle: "Base de Conhecimento",
    projectId: 7,
    label: "Suporte e processos",
    title: "Transformar procedimentos recorrentes em conhecimento pesquisável",
    summary:
      "Um portal para organizar procedimentos, categorias e artigos de suporte em um fluxo mais fácil de consultar e administrar.",
    problem:
      "Informações de suporte precisam ser encontradas com rapidez e mantidas em um lugar organizado, sem depender de uma coleção dispersa de documentos.",
    solution:
      "Estruturei um portal com busca, categorias, artigos e uma área administrativa para dashboard, imagens e configurações. A persistência usa Supabase/PostgreSQL com políticas RLS para proteger os dados.",
    role:
      "Modelei a experiência do portal e do painel, organizei os fluxos de conteúdo e implementei a estrutura de dados e acesso apresentada nas telas.",
    evidence: [
      "Busca e organização por categorias e artigos.",
      "Painel administrativo com dashboard, imagens e configurações.",
      "Persistência com Supabase/PostgreSQL e políticas RLS.",
    ],
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "RLS"],
    access:
      "A demonstração pública e as telas do painel estão disponíveis; o código-fonte não é público.",
  },
  {
    number: "02",
    projectTitle: "Bela Agenda",
    projectId: 8,
    label: "Produto SaaS",
    title: "Conectar rotina operacional e experiência comercial em um SaaS",
    summary:
      "Uma plataforma em evolução para empresas de serviços, reunindo apresentação comercial, agenda, caixa e separação por empresa.",
    problem:
      "Empresas de serviços precisam apresentar a solução, organizar horários e acompanhar operações financeiras dentro de fluxos que façam sentido para cada negócio.",
    solution:
      "Estruturei uma experiência com landing page, planos, autenticação e painel operacional. O produto contempla agenda por profissional, horários disponíveis, caixa e separação de dados por empresa.",
    role:
      "Organizei os fluxos comerciais e operacionais, modelei as telas principais e desenvolvi a experiência responsiva exibida na demonstração.",
    evidence: [
      "Landing page comercial com planos e funcionalidades.",
      "Agenda por profissional e horários disponíveis.",
      "Caixa, vendas e separação de dados por empresa.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "SaaS", "Multiempresa"],
    access:
      "O projeto está em andamento e possui demonstração pública; o código-fonte não é público.",
  },
  {
    number: "03",
    projectTitle: "My Manhwas",
    projectId: 1,
    label: "Aplicação full stack",
    title: "Criar uma biblioteca pessoal com fluxos públicos e privados",
    summary:
      "Uma plataforma para organizar leituras de manhwas e animes, preservando o ponto de continuidade e separando recursos de uso recorrente.",
    problem:
      "Acompanhar várias leituras exige biblioteca, favoritos, filtros e organização para que o usuário encontre rapidamente o que deseja continuar ou revisar.",
    solution:
      "Reuni biblioteca, favoritos, scans, filtros, lixeira e uma área privada de configuração em um único fluxo. A aplicação também possui autenticação e persistência de dados para uso recorrente.",
    role:
      "Estruturei os fluxos do produto, organizei os estados público e privado e implementei a experiência de biblioteca e configuração apresentada nas telas.",
    evidence: [
      "Biblioteca com favoritos, filtros, scans e lixeira.",
      "Fluxos públicos e área privada de configuração.",
      "Autenticação e organização de dados para uso recorrente.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Autenticação", "Persistência de dados"],
    access:
      "A demonstração pública está disponível; o código-fonte não é publicado.",
  },
];
