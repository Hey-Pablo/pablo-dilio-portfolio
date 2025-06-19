import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Projector } from "lucide-react";

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Sistema de Controle de Finanças",
      description: "Site para gestão financeira pessoal com dashboard interativo, relatórios detalhados e controle de gastos. Desenvolvido com foco na experiência do usuário.",
      image: "/placeholder-finance.jpg",
      category: "fullstack",
      technologies: ["JavaScript", "HTML/CSS", "MySQL", "Dashboard"],
      status: "Em Desenvolvimento"
    },
    {
      id: 2,
      title: "Sistema de Suporte TID",
      description: "Plataforma de suporte interno para auxiliar usuários do sistema TID Software, com mapeamento de funcionalidades e guias de uso.",
      image: "/placeholder-support.jpg",
      category: "web",
      technologies: ["Suporte Técnico", "Mapeamento", "Documentação"],
      status: "Profissional"
    },
    {
      id: 3,
      title: "Portfólio Pessoal",
      description: "Portfólio responsivo desenvolvido com React e TypeScript, apresentando projetos e habilidades de forma interativa e moderna.",
      image: "/placeholder-portfolio.jpg",
      category: "frontend",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive"],
      status: "Em Desenvolvimento"
    }
  ];

  const categories = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
    { id: "web", label: "Web Apps" }
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
            <div key={project.id} className="tech-card group hover:scale-105 transition-transform duration-300">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
