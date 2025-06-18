
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Settings, User, Book } from "lucide-react";

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const tabs = [
    { id: "technical", label: "Técnicas", icon: Code },
    { id: "tools", label: "Ferramentas", icon: Settings },
    { id: "soft", label: "Soft Skills", icon: User },
    { id: "methodologies", label: "Metodologias", icon: Book }
  ];

  const technicalSkills = [
    { name: "JavaScript", level: 85, category: "Frontend" },
    { name: "HTML/CSS", level: 90, category: "Frontend" },
    { name: "React.js", level: 75, category: "Frontend" },
    { name: "Java", level: 70, category: "Backend" },
    { name: "MySQL", level: 80, category: "Database" },
    { name: "SQL Server", level: 75, category: "Database" },
    { name: "Python", level: 65, category: "Backend" },
    { name: "C#", level: 60, category: "Backend" }
  ];

  const tools = [
    { name: "Git/GitHub", level: 85 },
    { name: "VS Code", level: 90 },
    { name: "Photoshop", level: 80 },
    { name: "Corel Draw", level: 85 },
    { name: "SAP", level: 70 },
    { name: "Docker", level: 50 }
  ];

  const softSkills = [
    "Resolução de problemas complexos",
    "Visão analítica de negócios",
    "Capacidade de aprendizado rápido",
    "Comunicação técnica eficaz",
    "Trabalho em equipe",
    "Análise crítica",
    "Adaptabilidade",
    "Organização"
  ];

  const methodologies = [
    "Scrum/Kanban",
    "Análise de Requisitos",
    "Modelagem de Dados",
    "UML",
    "Prototipagem",
    "5S e FIFO",
    "REST APIs",
    "Levantamento de requisitos"
  ];

  const SkillBar = ({ skill }: { skill: { name: string; level: number; category?: string } }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress" 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conjunto de competências técnicas e comportamentais adquiridas ao longo da minha jornada
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "technical" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {["Frontend", "Backend", "Database"].map((category) => (
                <div key={category} className="tech-card">
                  <h3 className="text-lg font-semibold mb-4 gradient-text">{category}</h3>
                  {technicalSkills
                    .filter(skill => skill.category === category)
                    .map((skill, index) => (
                      <SkillBar key={index} skill={skill} />
                    ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "tools" && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="tech-card">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Ferramentas de Desenvolvimento</h3>
                {tools.slice(0, 3).map((tool, index) => (
                  <SkillBar key={index} skill={tool} />
                ))}
              </div>
              <div className="tech-card">
                <h3 className="text-lg font-semibold mb-4 gradient-text">Design e Sistemas</h3>
                {tools.slice(3).map((tool, index) => (
                  <SkillBar key={index} skill={tool} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "soft" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {softSkills.map((skill, index) => (
                <div key={index} className="tech-card text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium">{skill}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "methodologies" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {methodologies.map((methodology, index) => (
                <div key={index} className="tech-card text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Book size={20} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium">{methodology}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
