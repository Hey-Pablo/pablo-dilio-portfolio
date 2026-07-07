import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const FooterLogin = () => {
  const { user, isAdmin, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Erro ao entrar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Bem-vindo!", description: "Login realizado com sucesso." });
    navigate("/admin");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h4 className="font-semibold">Login</h4>
      {user ? (
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground break-all">{user.email}</p>
          {isAdmin && (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin")}
            >
              <LayoutDashboard size={14} className="mr-2" />
              Admin
            </Button>
          )}
          <Button size="sm" variant="ghost" className="w-full" onClick={signOut}>
            <LogOut size={14} className="mr-2" />
            Sair
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-9 bg-muted border-border text-sm"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-9 bg-muted border-border text-sm"
          />
          <Button type="submit" size="sm" className="w-full" disabled={loading}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default FooterLogin;
