import { Badge } from "@/components/ui/badge";
import { Calendar, Settings, User, Code } from "lucide-react";
import experienceData from "@/data/experience.json";
import type { Experience } from "@/data/types";

const experiences = experienceData as Experience[];

const companyLogos: Record<string, string> = {
  "Magazine Luiza": "/assets/logos/magalu.png",
  "Caterpillar Brasil LTDA": "/assets/logos/caterpillar.png",
  "TID Software": "/assets/logos/tid.png",
};

const ExperienceSection = () => {

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ti":
        return <Code size={20} className="text-tech-blue" />;
      case "administrativo":
        return <Settings size={20} className="text-tech-green" />;
      case "vendas":
        return <User size={20} className="text-accent" />;
      default:
        return <User size={20} className="text-muted-foreground" />;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const calculateDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diffMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    return parts.join(" e ") || "Menos de 1 mês";
  };

  const experiencesByType = {
    ti: experiences.filter((exp) => exp.type === "ti"),
    administrativo: experiences.filter((exp) => exp.type === "administrativo"),
    vendas: experiences.filter((exp) => exp.type === "vendas"),
  };

  const typeConfig = {
    ti: {
      title: "Tecnologia",
      subtitle: "Experiência em desenvolvimento e suporte técnico",
      icon: <Code size={20} />,
      gradient: "from-tech-blue to-tech-purple",
    },
    administrativo: {
      title: "Administrativo",
      subtitle: "Gestão de processos, documentos e operações",
      icon: <Settings size={20} />,
      gradient: "from-tech-green to-tech-teal",
    },
    vendas: {
      title: "Vendas",
      subtitle: "Atendimento, negociação e pós-venda",
      icon: <User size={20} />,
      gradient: "from-tech-orange to-tech-pink",
    },
  };

  return (
    <section id="experience" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-tech-blue/30 text-tech-blue">
            Experiência
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minha{" "}
            <span className="gradient-text">Trajetória</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Uma jornada profissional que combina tecnologia, gestão e
            atendimento ao cliente.
          </p>
        </div>

        <div className="space-y-16">
          {(Object.keys(typeConfig) as Array<keyof typeof typeConfig>).map(
            (typeKey) => {
              const config = typeConfig[typeKey];
              const exps = experiencesByType[typeKey];

              if (exps.length === 0) return null;

              return (
                <div key={typeKey}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}
                      >
                        {config.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {config.title}
                        </h3>
                        <p className="text-sm text-white/50">
                          {config.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {exps.map((exp, index) => (
                      <div
                        key={index}
                        className="group relative pl-8 before:content-[''] before:absolute before:left-[11px] before:top-8 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-tech-blue/50 before:to-transparent last:before:hidden"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[3px] top-2 w-[18px] h-[18px] rounded-full bg-tech-blue/20 border-2 border-tech-blue flex items-center justify-center">
                          <div className="w-[6px] h-[6px] rounded-full bg-tech-blue" />
                        </div>

                        <div className="glass p-6 rounded-xl border border-white/5 hover:border-tech-blue/20 transition-all duration-300 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.2)]">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                              {/* Company Logo */}
                              {companyLogos[exp.company] ? (
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 overflow-hidden flex-shrink-0">
                                  <img
                                    src={companyLogos[exp.company]}
                                    alt={exp.company}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                                  {getTypeIcon(exp.type)}
                                </div>
                              )}

                              <div>
                                <h4 className="text-lg font-bold text-white group-hover:text-tech-blue transition-colors">
                                  {exp.role}
                                </h4>
                                <p className="text-sm text-white/60">
                                  {exp.company} • {exp.location}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-white/40">
                              <Calendar size={14} />
                              <span>
                                {formatDate(exp.startDate)} —{" "}
                                {exp.endDate
                                  ? formatDate(exp.endDate)
                                  : "Presente"}
                              </span>
                              <span className="text-tech-blue/60 font-medium">
                                · {calculateDuration(exp.startDate, exp.endDate)}
                              </span>
                            </div>
                          </div>

                          <p className="mt-4 text-white/70 text-sm leading-relaxed">
                            {exp.description}
                          </p>

                          {exp.achievements && exp.achievements.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-white/60"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-tech-blue/60 flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          )}

                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2.5 py-1 text-xs font-medium rounded-full bg-tech-blue/10 text-tech-blue border border-tech-blue/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
