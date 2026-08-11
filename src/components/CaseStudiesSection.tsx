import { ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/data/caseStudies";
import projectsData from "@/data/projects.json";
import type { Project } from "@/data/types";

const projects = projectsData as Project[];

const CaseStudiesSection = () => {
  return (
    <section id="case-studies" data-scroll-reveal="section" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.25em] text-primary">Projetos em destaque</p>
          <h2 className="text-3xl font-bold md:text-5xl">
            <span className="gradient-text">Case studies</span> com contexto real
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Além das telas, estes projetos mostram como transformo necessidades de negócio em fluxos, dados e interfaces utilizáveis.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((study) => {
            const project = projects.find((item) => item.id === study.projectId);

            return (
              <article
                key={study.number}
                data-scroll-reveal="project-card"
                className="case-study-card glass flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-sm text-white/40">/{study.number}</span>
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-foreground">
                    {study.label}
                  </Badge>
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-tight text-white">{study.projectTitle}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-primary">{study.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>

                <div className="mt-6 space-y-5 text-sm leading-relaxed">
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Contexto</h4>
                    <p className="text-muted-foreground">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Solução</h4>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Minha atuação</h4>
                    <p className="text-muted-foreground">{study.role}</p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                    <CheckCircle2 size={16} className="text-primary" />
                    Evidências
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {study.evidence.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {study.technologies.map((technology) => (
                    <Badge key={technology} variant="outline" className="border-white/15 bg-white/5 text-xs text-white/80">
                      {technology}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto border-t border-white/10 pt-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">{study.access}</p>
                  {project?.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Ver demonstração <ArrowUpRight size={16} />
                    </a>
                  )}
                  {!project?.link && (
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-white/50">
                      <BriefcaseBusiness size={16} /> Projeto privado
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
