
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import jsPDF from 'jspdf';

const HeroSection = () => {
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
    
    // FORMAÇÃO ACADÊMICA
    doc.setFontSize(14);
    doc.text('FORMAÇÃO ACADÊMICA', 20, 115);
    doc.setFontSize(10);
    doc.text('Análise e Desenvolvimento de Sistemas', 20, 125);
    doc.text('Centro Universitário União das Américas Descomplica', 20, 133);
    doc.text('4º semestre (01/2023 - Cursando)', 20, 141);
    
    doc.text('Ensino Médio Completo - Colégio Mello Ayres (2017 - 2019)', 20, 155);
    
    // EXPERIÊNCIA PROFISSIONAL
    doc.setFontSize(14);
    doc.text('EXPERIÊNCIA PROFISSIONAL', 20, 175);
    doc.setFontSize(10);
    
    doc.text('TID Software - Auxiliar de Informática Jr. (07/2024 - Atualmente)', 20, 185);
    doc.text('• Introdução ao usuário e suporte geral do sistema TID', 20, 193);
    doc.text('• Mapeamento de sistemas internos dos clientes', 20, 201);
    doc.text('• Suporte técnico e atendimento de demandas', 20, 209);
    doc.text('• Visitas a empresas para atendimento especializado', 20, 217);
    
    doc.text('Caterpillar Brasil - Aprendiz Administrativo (02/2023 – 06/2024)', 20, 230);
    doc.text('• Conferência de Notas Fiscais e classificação para depreciação', 20, 238);
    doc.text('• Operação dos sistemas RED-E, RIS e SAP', 20, 246);
    doc.text('• Transferências de itens entre filiais', 20, 254);
    doc.text('• Elaboração de relatórios mensais de depreciação', 20, 262);
    
    doc.text('Magazine Luiza - Assistente de Vendas Jr. (04/2022 - 01/2023)', 20, 275);
    doc.text('• Controle e organização de estoque', 20, 283);
    doc.text('• Aplicação de metodologias 5S e FIFO', 20, 291);
    
    // Nova página para cursos e habilidades
    doc.addPage();
    
    // CURSOS TÉCNICOS E CERTIFICAÇÕES
    doc.setFontSize(14);
    doc.text('CURSOS TÉCNICOS E CERTIFICAÇÕES', 20, 30);
    doc.setFontSize(10);
    
    doc.text('Desenvolvimento:', 20, 45);
    doc.text('• Full Stack Developer - Digital Innovation One (05/2025)', 20, 53);
    doc.text('• Backend Developer - Digital Innovation One (12/2024)', 20, 61);
    doc.text('• Object-Oriented Developer - Digital Innovation One (09/2024)', 20, 69);
    doc.text('• Programmer - Digital Innovation One (05/2024)', 20, 77);
    doc.text('• Basic Frontend - Digital Innovation One (03/2024)', 20, 85);
    
    doc.text('Administração e Gestão:', 20, 100);
    doc.text('• Técnico em Administração - SENAI (06/2023)', 20, 108);
    doc.text('• Profissional Administrativo Tecnológico - Micropro (2018)', 20, 116);
    doc.text('• Contabilidade/Secretariado/Dept. Pessoal - Micropro (2018)', 20, 124);
    
    doc.text('Design e Multimídia:', 20, 139);
    doc.text('• Design Gráfico e Multimídia - Microlins (2019)', 20, 147);
    doc.text('  (Corel Draw, Photoshop, Flash, After Effects, 3D Studio Max)', 20, 155);
    
    doc.text('Técnicos Especializados:', 20, 170);
    doc.text('• Montagem e Manutenção de Computadores e Redes - Microlins (2019)', 20, 178);
    doc.text('• Robótica - People (2019)', 20, 186);
    doc.text('• Auxiliar Mecânico de Manutenção (08/2022)', 20, 194);
    
    // HABILIDADES TÉCNICAS
    doc.setFontSize(14);
    doc.text('HABILIDADES TÉCNICAS', 20, 215);
    doc.setFontSize(10);
    doc.text('• Linguagens: JavaScript, HTML/CSS, Java, Python, C#, SQL', 20, 225);
    doc.text('• Ferramentas: MySQL, SQL Server, Git/GitHub, VS Code', 20, 233);
    doc.text('• Design: Photoshop, Corel Draw', 20, 241);
    doc.text('• Sistemas: SAP, RED-E, RIS, Docker', 20, 249);
    doc.text('• Metodologias: Scrum/Kanban, UML, 5S, FIFO', 20, 257);
    
    // PROJETOS
    doc.setFontSize(14);
    doc.text('PROJETOS DESENVOLVIDOS', 20, 275);
    doc.setFontSize(10);
    doc.text('• Sistema de Controle de Finanças - https://xn--finanaspro-s6a.net/', 20, 285);
    doc.text('• Portfólio Pessoal - Desenvolvido com React e TypeScript', 20, 293);
    
    // Salvar o PDF
    doc.save('CV_Pablo_Dilio.pdf');
    console.log("Download CV atualizado iniciado");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container-custom">
        <div className="flex justify-center items-center">
          {/* Content */}
          <div className="text-center animate-slide-in-left max-w-4xl">
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
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Estudante de ADS no 4º semestre, apaixonado por tecnologia e desenvolvimento completo. 
                Atualmente trabalhando como Auxiliar de Informática Jr. na TID Software, 
                focado em expandir conhecimentos em frontend e backend.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
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
            <div className="flex justify-center gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
