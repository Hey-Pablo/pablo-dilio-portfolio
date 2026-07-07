
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Projector, ExternalLink, Calendar, Code2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  status: string;
  link?: string;
  expiresText?: string;
}

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "App Web para controle de Leitura",
      description: "Site para gestão de Manwhas/Weebton pessoal com dashboard interativo. Desenvolvido com foco na experiência do usuário.",
      image: "/placeholder-finance.jpg",
      category: "fullstack",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "shadcn/ui"],
      status: "Em Desenvolvimento",
    },
    {
      id: 2,
      title: "Açaí Control – Sistema Web de Gestão de Vendas e Estoque",
      description: "Criação de um sistema completo de gestão para estabelecimentos de açaí, com autenticação segura, dashboard, vendas integradas ao estoque, relatórios e cadastro de produtos. Construído com React, TailwindCSS e Supabase, incluindo RLS e cálculos automáticos de custos e lucros.",
      image: "/placeholder-finance.jpg",
      category: "fullstack",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "RLS"],
      status: "Em Desenvolvimento"
    },
    {
      id: 3,
      title: "Portfólio Pessoal",
      description: "Portfólio responsivo desenvolvido com React e TypeScript, apresentando projetos e habilidades de forma interativa e moderna.",
      image: "/placeholder-portfolio.jpg",
      category: "frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive"],
      status: "Em Desenvolvimento"
    },
    {
      id: 4,
      title: "Brasil Dev Tools",
      description: "Coleção de ferramentas para devs brasileiros inspirada no 4Devs: geradores, validadores e utilitários para testes.",
      image: "/placeholder-portfolio.jpg",
      category: "frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      status: "Em Desenvolvimento"
    },
    {
      id: 5,
      title: "FinanceFlow — Sistema de Gestão Financeira Pessoal",
      description: "Aplicação web para controle completo de finanças pessoais, incluindo receitas, despesas, investimentos e dividendos. Possui dashboard interativo, acompanhamento de ações em tempo real e design moderno focado em usabilidade.",
      image: "/placeholder-finance.jpg",
      category: "fullstack",
      technologies: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "React Query", "Recharts", "Framer Motion"],
      status: "Concluído"
    },
    {
      id: 6,
      title: "Suporte do Pablão — Base de Conhecimento e Help Desk",
      description: "Aplicação web para gestão de documentação técnica e artigos de suporte, permitindo que empresas organizem conteúdos em uma Base de Conhecimento com controle de acesso, busca inteligente e um painel administrativo completo.",
      image: "/placeholder-portfolio.jpg",
      category: "fullstack",
      technologies: ["React 18", "TypeScript", "Tailwind CSS", "Supabase", "Tiptap", "shadcn/ui"],
      status: "Concluído"
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" }
  ];

  const filteredProjects = selectedFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const gradients = [
    "from-[#7C3AED] via-[#D946EF] to-[#EC4899]",
    "from-[#38BDF8] via-[#7C3AED] to-[#D946EF]",
    "from-[#EC4899] via-[#7C3AED] to-[#38BDF8]",
    "from-[#D946EF] via-[#38BDF8] to-[#7C3AED]",
    "from-[#7C3AED] to-[#38BDF8]",
    "from-[#EC4899] to-[#7C3AED]",
  ];

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
          <p className="text-sm font-mono text-[hsl(var(--nebula-blue))] mb-3 tracking-widest">
            &lt;projects_galaxy/&gt;
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada projeto é um planeta neste universo digital. Explore, orbite e clique para ver detalhes.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => {
            const active = selectedFilter === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedFilter(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? "neon-btn"
                    : "glass text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const grad = gradients[idx % gradients.length];
            return (
              <article
                key={project.id}
                className="tech-card group cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
              >
                {/* Planet-like project cover */}
                <div className="relative mb-5 h-48 rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-80`} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)]" />
                  <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-black/40 blur-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-white/30 to-transparent border border-white/20 backdrop-blur-sm animate-float flex items-center justify-center">
                      <Projector size={32} className="text-white drop-shadow-lg" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 right-3 glass-strong border-white/20 text-white text-xs">
                    {project.status}
                  </Badge>
                </div>

                <div className="space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[hsl(var(--nebula-magenta))] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-white/15 bg-white/5 text-white/85"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 5 && (
                      <Badge variant="outline" className="text-xs border-white/15 bg-white/5 text-white/60">
                        +{project.technologies.length - 5}
                      </Badge>
                    )}
                  </div>

                  <div className="pt-3 mt-auto flex items-center justify-between">
                    <span className="text-xs font-mono text-white/40">
                      #{String(project.id).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium text-[hsl(var(--nebula-blue))] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Ver detalhes <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Project Details Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold gradient-text">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-sm">
                      {selectedProject.status}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {selectedProject.category === "fullstack" ? "Full Stack" : "Frontend"}
                    </Badge>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Project Image */}
                  <div className="relative h-64 bg-gradient-to-br from-tech-blue/10 to-tech-green/10 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Projector size={64} className="text-muted-foreground" />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Code2 size={20} />
                      Sobre o Projeto
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Code2 size={20} />
                      Tecnologias Utilizadas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Status and Link */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-muted-foreground" />
                      <span className="text-sm">
                        <span className="font-medium">Status:</span> {selectedProject.status}
                      </span>
                    </div>
                    
                    {selectedProject.link && (
                      <div className="flex items-start gap-2">
                        <ExternalLink size={18} className="text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <span className="text-sm font-medium block mb-1">Link do Projeto:</span>
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm break-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {selectedProject.link}
                          </a>
                          {selectedProject.expiresText && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {selectedProject.expiresText}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
