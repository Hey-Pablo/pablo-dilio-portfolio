
import { Book, Calendar, User, GraduationCap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EducationSection = () => {
  const education = [
    {
      institution: "Centro Universitário União das Américas Descomplica",
      course: "Análise e Desenvolvimento de Sistemas",
      period: "01/2023 - Cursando",
      status: "4º semestre",
      description: "Foco em desenvolvimento full stack e análise de sistemas. Aprendendo sobre modelagem de dados, programação orientada a objetos, desenvolvimento web e metodologias ágeis.",
      highlights: [
        "Desenvolvimento Full Stack",
        "Análise de Sistemas", 
        "Modelagem de Dados",
        "Metodologias Ágeis",
        "Programação Orientada a Objetos"
      ]
    },
    {
      institution: "Colégio Mello Ayres",
      course: "Ensino Médio Completo",
      period: "2017 - 2019",
      status: "Concluído",
      description: "Formação básica com foco em exatas e preparação para ensino superior. Base sólida em matemática e ciências que contribuiu para o interesse em tecnologia.",
      highlights: [
        "Formação em Exatas",
        "Preparação Vestibular",
        "Base Matemática",
        "Ciências"
      ]
    }
  ];

  const technicalCourses = [
    {
      institution: "SENAI",
      course: "Técnico em Administração",
      period: "06/2023",
      status: "Concluído",
      highlights: ["Gestão", "Processos", "Qualidade", "Liderança"]
    },
    {
      institution: "Digital Innovation One",
      course: "Backend Developer",
      period: "12/2024",
      status: "Concluído",
      highlights: ["APIs", "Server-side", "Database", "Security"]
    },
    {
      institution: "Digital Innovation One",
      course: "Object-Oriented Developer",
      period: "09/2024",
      status: "Concluído",
      highlights: ["OOP", "Design Patterns", "SOLID", "Clean Code"]
    },
    {
      institution: "Digital Innovation One",
      course: "Programmer",
      period: "05/2024",
      status: "Concluído",
      highlights: ["Logic", "Algorithms", "Data Structures"]
    },
    {
      institution: "Digital Innovation One",
      course: "Basic Frontend",
      period: "03/2024",
      status: "Concluído",
      highlights: ["HTML5", "CSS3", "JavaScript", "Responsive"]
    },
    {
      institution: "Certificação",
      course: "Auxiliar Mecânico de Manutenção",
      period: "08/2022",
      status: "Concluído",
      highlights: ["Manutenção", "Mecânica", "Equipamentos"]
    },
    {
      institution: "People",
      course: "Robótica",
      period: "2019",
      status: "Concluído",
      highlights: ["Automação", "Programação", "Eletrônica"]
    },
    {
      institution: "Microlins",
      course: "Montagem e Manutenção de Computadores e Redes",
      period: "2019",
      status: "Concluído",
      highlights: ["Hardware", "Redes", "Manutenção", "Infraestrutura"]
    },
    {
      institution: "Microlins",
      course: "Design Gráfico e Multimídia",
      period: "2019",
      status: "Concluído",
      highlights: ["Corel Draw", "Photoshop", "Flash", "After Effects", "3D Studio Max"]
    },
    {
      institution: "Micropro",
      course: "Profissional Administrativo Tecnológico",
      period: "2018",
      status: "Concluído",
      highlights: ["Administração", "Tecnologia", "Gestão"]
    },
    {
      institution: "Micropro",
      course: "Contabilidade / Secretariado / Departamento Pessoal",
      period: "2018",
      status: "Concluído",
      highlights: ["Contabilidade", "RH", "Secretariado", "Legislação"]
    }
  ];

  return (
    <section id="education" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Formação <span className="gradient-text">Acadêmica</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Minha trajetória educacional focada em tecnologia e desenvolvimento profissional
          </p>
        </div>

        {/* Formação Acadêmica */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center mb-8">
            <GraduationCap className="mr-3 text-primary" size={24} />
            <h3 className="text-xl font-semibold">Formação Acadêmica</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

            {education.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full md:transform md:-translate-x-1.5 z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="tech-card animate-fade-in">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{item.course}</h3>
                        <p className="text-tech-blue font-medium text-sm">{item.institution}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.status === "Concluído" ? "default" : "secondary"}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar size={14} className="mr-2" />
                      {item.period}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Principais áreas:</h4>
                      <div className="flex flex-wrap gap-1">
                        {item.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cursos Técnicos e Profissionalizantes */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Award className="mr-3 text-primary" size={24} />
            <h3 className="text-xl font-semibold">Cursos Técnicos e Profissionalizantes</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCourses.map((course, index) => (
              <div key={index} className="tech-card group hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award size={16} className="text-primary" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {course.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {course.course}
                  </h4>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={12} className="mr-2" />
                    <span>{course.institution} • {course.period}</span>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.highlights.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Status */}
        <div className="text-center mt-16">
          <div className="tech-card max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Book size={20} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Status Atual</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Atualmente no 4º semestre de ADS, com previsão de conclusão em 2025. 
              Focado em projetos práticos que integram desenvolvimento frontend e backend, 
              sempre buscando aplicar os conhecimentos teóricos em situações reais de trabalho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
