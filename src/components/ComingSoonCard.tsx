import { Plus } from "lucide-react";

interface ComingSoonCardProps {
  title?: string;
  subtitle?: string;
}

const ComingSoonCard = ({
  title = "Em Breve",
  subtitle = "Novo item será adicionado aqui",
}: ComingSoonCardProps) => {
  return (
    <div className="tech-card border-dashed border-2 border-muted-foreground/30 group hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, hsl(var(--primary) / 0.15), transparent 70%)",
        }}
      />

      <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center relative z-10">
        <div className="p-3 bg-muted/50 dark:bg-white/5 rounded-2xl mb-4 group-hover:bg-primary/10 transition-colors">
          <Plus size={28} className="text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors mb-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground/70">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default ComingSoonCard;
