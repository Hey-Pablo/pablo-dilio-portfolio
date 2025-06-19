import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Loader2 } from "lucide-react";
import jsPDF from 'jspdf';
import { useBackgroundRemoval } from '@/hooks/useBackgroundRemoval';

const HeroSection = () => {
  const { processedImageUrl, isProcessing } = useBackgroundRemoval('/lovable-uploads/bc60a79a-a663-40ce-b8c2-79fa0644866a.png');

  const handleDownloadCV = () => {
    const doc = new jsPDF();
    
    // Configuração do documento
    doc.setFontSize(20);
    doc.text('Pablo Adriano Maciel Dilio', 20, 30);
    
    doc.setFontSize(14);
    doc.text('Desenvolvedor Full Stack', 20, 40);
    
    doc.setFontSize(12);
    doc.text('Email: dilio.pablo@gmail.com', 20, 55);
    doc.text('Telefone: (19) 99269-8202', 20, 65);
    doc.text('Localização: Piracicaba, SP', 20, 75);
    doc.text('LinkedIn: https://www.linkedin.com/in/pablo-dilio-4063991b2', 20, 85);
    doc.text('GitHub: https://github.com/Hey-Pablo', 20, 95);
    
    doc.setFontSize(14);
    doc.text('FORMAÇÃO ACADÊMICA', 20, 115);
    doc.setFontSize(10);
    doc.text('Análise e Desenvolvimento de Sistemas - Centro Universitário Descomplica', 20, 125);
    doc.text('4º semestre (2023 - Cursando)', 20, 135);
    
    doc.setFontSize(14);
    doc.text('EXPERIÊNCIA PROFISSIONAL', 20, 155);
    doc.setFontSize(10);
    doc.text('TID Software - Auxiliar de Informática Jr. (07/2024 - Atualmente)', 20, 165);
    doc.text('• Suporte ao sistema TID e mapeamento interno', 20, 175);
    doc.text('• Instrução e auxílio nas demandas de suporte ao usuário', 20, 185);
    
    doc.text('Caterpillar Brasil - Aprendiz Administrativo (02/2023 – 06/2024)', 20, 200);
    doc.text('• Conferência de Notas Fiscais (sistemas RED-E e RIS)', 20, 210);
    doc.text('• Transferências de itens entre filiais (sistema SAP)', 20, 220);
    
    doc.setFontSize(14);
    doc.text('HABILIDADES TÉCNICAS', 20, 240);
    doc.setFontSize(10);
    doc.text('• Linguagens: JavaScript, HTML/CSS, SQL', 20, 250);
    doc.text('• Ferramentas: MySQL, SQL Server, Corel Draw, Photoshop', 20, 260);
    doc.text('• Desenvolvimento: Frontend/Backend em formação', 20, 270);
    
    // Salvar o PDF
    doc.save('CV_Pablo_Dilio.pdf');
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
                <Download className="mr-2 h-4 w-4" />
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

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-tech-blue/20 to-tech-green/20 flex items-center justify-center animate-float overflow-hidden">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-tech-blue" />
                    <span className="text-xs text-muted-foreground">Processando...</span>
                  </div>
                ) : (
                  <img 
                    src={processedImageUrl || '/lovable-uploads/bc60a79a-a663-40ce-b8c2-79fa0644866a.png'} 
                    alt="Pablo Dilio"
                    className="w-72 h-72 rounded-full object-cover"
                  />
                )}
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
