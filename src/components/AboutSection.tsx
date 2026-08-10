
import { User, Code, Book, Settings } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Book,
      title: "Formação Acadêmica",
      description: "Formado em Análise e Desenvolvimento de Sistemas e cursando pós-graduação em Análise de Dados (Descomplica)"
    },
    {
      icon: Code,
      title: "Experiência Atual",
      description: "Analista de Implantação e Suporte ERP — implantação, configuração e suporte B2B"
    },
    {
      icon: Settings,
      title: "Especialização",
      description: "Sistemas ERP, Criação de Sites, Manutenção de Sites, Atendimentos B2B e B2C, Pequenas automações"
    },
    {
      icon: User,
      title: "Objetivo",
      description: "Entregar soluções que agreguem valor aos processos dos clientes"
    }
  ];

  return (
    <section id="about" data-scroll-reveal="section" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça minha trajetória profissional na área de tecnologia e sistemas ERP
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-in-left">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Minha Trajetória</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
            Analista de Implantação e Suporte ERP com experiência em SQL, dados e desenvolvimento web. Atuo do levantamento de requisitos à homologação, conectando regras de negócio, usuários e tecnologia para entregar soluções funcionais.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="tech-card">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
