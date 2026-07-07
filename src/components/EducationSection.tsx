import { Book, Calendar, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useList, useUpsertItem, useDeleteItem } from "@/hooks/useContent";
import SectionHeader from "@/components/admin/SectionHeader";
import AdminControls, { AddItemButton } from "@/components/admin/AdminControls";
import ItemEditorDialog from "@/components/admin/ItemEditorDialog";
import { schemas } from "@/components/admin/fieldSchemas";
import { useState } from "react";

interface EduRow {
  id: string;
  kind: "academic" | "technical";
  institution: string;
  course: string;
  period: string;
  status: string;
  description?: string | null;
  highlights: string[];
  order_index: number;
}

const EducationSection = () => {
  const { data: items = [] } = useList<EduRow>("education_items");
  const upsert = useUpsertItem("education_items");
  const del = useDeleteItem("education_items");

  const academic = items.filter((i) => i.kind === "academic");
  const technical = items.filter((i) => i.kind === "technical");

  const [openKind, setOpenKind] = useState<null | "academic" | "technical">(null);
  const [editing, setEditing] = useState<EduRow | null>(null);

  const openAdd = (kind: "academic" | "technical") => {
    setEditing(null);
    setOpenKind(kind);
  };
  const openEdit = (row: EduRow) => {
    setEditing(row);
    setOpenKind(row.kind);
  };

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          sectionKey="education"
          fallback={{
            title_prefix: "Formação",
            title_highlight: "Acadêmica",
            subtitle:
              "Minha jornada educacional e cursos técnicos que moldaram meu conhecimento em tecnologia e gestão",
          }}
        />

        {/* Formação Acadêmica */}
        <div className="mb-16 max-w-5xl mx-auto">
          <div className="flex items-center mb-8">
            <GraduationCap className="text-primary mr-3" size={24} />
            <h3 className="text-2xl font-bold">Formação Acadêmica</h3>
          </div>

          <div className="space-y-6">
            {academic.map((edu, idx) => (
              <div key={edu.id} className="tech-card relative">
                <AdminControls
                  onEdit={() => openEdit(edu)}
                  onDelete={() => del.mutate(edu.id)}
                  itemLabel={`"${edu.course}"`}
                />
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold">{edu.course}</h4>
                    <p className="text-primary font-medium">{edu.institution}</p>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <Calendar size={16} className="text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                    <Badge className="ml-3">{edu.status}</Badge>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-muted-foreground leading-relaxed mb-4">{edu.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {edu.highlights.map((h, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <AddItemButton onClick={() => openAdd("academic")} label="Adicionar Formação Acadêmica" />
        </div>

        {/* Cursos Técnicos */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Award className="text-primary mr-3" size={24} />
            <h3 className="text-2xl font-bold">Cursos Técnicos e Profissionalizantes</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technical.map((c) => (
              <div key={c.id} className="tech-card relative">
                <AdminControls
                  onEdit={() => openEdit(c)}
                  onDelete={() => del.mutate(c.id)}
                  itemLabel={`"${c.course}"`}
                />
                <div className="flex items-start mb-3">
                  <Book size={18} className="text-primary mr-2 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{c.course}</h4>
                    <p className="text-primary text-xs">{c.institution}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{c.period}</span>
                  <Badge className="text-xs">{c.status}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {c.highlights.slice(0, 3).map((h, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <AddItemButton onClick={() => openAdd("technical")} label="Adicionar Curso Técnico" />
        </div>

        <ItemEditorDialog
          open={openKind !== null}
          onOpenChange={(v) => !v && setOpenKind(null)}
          schema={openKind === "technical" ? schemas.education_technical : schemas.education_academic}
          initial={editing ?? undefined}
          onSave={(data) => upsert.mutateAsync(data)}
        />
      </div>
    </section>
  );
};

export default EducationSection;
