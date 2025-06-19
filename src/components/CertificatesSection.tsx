
import { Calendar, Award, ExternalLink, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CertificatesSection = () => {
  const certificates = [
    {
      id: 1,
      title: "Full Stack Developer",
      institution: "Digital Innovation One",
      date: "05/2025",
      status: "Concluído",
      skills: ["Full Stack", "Frontend", "Backend", "Database"],
      description: "Certificação completa em desenvolvimento full stack com foco em tecnologias modernas."
    },
    {
      id: 2,
      title: "Backend Developer",
      institution: "Digital Innovation One", 
      date: "12/2024",
      status: "Concluído",
      skills: ["APIs", "Server-side", "Database", "Security"],
      description: "Especialização em desenvolvimento backend com foco em APIs e arquitetura de sistemas."
    },
    {
      id: 3,
      title: "Object-Oriented Developer",
      institution: "Digital Innovation One",
      date: "09/2024",
      status: "Concluído",
      skills: ["OOP", "Design Patterns", "SOLID", "Clean Code"],
      description: "Fundamentos sólidos de programação orientada a objetos e boas práticas."
    },
    {
      id: 4,
      title: "Programmer",
      institution: "Digital Innovation One",
      date: "05/2024", 
      status: "Concluído",
      skills: ["Logic", "Algorithms", "Data Structures", "Problem Solving"],
      description: "Base fundamental em lógica de programação e estruturas de dados."
    },
    {
      id: 5,
      title: "Basic Frontend",
      institution: "Digital Innovation One",
      date: "03/2024",
      status: "Concluído", 
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      description: "Introdução ao desenvolvimento frontend com tecnologias essenciais."
    },
    {
      id: 6,
      title: "Técnico em Administração",
      institution: "SENAI",
      date: "06/2023",
      status: "Concluído",
      skills: ["Gestão", "Processos", "Qualidade", "Liderança"],
      description: "Formação técnica em administração com foco em gestão de processos."
    }
  ];

  // COMO PREENCHER OS ESPAÇOS VAZIOS:
  // Para adicionar novos certificados, substitua os objetos em futureCertificates
  // por objetos com a mesma estrutura dos certificados acima.
  // Exemplo:
  // {
  //   id: 7,
  //   title: "Nome do Novo Certificado",
  //   institution: "Nome da Instituição",
  //   date: "MM/AAAA",
  //   status: "Concluído" | "Em Andamento" | "Previsto",
  //   skills: ["Skill1", "Skill2", "Skill3"],
  //   description: "Descrição do certificado..."
  // }
  const futureCertificates = [
    {
      id: 'future-1',
      title: "Em Breve",
      placeholder: true
    },
    {
      id: 'future-2', 
      title: "Em Breve",
      placeholder: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Em Andamento":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Previsto":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <section id="certificates" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certificados e <span className="gradient-text">Formações</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Certificações e cursos que comprovam meu comprometimento com o aprendizado contínuo e desenvolvimento profissional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="tech-card group hover:scale-105 transition-transform duration-300">
              {/* Header do Certificado */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award size={20} className="text-primary" />
                </div>
                <Badge className={getStatusColor(cert.status)}>
                  {cert.status}
                </Badge>
              </div>

              {/* Conteúdo */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={14} className="mr-2" />
                  <span>{cert.institution} • {cert.date}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Espaços para Futuros Certificados */}
          {/* INSTRUÇÕES: Para preencher estes espaços, mova os novos certificados 
              do array futureCertificates para o array certificates acima */}
          {futureCertificates.map((future) => (
            <div key={future.id} className="tech-card border-dashed border-2 border-muted-foreground/30 group hover:border-primary/50 transition-colors duration-300">
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <div className="p-3 bg-muted/50 rounded-lg mb-4 group-hover:bg-primary/10 transition-colors">
                  <Plus size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors mb-2">
                  {future.title}
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Novo certificado será adicionado aqui
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">6</div>
            <div className="text-sm text-muted-foreground">Certificados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-tech-green mb-1">5</div>
            <div className="text-sm text-muted-foreground">Desenvolvimento</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">1</div>
            <div className="text-sm text-muted-foreground">Gestão</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-tech-blue mb-1">2018</div>
            <div className="text-sm text-muted-foreground">Início</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
