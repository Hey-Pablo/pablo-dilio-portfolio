import { Badge } from "@/components/ui/badge";
import { Calendar, Settings, User, Code } from "lucide-react";
import { useList, useUpsertItem, useDeleteItem } from "@/hooks/useContent";
import SectionHeader from "@/components/admin/SectionHeader";
import AdminControls, { AddItemButton } from "@/components/admin/AdminControls";
import ItemEditorDialog from "@/components/admin/ItemEditorDialog";
import { schemas } from "@/components/admin/fieldSchemas";
import { useState } from "react";

interface ExpRow {
  id: string;
  company: string;
  position: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

const typeIcon = (t: string) => {
  switch (t) {
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

const typeColor = (t: string) =>
  ({
    ti: "bg-tech-blue/10 text-tech-blue border-tech-blue/30",
    administrativo: "bg-tech-green/10 text-tech-green border-tech-green/30",
    vendas: "bg-accent/10 text-accent border-accent/30",
  } as Record<string, string>)[t] ?? "bg-muted";

const typeLabel = (t: string) =>
  ({ ti: "Tecnologia", administrativo: "Administrativo", vendas: "Vendas" } as Record<string, string>)[t] ??
  "Outros";

const ExperienceSection = () => {
  const { data: experiences = [] } = useList<ExpRow>("experiences");
  const upsert = useUpsertItem("experiences");
  const del = useDeleteItem("experiences");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ExpRow | null>(null);

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          sectionKey="experience"
          fallback={{
            title_prefix: "Experiência",
            title_highlight: "Profissional",
            subtitle:
              "Minha trajetória profissional progressiva: de vendas ao administrativo, até chegar à área de TI",
          }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            {experiences.map((exp) => (
              <div key={exp.id} className="relative mb-12 animate-fade-in">
                <div className="absolute left-4 md:left-8 w-3 h-3 bg-primary rounded-full transform -translate-x-1.5 mt-6 z-10"></div>
                <div className="ml-12 md:ml-20">
                  <div className="tech-card relative">
                    <AdminControls
                      onEdit={() => {
                        setEditing(exp);
                        setOpen(true);
                      }}
                      onDelete={() => del.mutate(exp.id)}
                      itemLabel={`"${exp.position} @ ${exp.company}"`}
                    />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <div className="p-2 bg-background rounded-lg">{typeIcon(exp.type)}</div>
                        <div>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-tech-blue font-medium">{exp.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${typeColor(exp.type)}`}>{typeLabel(exp.type)}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-1" />
                          {exp.period}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Principais Responsabilidades:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm mb-2">Tecnologias / Ferramentas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((t, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {exp.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Conquistas:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {exp.achievements.map((a, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 bg-tech-green rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AddItemButton
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            label="Adicionar Experiência"
          />
        </div>

        <ItemEditorDialog
          open={open}
          onOpenChange={setOpen}
          schema={schemas.experiences}
          initial={editing ?? undefined}
          onSave={(data) => upsert.mutateAsync(data)}
        />
      </div>
    </section>
  );
};

export default ExperienceSection;
