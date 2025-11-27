
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

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seleção de projetos que demonstram minhas habilidades em desenvolvimento e análise de sistemas
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedFilter === category.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="tech-card group hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image Placeholder */}
              <div className="relative mb-4 h-48 bg-gradient-to-br from-tech-blue/10 to-tech-green/10 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Projector size={48} className="text-muted-foreground" />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Optional link and expiration text */}
                {project.link && (
                  <p className="text-sm">
                    <span className="font-medium">Link:</span>{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline break-all"
                      aria-label={`Abrir link do projeto ${project.title}`}
                    >
                      {project.link}
                    </a>
                  </p>
                )}
                {project.expiresText && (
                  <p className="text-xs text-muted-foreground">{project.expiresText}</p>
                )}
              </div>
            </div>
          ))}
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
