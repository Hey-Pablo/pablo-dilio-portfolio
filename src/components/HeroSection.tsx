import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import { Github, Linkedin, Mail, Download, ArrowRight, Rocket } from "lucide-react";

const HeroSection = () => {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "./Curriculo_Pablo_Dilio.pdf";
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
      className="relative min-h-screen overflow-hidden bg-[#030303] pt-24 pb-16"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <BlackHoleHeroSection
          focus={isNarrow ? [0.5, 0.78] : [0.72, 0.46]}
          scrim={isNarrow ? "top" : "left"}
          scrimStrength={0.88}
          distance={24}
          elevation={isNarrow ? -7 : -5.5}
          fov={isNarrow ? 58 : 42}
          glow={isNarrow ? 0.78 : 0.9}
          steps={isNarrow ? 180 : 260}
          resolution={isNarrow ? 0.52 : 0.64}
          maxDpr={1.5}
          hotColor="#F7F1E5"
          midColor="#C47A36"
          coolColor="#4A1F0A"
          starBrightness={0}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/75 to-transparent md:w-[68%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/20" />
      </div>

      <div className="container-custom relative z-10 flex min-h-[calc(100vh-9rem)] items-center">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm animate-on-scroll">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
            </span>
            <span className="text-xs font-mono tracking-wider text-white/75">
              disponível para novas oportunidades em ERP
            </span>
          </div>

          <p className="mb-3 text-sm font-mono tracking-widest text-amber-300/80 animate-on-scroll stagger-1">
            &lt;erp_analyst/&gt;
          </p>

          <h1 className="mb-6 text-5xl font-bold leading-[1.05] text-white animate-on-scroll stagger-2 md:text-6xl lg:text-7xl">
            Pablo Adriano
            <br />
            <span className="text-white/65">Maciel Dilio</span>
          </h1>

          <h2 className="mb-4 text-xl font-semibold text-white/90 animate-on-scroll stagger-3 md:text-2xl">
            Analista de Implantação e Suporte ERP
          </h2>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/65 animate-on-scroll stagger-4">
            Especialista em implantação, configuração, parametrização e suporte de sistemas ERP. Conduzo projetos de implantação B2B do levantamento de necessidades até a homologação e produção, com foco em módulos fiscais, financeiros, compras, vendas, estoque e transporte.
          </p>

          <div className="mb-10 flex flex-col gap-4 animate-on-scroll stagger-5 sm:flex-row">
            <Button
              size="lg"
              onClick={() => scrollTo("#projects")}
              className="h-12 rounded-full border border-amber-300/30 bg-amber-200 px-7 text-base text-black shadow-[0_10px_35px_-15px_rgba(251,191,36,0.8)] hover:bg-amber-100"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Ver Projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="h-12 rounded-full border-white/20 bg-white/[0.04] px-7 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar CV
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo("#contact")}
              className="h-12 rounded-full px-7 text-base text-white/75 hover:bg-white/10 hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Entrar em Contato
            </Button>
          </div>

          <div className="flex gap-3">
            {[
              { href: "https://github.com/Hey-Pablo", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/pablo-dilio-4063991b2", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:dilio.pablo@gmail.com", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-transform hover:-translate-y-1"
              >
                <Icon size={20} className="text-white/70 transition-colors group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
