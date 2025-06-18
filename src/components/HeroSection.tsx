
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, User } from "lucide-react";

const HeroSection = () => {
  const handleDownloadCV = () => {
    // Aqui seria implementado o download do CV
    console.log("Download CV iniciado");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-slide-in-left">
            <div className="mb-6">
              <p className="text-tech-blue font-mono text-sm mb-2">
                &lt;developer&gt;
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Pablo Adriano 
                <br />
                <span className="gradient-text">Maciel Dilio</span>
              </h1>
              <p className="text-tech-blue font-mono text-sm">
                &lt;/developer&gt;
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold text-tech-gray mb-4">
                Desenvolvedor Full Stack
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                Estudante de ADS no 4º semestre, apaixonado por tecnologia e desenvolvimento completo. 
                Atualmente trabalhando como Auxiliar de Informática Jr. na TID Software, 
                focado em expandir conhecimentos em frontend e backend.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleDownloadCV}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <User className="mr-2 h-4 w-4" />
                Download CV
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="mr-2 h-4 w-4" />
                Entre em Contato
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              <a 
                href="https://github.com/Hey-Pablo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-tech-blue hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/pablo-dilio-4063991b2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted hover:bg-tech-blue hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:dilio.pablo@gmail.com"
                className="p-3 rounded-full bg-muted hover:bg-tech-green hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-tech-blue/20 to-tech-green/20 flex items-center justify-center animate-float">
                <div className="w-72 h-72 rounded-full bg-muted flex items-center justify-center">
                  <User size={120} className="text-muted-foreground" />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/90 px-3 py-1 rounded-full text-xs font-mono text-muted-foreground">
                    Foto de Perfil
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-tech-green rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-tech-blue rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
