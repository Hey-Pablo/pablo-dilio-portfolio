import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ExternalLink, Calendar, Code2, X } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/data/types";
import ProjectImageCarousel from "@/components/ProjectImageCarousel";
import ComingSoonCard from "@/components/ComingSoonCard";

const projects = projectsData as Project[];

const gradients = [
  "from-[#6B321A] via-[#B8682D] to-[#F0C477]",
  "from-[#3A2014] via-[#C47A36] to-[#E8B66D]",
  "from-[#7A3F20] via-[#D99137] to-[#FFF0CE]",
  "from-[#4A2817] via-[#B8682D] to-[#D9A15C]",
  "from-[#8A4B23] to-[#F0C477]",
  "from-[#B8682D] to-[#FFF0CE]",
];

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categories = [
    { id: "all", label: "Todos" },
    { id: "front-end", label: "Front-End" },
    { id: "back-end-fullstack", label: "Back-end - Full Stack" },
    { id: "ia", label: "Conjunto com IA" },
  ];

  const filteredProjects =
    selectedFilter === "all" ? projects : projects.filter((p) => p.category === selectedFilter);

  return (
    <section id="projects" data-scroll-reveal="section" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-14">
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
                data-scroll-reveal="project-card"
                className="tech-card group cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(project)}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = ((event.clientX - rect.left) / rect.width) * 100;
                  const y = ((event.clientY - rect.top) / rect.height) * 100;
                  event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
                  event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
                }}
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
                  <Badge
                    className={`absolute top-3 left-3 z-10 text-xs font-medium border ${
                      project.category === "front-end"
                        ? "bg-amber-500/15 text-amber-200 border-amber-500/30"
                        : project.category === "back-end-fullstack"
                        ? "bg-orange-700/20 text-orange-200 border-orange-500/30"
                        : project.category === "ia"
                        ? "bg-yellow-500/15 text-yellow-100 border-yellow-500/30"
                        : "bg-white/10 text-white/70 border-white/20"
                    }`}
                  >
                    {project.category === "front-end"
                      ? "🎨 Front-End"
                      : project.category === "back-end-fullstack"
                      ? "⚙️ Back-end / Full Stack"
                      : project.category === "ia"
                      ? "🤖 IA"
                      : project.category}
                  </Badge>
                </div>

                <div className="space-y-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[hsl(var(--nebula-magenta))] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
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
                    <span className="text-sm font-bold font-mono text-white/70">
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

          {/* Espaço para Futuros Projetos */}
          <ComingSoonCard
            title="Em Breve"
            subtitle="Novo projeto será adicionado aqui"
          />
        </div>

        {/* Project Details Modal */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProject(null);
              setModalImageIndex(0);
              setLightboxOpen(false);
            }
          }}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold gradient-text">
                    <span className="text-sm font-mono text-white/40 font-normal mr-2">
                      #{String(selectedProject.id).padStart(2, "0")}
                    </span>
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-sm">
                      {selectedProject.status}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {selectedProject.category === "front-end"
                        ? "Front-End"
                        : selectedProject.category === "back-end-fullstack"
                        ? "Back-end - Full Stack"
                        : selectedProject.category === "ia"
                        ? "Conjunto com IA"
                        : selectedProject.category}
                    </Badge>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div
                    className="relative w-full aspect-[4/3] max-h-[500px] rounded-lg overflow-hidden bg-black/40 cursor-pointer group"
                    onClick={() => selectedProject.images.length > 0 && setLightboxOpen(true)}
                  >
                    <ProjectImageCarousel
                      images={selectedProject.images}
                      fallbackGradient={gradients[(selectedProject.id - 1) % gradients.length]}
                      alt={selectedProject.title}
                      className="absolute inset-0 h-full w-full"
                      objectFit="contain"
                      onIndexChange={setModalImageIndex}
                    />
                    {selectedProject.images.length > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 pointer-events-none">
                        <span className="text-white text-sm font-medium">Clique para ampliar</span>
                      </div>
                    )}
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

                {/* Lightbox overlay */}
                {lightboxOpen && selectedProject.images.length > 0 && (
                  <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <button
                      type="button"
                      aria-label="Fechar visualização ampliada"
                      className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={() => setLightboxOpen(false)}
                    >
                      <X size={24} />
                    </button>
                    <img
                      src={selectedProject.images[modalImageIndex]}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
