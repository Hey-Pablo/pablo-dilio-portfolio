import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import galleryData from "@/data/gallery.json";
import type { GalleryItem } from "@/data/types";

const creations = galleryData as GalleryItem[];


const GallerySection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-mono text-[hsl(var(--nebula-magenta))] mb-3 tracking-widest">
            &lt;creative_universe/&gt;
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Criações <span className="gradient-text">Digitais</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Um espaço para experimentos visuais, arte com IA, mockups e projetos criativos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActive(item.id)}
                onMouseLeave={() => setActive(null)}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden glass hover-lift cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Media placeholder / gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-70 group-hover:opacity-90 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />

                {/* Floating icon */}
                <div className="absolute top-4 left-4 h-11 w-11 rounded-xl glass-strong flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>

                <Badge className="absolute top-4 right-4 glass-strong border-white/20 text-white text-xs">
                  {item.category}
                </Badge>

                {/* Bottom info panel */}
                <div className={`absolute inset-x-0 bottom-0 p-5 glass-strong transition-transform duration-500 ${active === item.id ? "translate-y-0" : "translate-y-2"}`}>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10">
          Em breve novas peças, vídeos e experimentos serão adicionados a este universo.
        </p>
      </div>
    </section>
  );
};

export default GallerySection;
