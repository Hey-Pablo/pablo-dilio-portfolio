
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Settings, Code, Book } from "lucide-react";

const CertificatesSection = () => {
  const certificateCategories = [
    {
      title: "Desenvolvimento e Programação",
      icon: Code,
      color: "text-tech-blue",
      certificates: [
        {
          name: "Full Stack Developer",
          institution: "Em Andamento",
          date: "Previsão: 05/2025",
          status: "em-andamento",
          skills: ["Full Stack", "Frontend", "Backend", "Database"]
        },
        {
          name: "Backend Developer",
          institution: "Em Andamento", 
          date: "Previsão: 12/2024",
          status: "em-andamento",
          skills: ["APIs", "Server-side", "Database", "Security"]
        },
        {
          name: "Object-Oriented Developer",
          institution: "Instituição",
          date: "09/2024",
          status: "concluido",
          skills: ["OOP", "Design Patterns", "SOLID", "Java"]
        },
        {
          name: "Programmer",
          institution: "Instituição",
          date: "05/2024", 
          status: "concluido",
          skills: ["Logic", "Algorithms", "Data Structures"]
        },
        {
          name: "Basic Frontend",
          institution: "Instituição",
          date: "03/2024",
          status: "concluido", 
          skills: ["HTML", "CSS", "JavaScript", "Responsive"]
        }
      ]
    },
    {
      title: "Design e Multimídia",
      icon: User,
      color: "text-tech-green",
      certificates: [
        {
          name: "Design Gráfico Completo",
          institution: "Microlins",
          date: "2019",
          status: "concluido",
          skills: ["Corel Draw", "Photoshop", "Flash", "After Effects", "3D Studio Max"]
        }
      ]
    },
    {
      title: "Técnico e Infraestrutura", 
      icon: Settings,
      color: "text-tech-blue",
      certificates: [
        {
          name: "Montagem e Manutenção de Computadores e Redes",
          institution: "Microlins",
          date: "2019",
          status: "concluido",
          skills: ["Hardware", "Redes", "Manutenção", "Suporte"]
        },
        {
          name: "Robótica",
          institution: "People",
          date: "2019", 
          status: "concluido",
          skills: ["Automação", "Programação", "Sensores"]
        },
        {
          name: "Auxiliar Mecânico de Manutenção",
          institution: "Instituição",
          date: "08/2022",
          status: "concluido",
          skills: ["Manutenção", "Mecânica", "Preventiva"]
        }
      ]
    },
    {
      title: "Administração e Gestão",
      icon: Book, 
      color: "text-accent",
      certificates: [
        {
          name: "Técnico em Administração",
          institution: "Senai",
          date: "06/2023",
          status: "concluido",
          skills: ["Gestão", "Processos", "Qualidade", "Administração"]
        },
        {
          name: "Profissional Administrativo Tecnológico",
          institution: "Micropro",
          date: "2018",
          status: "concluido",
          skills: ["Office", "Processos", "Documentação"]
        },
        {
          name: "Contabilidade / Secretariado / Departamento Pessoal",
          institution: "Micropro",
          date: "2018",
          status: "concluido",
          skills: ["Contabilidade", "RH", "Secretariado"]
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-tech-green/10 text-tech-green border-tech-green/30";
      case "em-andamento":
        return "bg-tech-blue/10 text-tech-blue border-tech-blue/30";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "concluido":
        return "Concluído";
      case "em-andamento":
        return "Em Andamento";
      default:
        return "Pendente";
    }
  };

  return (
    <section id="certificates" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certificados e <span className="gradient-text">Formações</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha jornada de aprendizado contínuo através de cursos e certificações especializadas
          </p>
        </div>

        <div className="space-y-12">
          {certificateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-in">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 bg-background rounded-lg mr-4 ${category.color}`}>
                  <category.icon size={24} />
                </div>
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>

              {/* Certificates Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.certificates.map((cert, certIndex) => (
                  <div key={certIndex} className="tech-card hover:scale-105 transition-transform duration-300">
                    {/* Certificate Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(cert.status)}`}>
                        {getStatusText(cert.status)}
                      </Badge>
                    </div>

                    {/* Institution and Date */}
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-tech-blue font-medium">{cert.institution}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar size={12} className="mr-1" />
                        {cert.date}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-xs font-medium mb-2">Habilidades:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="tech-card text-center">
            <div className="text-2xl font-bold text-primary mb-1">15+</div>
            <div className="text-xs text-muted-foreground">Certificados</div>
          </div>
          <div className="tech-card text-center">
            <div className="text-2xl font-bold text-tech-green mb-1">4</div>
            <div className="text-xs text-muted-foreground">Áreas de Conhecimento</div>
          </div>
          <div className="tech-card text-center">
            <div className="text-2xl font-bold text-tech-blue mb-1">2</div>
            <div className="text-xs text-muted-foreground">Em Andamento</div>
          </div>
          <div className="tech-card text-center">
            <div className="text-2xl font-bold text-accent mb-1">5+</div>
            <div className="text-xs text-muted-foreground">Anos de Estudos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
