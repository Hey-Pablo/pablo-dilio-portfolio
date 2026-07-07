import { Link } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import projects from "@/data/projects.json";
import education from "@/data/education.json";
import certificates from "@/data/certificates.json";
import experience from "@/data/experience.json";
import skills from "@/data/skills.json";

const Section = ({ items, keyField = "title" }: { items: any[]; keyField?: string }) => (
  <div className="grid gap-3">
    {items.map((it, i) => (
      <div key={i} className="p-4 rounded-lg border border-border bg-card/50">
        <p className="font-medium">{it[keyField] ?? it.name ?? JSON.stringify(it).slice(0, 60)}</p>
        {it.description && <p className="text-sm text-muted-foreground mt-1">{it.description}</p>}
      </div>
    ))}
  </div>
);

const AdminContent = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" /> Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold gradient-text">Painel Admin</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut size={14} className="mr-2" /> Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="education">Formação</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Visualização somente-leitura. Edição via interface em breve — por ora, edite os arquivos JSON em <code>src/data/</code>.
            </p>
            <TabsContent value="projects"><Section items={projects as any[]} /></TabsContent>
            <TabsContent value="education"><Section items={education as any[]} /></TabsContent>
            <TabsContent value="certificates"><Section items={certificates as any[]} /></TabsContent>
            <TabsContent value="experience"><Section items={experience as any[]} /></TabsContent>
            <TabsContent value="skills"><Section items={skills as any[]} keyField="name" /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

const Admin = () => (
  <ProtectedRoute>
    <AdminContent />
  </ProtectedRoute>
);

export default Admin;
