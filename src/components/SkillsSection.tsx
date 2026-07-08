
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Settings, User, Book, BarChart3 } from "lucide-react";
import SkillChart from "./SkillChart";
import skillsData from "@/data/skills.json";
import type { Skill } from "@/data/types";

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [showChart, setShowChart] = useState(false);

  const tabs = [
    { id: "technical", label: "Técnicas", icon: Code },
    { id: "tools", label: "Ferramentas", icon: Settings },
    { id: "soft", label: "Soft Skills", icon: User },
    { id: "methodologies", label: "Metodologias", icon: Book }
  ];

  const technicalSkills = skillsData.technical as Skill[];
  const tools = skillsData.tools as Skill[];
  const softSkills = skillsData.soft as string[];
  const methodologies = skillsData.methodologies as string[];


  const SkillBar = ({ skill }: { skill: { name: string; level: number; category?: string } }) => (
    <div className="mb-4 group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">{skill.name}</span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="skill-bar group-hover:scale-105 transition-transform">
        <div 
          className="skill-progress" 
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  const currentSkillData = activeTab === "technical" ? technicalSkills : tools;

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Minhas <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-tech-blue via-tech-green to-tech-blue bg-200%">Habilidades</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conjunto de competências técnicas e comportamentais adquiridas ao longo da minha jornada
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab, index) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2 hover:scale-105 transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Chart Toggle for Technical and Tools */}
        {(activeTab === "technical" || activeTab === "tools") && (
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              onClick={() => setShowChart(!showChart)}
              className="flex items-center space-x-2 animate-pulse-glow"
            >
              <BarChart3 size={16} />
              <span>{showChart ? "Visualização Lista" : "Visualização Gráfica"}</span>
            </Button>
          </div>
        )}

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === "technical" && (
            <>
              {showChart ? (
                <div className="max-w-6xl mx-auto bg-card rounded-lg p-6 shadow-lg border animate-slide-in-right">
                  <h3 className="text-lg font-semibold mb-4 text-center gradient-text">
                    Habilidades Técnicas - Visualização Dinâmica
                  </h3>
                  <SkillChart skills={technicalSkills} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {["Frontend", "Backend", "Database"].map((category, index) => (
                    <div 
                      key={category} 
                      className="tech-card hover:scale-105 transition-all duration-300 animate-slide-in-left"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <h3 className="text-lg font-semibold mb-4 gradient-text">{category}</h3>
                      {technicalSkills
                        .filter(skill => skill.category === category)
                        .map((skill, skillIndex) => (
                          <div key={skillIndex} style={{ animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s` }}>
                            <SkillBar skill={skill} />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "tools" && (
            <>
              {showChart ? (
                <div className="max-w-6xl mx-auto bg-card rounded-lg p-6 shadow-lg border animate-slide-in-right">
                  <h3 className="text-lg font-semibold mb-4 text-center gradient-text">
                    Ferramentas - Visualização Dinâmica
                  </h3>
                  <SkillChart skills={tools} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-8">
                    <div className="tech-card animate-slide-in-left">
                      <h3 className="text-lg font-semibold mb-4 gradient-text">Ferramentas de Atendimento Remoto</h3>
                      {tools.filter(t => t.category === "Remote").map((tool, index) => (
                        <SkillBar key={index} skill={tool} />
                      ))}
                    </div>
                    <div className="tech-card animate-slide-in-right">
                      <h3 className="text-lg font-semibold mb-4 gradient-text">Ferramentas de Hospedagem</h3>
                      {tools.filter(t => t.category === "Hosting").map((tool, index) => (
                        <SkillBar key={index} skill={tool} />
                      ))}
                    </div>
                  </div>
                  <div className="tech-card animate-slide-in-left">
                    <h3 className="text-lg font-semibold mb-4 gradient-text">Design e Sistemas</h3>
                    {tools.filter(t => t.category === "OfficeSystems").map((tool, index) => (
                      <SkillBar key={index} skill={tool} />
                    ))}
                  </div>
                  <div className="tech-card animate-slide-in-right">
                    <h3 className="text-lg font-semibold mb-4 gradient-text">Integração com IA</h3>
                    {tools.filter(t => t.category === "AI").map((tool, index) => (
                      <SkillBar key={index} skill={tool} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "soft" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {softSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="tech-card text-center hover:scale-105 transition-all duration-300 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
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
                <div 
                  key={index} 
                  className="tech-card text-center hover:scale-105 transition-all duration-300 animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
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
