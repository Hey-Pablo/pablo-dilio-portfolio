import { Pencil, Eye, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditMode } from "@/contexts/EditModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function EditModeToggle() {
  const { canEdit, editMode, toggleEditMode } = useEditMode();
  const { user, signOut } = useAuth();

  if (!user) return null;

  if (!canEdit) {
    // logged in but not admin: minimal sign out
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button size="sm" variant="outline" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-1" /> Sair
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2 items-center bg-background/90 backdrop-blur border border-border rounded-full px-2 py-2 shadow-2xl">
      <Button
        size="sm"
        variant={editMode ? "default" : "outline"}
        onClick={toggleEditMode}
        className="rounded-full"
      >
        {editMode ? <Eye className="h-4 w-4 mr-1" /> : <Pencil className="h-4 w-4 mr-1" />}
        {editMode ? "Sair da edição" : "Modo Edição"}
      </Button>
      <Button size="sm" variant="ghost" onClick={signOut} className="rounded-full">
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function AdminLoginLink() {
  const { user } = useAuth();
  if (user) return null;
  return (
    <Link
      to="/admin/login"
      className="fixed bottom-4 right-4 z-50 opacity-30 hover:opacity-100 transition-opacity"
      aria-label="Admin"
    >
      <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
        <LogIn className="h-3.5 w-3.5" />
      </Button>
    </Link>
  );
}
