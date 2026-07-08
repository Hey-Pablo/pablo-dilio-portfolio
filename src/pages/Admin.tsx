import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import ResourceManager from "@/components/admin/ResourceManager";
import { RESOURCES } from "@/components/admin/resourceConfigs";

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
            <Link to="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Eye size={14} className="mr-2" /> Preview
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut size={14} className="mr-2" /> Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue={RESOURCES[0].table}>
          <TabsList className="flex-wrap h-auto">
            {RESOURCES.map((r) => (
              <TabsTrigger key={r.table} value={r.table}>
                {r.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="mt-6">
            {RESOURCES.map((r) => (
              <TabsContent key={r.table} value={r.table}>
                <ResourceManager config={r} />
              </TabsContent>
            ))}
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
