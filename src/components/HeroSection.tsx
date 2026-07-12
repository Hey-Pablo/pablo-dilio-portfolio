import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, ArrowRight, Rocket } from "lucide-react";

const HeroSection = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Curriculo_Pablo_Dilio.pdf";
    link.download = "Curriculo_Pablo_Dilio.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Global SpaceBackground is rendered once in Index.tsx (fixed layer). */}

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8 animate-on-scroll">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--nebula-magenta))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--nebula-magenta))]" />
            </span>
            <span className="text-xs font-mono text-white/80 tracking-wider">
              disponível para novas oportunidades em ERP
            </span>
          </div>

          <p className="text-sm font-mono text-[hsl(var(--nebula-blue))] mb-3 tracking-widest animate-on-scroll stagger-1">
            &lt;erp_analyst/&gt;
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-on-scroll stagger-2">
            Pablo Adriano
            <br />
            <span className="gradient-text">Maciel Dilio</span>
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-4 animate-on-scroll stagger-3">
            Analista de Implantação e Suporte ERP
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10 animate-on-scroll stagger-4">
            Especialista em implantação, configuração, parametrização e suporte de sistemas ERP. 
            Conduzo projetos de implantação B2B do levantamento de necessidades até a homologação 
            e produção, com foco em módulos fiscais, financeiros, compras, vendas, estoque e transporte.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-on-scroll stagger-5">
            <Button
              size="lg"
              onClick={() => scrollTo("#projects")}
              className="neon-btn rounded-full px-7 h-12 text-base"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Ver Projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="rounded-full px-7 h-12 text-base glass border-white/20 text-white hover:text-white hover:bg-white/10"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar CV
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo("#contact")}
              className="rounded-full px-7 h-12 text-base text-white/90 hover:bg-white/5 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Entrar em Contato
            </Button>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[
              { href: "https://github.com/Hey-Pablo", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/pablo-dilio-4063991b2", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:dilio.pablo@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl glass hover-lift"
              >
                <Icon size={20} className="text-white/80 group-hover:text-white transition-colors" />
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity neon-glow pointer-events-none" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
