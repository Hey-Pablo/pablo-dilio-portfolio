import { Badge } from "@/components/ui/badge";
import { Calendar, Settings, User, Code } from "lucide-react";
import experienceData from "@/data/experience.json";
import type { Experience } from "@/data/types";
import magaluLogo from "@/assets/magalu.png.asset.json";
import caterpillarLogo from "@/assets/caterpillar.png.asset.json";
import tidLogo from "@/assets/tid.png.asset.json";

const experiences = experienceData as Experience[];

const companyLogos: Record<string, string> = {
  "Magazine Luiza": magaluLogo.url,
  "Caterpillar Brasil LTDA": caterpillarLogo.url,
  "TID Software": tidLogo.url,
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ti":
        return "bg-tech-blue/10 text-tech-blue border-tech-blue/30";
      case "administrativo":
        return "bg-tech-green/10 text-tech-green border-tech-green/30";
      case "vendas":
        return "bg-accent/10 text-accent border-accent/30";
      default:
        return "bg-muted";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "ti":
        return "Tecnologia";
      case "administrativo":
        return "Administrativo";
      case "vendas":
        return "Vendas";
      default:
        return "Outros";
    }
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experiência <span className="gradient-text">Profissional</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha trajetória profissional: de vendas ao administrativo, até a especialização em implantação e suporte ERP
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 animate-fade-in">
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-8 w-3 h-3 bg-primary rounded-full transform -translate-x-1.5 mt-6 z-10"></div>

                {/* Experience Card */}
                <div className="ml-12 md:ml-20">
                  <div className="tech-card">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        {companyLogos[exp.company] ? (
                          <img
                            src={companyLogos[exp.company]}
                            alt={`${exp.company} logo`}
                            className="h-10 w-10 object-contain bg-white rounded-lg p-1"
                          />
                        ) : (
                          <div className="p-2 bg-background rounded-lg">
                            {getTypeIcon(exp.type)}
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-tech-blue font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getTypeColor(exp.type)}`}>
                          {getTypeLabel(exp.type)}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {exp.period}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Principais Responsabilidades:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Tecnologias e Ferramentas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Principais Conquistas:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-tech-green rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Progression Summary */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="tech-card text-center">
            <h3 className="text-lg font-semibold mb-4">Progressão de Carreira</h3>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-accent" />
                <span className="text-sm">Vendas</span>
              </div>
              <div className="w-8 h-0.5 bg-border md:block hidden"></div>
              <div className="w-0.5 h-8 bg-border md:hidden block"></div>
              <div className="flex items-center space-x-2">
                <Settings size={16} className="text-tech-green" />
                <span className="text-sm">Administrativo</span>
              </div>
              <div className="w-8 h-0.5 bg-border md:block hidden"></div>
              <div className="w-0.5 h-8 bg-border md:hidden block"></div>
              <div className="flex items-center space-x-2">
                <Code size={16} className="text-tech-blue" />
                <span className="text-sm">Tecnologia</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Uma jornada de crescimento contínuo, sempre buscando novos desafios e conhecimentos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
