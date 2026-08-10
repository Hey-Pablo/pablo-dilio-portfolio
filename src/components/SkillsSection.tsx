import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Settings, User, Book } from "lucide-react";
import skillsData from "@/data/skills.json";
import type { Skill } from "@/data/types";

const tabs = [
  { id: "technical", label: "Técnicas", icon: Code },
  { id: "tools", label: "Ferramentas", icon: Settings },
  { id: "soft", label: "Soft Skills", icon: User },
  { id: "methodologies", label: "Metodologias", icon: Book },
];

const SkillEvidence = ({ skill }: { skill: Skill }) => (
  <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.02] p-3 last:mb-0">
    <p className="text-sm font-medium text-foreground">{skill.name}</p>
    <ul className="mt-2 space-y-1.5">
      {(skill.evidence ?? ["Conhecimento em desenvolvimento"]).map((item) => (
        <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const SimpleSkillCard = ({ label, icon: Icon }: { label: string; icon: typeof User }) => (
  <div className="tech-card text-center transition-transform duration-300 hover:scale-[1.02]">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
      <Icon size={20} className="text-primary" />
    </div>
    <p className="text-sm font-medium">{label}</p>
  </div>
);

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("technical");

  const technicalSkills = skillsData.technical as Skill[];
  const tools = skillsData.tools as Skill[];
  const softSkills = skillsData.soft as string[];
  const methodologies = skillsData.methodologies as string[];

  return (
    <section id="skills" data-scroll-reveal="section" className="section-padding">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Minhas <span className="gradient-text">Habilidades</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Competências demonstradas em implantações ERP, suporte B2B, projetos web, dados e documentação de processos.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {activeTab === "technical" && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {["Frontend", "Backend", "Database"].map((category) => (
              <div key={category} data-scroll-reveal="skill-card" className="tech-card">
                <h3 className="mb-4 text-lg font-semibold gradient-text">{category}</h3>
                {technicalSkills
                  .filter((skill) => skill.category === category)
                  .map((skill) => <SkillEvidence key={skill.name} skill={skill} />)}
              </div>
            ))}
          </div>
        )}

        {activeTab === "tools" && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="tech-card">
              <h3 className="mb-4 text-lg font-semibold gradient-text">Atendimento remoto</h3>
              {tools.filter((tool) => tool.category === "Remote").map((tool) => <SkillEvidence key={tool.name} skill={tool} />)}
            </div>
            <div className="tech-card">
              <h3 className="mb-4 text-lg font-semibold gradient-text">Sistemas e produtividade</h3>
              {tools.filter((tool) => tool.category === "OfficeSystems").map((tool) => <SkillEvidence key={tool.name} skill={tool} />)}
            </div>
            <div className="tech-card">
              <h3 className="mb-4 text-lg font-semibold gradient-text">Hospedagem e IA</h3>
              {tools.filter((tool) => tool.category === "Hosting" || tool.category === "AI").map((tool) => <SkillEvidence key={tool.name} skill={tool} />)}
            </div>
          </div>
        )}

        {activeTab === "soft" && (
          <div className="grid max-w-6xl mx-auto gap-4 md:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((skill) => <SimpleSkillCard key={skill} label={skill} icon={User} />)}
          </div>
        )}

        {activeTab === "methodologies" && (
          <div className="grid max-w-6xl mx-auto gap-4 md:grid-cols-2 lg:grid-cols-4">
            {methodologies.map((methodology) => <SimpleSkillCard key={methodology} label={methodology} icon={Book} />)}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
