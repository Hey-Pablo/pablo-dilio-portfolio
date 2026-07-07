import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, requireAdmin = true }: { children: React.ReactNode; requireAdmin?: boolean }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
        <h1 className="text-2xl font-bold">Acesso negado</h1>
        <p className="text-muted-foreground">Você não tem permissão para acessar esta área.</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
