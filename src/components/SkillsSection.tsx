import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Settings, User, Book, BarChart3 } from "lucide-react";
import SkillChart from "./SkillChart";
import { useList, useUpsertItem, useDeleteItem } from "@/hooks/useContent";
import SectionHeader from "@/components/admin/SectionHeader";
import AdminControls, { AddItemButton } from "@/components/admin/AdminControls";
import ItemEditorDialog from "@/components/admin/ItemEditorDialog";
import { schemas } from "@/components/admin/fieldSchemas";

interface SkillRow {
  id: string;
  group_name: "technical" | "tools" | "soft" | "methodologies";
  name: string;
  level: number | null;
  category: string | null;
}

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<"technical" | "tools" | "soft" | "methodologies">(
    "technical"
  );
  const [showChart, setShowChart] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SkillRow | null>(null);

  const { data: all = [] } = useList<SkillRow>("skills");
  const upsert = useUpsertItem("skills");
  const del = useDeleteItem("skills");

  const tabs = [
    { id: "technical" as const, label: "Técnicas", icon: Code },
    { id: "tools" as const, label: "Ferramentas", icon: Settings },
    { id: "soft" as const, label: "Soft Skills", icon: User },
    { id: "methodologies" as const, label: "Metodologias", icon: Book },
  ];

  const technicalSkills = all.filter((s) => s.group_name === "technical");
  const tools = all.filter((s) => s.group_name === "tools");
  const softSkills = all.filter((s) => s.group_name === "soft");
  const methodologies = all.filter((s) => s.group_name === "methodologies");

  const schemaForActive =
    activeTab === "technical"
      ? schemas.skills_technical
      : activeTab === "tools"
      ? schemas.skills_tools
      : activeTab === "soft"
      ? schemas.skills_soft
      : schemas.skills_methodologies;

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (s: SkillRow) => {
    setEditing(s);
    setOpen(true);
  };

  const SkillBar = ({ skill }: { skill: SkillRow }) => (
    <div className="mb-4 group relative">
      <AdminControls
        onEdit={() => openEdit(skill)}
        onDelete={() => del.mutate(skill.id)}
        itemLabel={`"${skill.name}"`}
      />
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="skill-bar group-hover:scale-105 transition-transform">
        <div className="skill-progress" style={{ width: `${skill.level ?? 0}%` }} />
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          sectionKey="skills"
          fallback={{
            title_prefix: "Minhas",
            title_highlight: "Habilidades",
            subtitle:
              "Conjunto de competências técnicas e comportamentais adquiridas ao longo da minha jornada",
          }}
        />

        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2 hover:scale-105 transition-all duration-300"
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {(activeTab === "technical" || activeTab === "tools") && (
          <div className="flex justify-center mb-8">
            <Button variant="outline" onClick={() => setShowChart(!showChart)} className="flex items-center space-x-2">
              <BarChart3 size={16} />
              <span>{showChart ? "Visualização Lista" : "Visualização Gráfica"}</span>
            </Button>
          </div>
        )}

        <div className="animate-fade-in">
          {activeTab === "technical" && (
            <>
              {showChart ? (
                <div className="max-w-6xl mx-auto bg-card rounded-lg p-6 shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-center gradient-text">
                    Habilidades Técnicas
                  </h3>
                  <SkillChart skills={technicalSkills as any} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {["Frontend", "Backend", "Database"].map((category) => (
                    <div key={category} className="tech-card">
                      <h3 className="text-lg font-semibold mb-4 gradient-text">{category}</h3>
                      {technicalSkills
                        .filter((s) => s.category === category)
                        .map((s) => (
                          <SkillBar key={s.id} skill={s} />
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
                <div className="max-w-6xl mx-auto bg-card rounded-lg p-6 shadow-lg border">
                  <h3 className="text-lg font-semibold mb-4 text-center gradient-text">Ferramentas</h3>
                  <SkillChart skills={tools as any} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="tech-card">
                    <h3 className="text-lg font-semibold mb-4 gradient-text">Ferramentas de Desenvolvimento</h3>
                    {tools.filter((t) => t.category === "Tools").map((t) => <SkillBar key={t.id} skill={t} />)}
                  </div>
                  <div className="tech-card">
                    <h3 className="text-lg font-semibold mb-4 gradient-text">Design e Sistemas</h3>
                    {tools.filter((t) => t.category !== "Tools").map((t) => <SkillBar key={t.id} skill={t} />)}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "soft" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {softSkills.map((skill) => (
                <div key={skill.id} className="tech-card text-center relative hover:scale-105 transition-all duration-300">
                  <AdminControls onEdit={() => openEdit(skill)} onDelete={() => del.mutate(skill.id)} itemLabel={`"${skill.name}"`} />
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                    <User size={20} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "methodologies" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {methodologies.map((m) => (
                <div key={m.id} className="tech-card text-center relative hover:scale-105 transition-all duration-300">
                  <AdminControls onEdit={() => openEdit(m)} onDelete={() => del.mutate(m.id)} itemLabel={`"${m.name}"`} />
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 animate-float">
                    <Book size={20} className="text-accent" />
                  </div>
                  <p className="text-sm font-medium">{m.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <AddItemButton onClick={openAdd} label={`Adicionar em ${tabs.find((t) => t.id === activeTab)?.label}`} />

        <ItemEditorDialog
          open={open}
          onOpenChange={setOpen}
          schema={schemaForActive}
          initial={editing ?? undefined}
          onSave={(data) => upsert.mutateAsync(data)}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
