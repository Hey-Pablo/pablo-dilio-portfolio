import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Calendar, Code2 } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/data/types";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";

const projects = projectsData as Project[];

const gradients = [
  "from-[#7C3AED] via-[#D946EF] to-[#EC4899]",
  "from-[#38BDF8] via-[#7C3AED] to-[#D946EF]",
  "from-[#EC4899] via-[#7C3AED] to-[#38BDF8]",
  "from-[#D946EF] via-[#38BDF8] to-[#7C3AED]",
  "from-[#7C3AED] to-[#38BDF8]",
  "from-[#EC4899] to-[#7C3AED]",
];

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "fullstack", label: "Full Stack" },
    { id: "frontend", label: "Frontend" },
  ];

  const filteredProjects =
    selectedFilter === "all" ? projects : projects.filter((p) => p.category === selectedFilter);

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
                  active ? "neon-btn" : "glass text-white/80 hover:text-white hover:bg-white/10"
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
                <div className="relative mb-5 h-48 rounded-xl overflow-hidden">
                  <ProjectImageCarousel
                    images={project.images}
                    fallbackGradient={grad}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full"
                  />
                  <Badge className="absolute top-3 right-3 glass-strong border-white/20 text-white text-xs z-10">
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
                      <Badge key={index} variant="outline" className="text-xs border-white/15 bg-white/5 text-white/85">
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
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <ProjectImageCarousel
                      images={selectedProject.images}
                      fallbackGradient={gradients[(selectedProject.id - 1) % gradients.length]}
                      alt={selectedProject.title}
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Code2 size={20} />
                      Sobre o Projeto
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                  </div>

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
                            <p className="text-xs text-muted-foreground mt-1">{selectedProject.expiresText}</p>
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
