import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, ArrowRight, Rocket } from "lucide-react";
import jsPDF from "jspdf";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useContent";
import EditableText from "@/components/admin/EditableText";

const DEFAULTS = {
  tagline: "disponível para novas missões",
  kicker: "<developer/>",
  name_line1: "Pablo Adriano",
  name_line2: "Maciel Dilio",
  role: "Full Stack Developer & Criador de Experiências Digitais",
  bio: "Desenvolvo sistemas web modernos, interfaces funcionais e experiências digitais que unem tecnologia, design e performance.",
  cta_primary_label: "Ver Projetos",
  cta_primary_target: "#projects",
  cta_secondary_label: "Baixar CV",
  cta_tertiary_label: "Entrar em Contato",
  cta_tertiary_target: "#contact",
};

const SOCIAL_DEFAULTS = [
  { label: "GitHub", url: "https://github.com/Hey-Pablo", icon: "Github" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/pablo-dilio-4063991b2", icon: "Linkedin" },
  { label: "Email", url: "mailto:dilio.pablo@gmail.com", icon: "Mail" },
];

const iconMap: Record<string, any> = { Github, Linkedin, Mail };

const HeroSection = () => {
  const { data: hero } = useSiteContent<typeof DEFAULTS>("hero");
  const { data: socials } = useSiteContent<{ items: typeof SOCIAL_DEFAULTS }>("social_links");
  const update = useUpdateSiteContent();
  const h = { ...DEFAULTS, ...(hero || {}) };
  const socialItems = socials?.items ?? SOCIAL_DEFAULTS;

  const save = (field: string) => (v: string) =>
    update.mutateAsync({ key: "hero", value: { ...h, [field]: v } });

  const handleDownloadCV = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`${h.name_line1} ${h.name_line2}`, 20, 30);
    doc.setFontSize(14);
    doc.text(h.role, 20, 40);
    doc.setFontSize(12);
    doc.text(h.bio, 20, 55, { maxWidth: 170 });
    doc.save("CV.pdf");
  };

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8 animate-on-scroll">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--nebula-magenta))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--nebula-magenta))]" />
            </span>
            <EditableText
              value={h.tagline}
              onSave={save("tagline")}
              className="text-xs font-mono text-white/80 tracking-wider"
            />
          </div>

          <EditableText
            as="p"
            value={h.kicker}
            onSave={save("kicker")}
            className="text-sm font-mono text-[hsl(var(--nebula-blue))] mb-3 tracking-widest animate-on-scroll stagger-1 block"
          />

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-on-scroll stagger-2">
            <EditableText value={h.name_line1} onSave={save("name_line1")} />
            <br />
            <EditableText value={h.name_line2} onSave={save("name_line2")} className="gradient-text" />
          </h1>

          <EditableText
            as="h2"
            value={h.role}
            onSave={save("role")}
            className="text-xl md:text-2xl font-semibold text-white/90 mb-4 animate-on-scroll stagger-3 block"
          />

          <EditableText
            as="p"
            value={h.bio}
            multiline
            onSave={save("bio")}
            className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10 animate-on-scroll stagger-4 block"
          />

          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-on-scroll stagger-5">
            <Button
              size="lg"
              onClick={() => scrollTo(h.cta_primary_target)}
              className="neon-btn rounded-full px-7 h-12 text-base"
            >
              <Rocket className="mr-2 h-4 w-4" />
              {h.cta_primary_label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="rounded-full px-7 h-12 text-base glass border-white/20 text-white hover:text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              {h.cta_secondary_label}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo(h.cta_tertiary_target)}
              className="rounded-full px-7 h-12 text-base text-white/90 hover:bg-white/5 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              {h.cta_tertiary_label}
            </Button>
          </div>

          <div className="flex gap-3">
            {socialItems.map(({ url, icon, label }) => {
              const Icon = iconMap[icon] ?? Mail;
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl glass hover-lift"
                >
                  <Icon size={20} className="text-white/80 group-hover:text-white transition-colors" />
                  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity neon-glow pointer-events-none" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
