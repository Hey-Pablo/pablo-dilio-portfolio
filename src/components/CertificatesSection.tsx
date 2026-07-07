import { Calendar, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useList, useUpsertItem, useDeleteItem } from "@/hooks/useContent";
import SectionHeader from "@/components/admin/SectionHeader";
import AdminControls, { AddItemButton } from "@/components/admin/AdminControls";
import ItemEditorDialog from "@/components/admin/ItemEditorDialog";
import { schemas } from "@/components/admin/fieldSchemas";
import { useState } from "react";

interface CertRow {
  id: string;
  title: string;
  institution: string;
  date: string;
  status: string;
  skills: string[];
  description: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Concluído":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Em Andamento":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Previsto":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const CertificatesSection = () => {
  const { data: certificates = [] } = useList<CertRow>("certificates");
  const upsert = useUpsertItem("certificates");
  const del = useDeleteItem("certificates");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CertRow | null>(null);

  return (
    <section id="certificates" className="section-padding">
      <div className="container-custom">
        <SectionHeader
          sectionKey="certificates"
          fallback={{
            title_prefix: "Certificados e",
            title_highlight: "Formações",
            subtitle:
              "Certificações e cursos que comprovam meu comprometimento com o aprendizado contínuo e desenvolvimento profissional",
          }}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="tech-card group relative hover:scale-105 transition-transform duration-300">
              <AdminControls
                onEdit={() => {
                  setEditing(cert);
                  setOpen(true);
                }}
                onDelete={() => del.mutate(cert.id)}
                itemLabel={`o certificado "${cert.title}"`}
              />
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award size={20} className="text-primary" />
                </div>
                <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-2" />
                  <span>
                    {cert.institution} • {cert.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
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
          label="Adicionar Certificado"
        />

        <ItemEditorDialog
          open={open}
          onOpenChange={setOpen}
          schema={schemas.certificates}
          initial={editing ?? undefined}
          onSave={(data) => upsert.mutateAsync(data)}
        />
      </div>
    </section>
  );
};

export default CertificatesSection;
