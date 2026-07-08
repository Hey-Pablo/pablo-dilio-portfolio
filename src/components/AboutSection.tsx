
import { User, Code, Book, Settings } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Book,
      title: "Formação Acadêmica",
      description: "Formado em Análise e Desenvolvimento de Sistemas"
    },
    {
      icon: Code,
      title: "Experiência Atual",
      description: "Analista de Implantação e Suporte ERP — implantação, configuração e suporte B2B"
    },
    {
      icon: Settings,
      title: "Especialização",
      description: "Sistemas ERP, módulos Fiscal, Financeiro, Compras, Vendas, Estoque e Transporte"
    },
    {
      icon: User,
      title: "Objetivo",
      description: "Entregar soluções que agreguem valor aos processos dos clientes"
    }
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Conheça minha trajetória de crescimento profissional e acadêmico na área de tecnologia
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-in-left">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Minha Trajetória</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Analista de Implantação e Suporte ERP, formado em Análise e Desenvolvimento de Sistemas, com experiência na implantação, configuração, parametrização e suporte de sistemas ERP. Atuação no atendimento a clientes B2B, conduzindo projetos de implantação desde o levantamento das necessidades até a homologação e entrada em produção, realizando treinamentos de usuários, suporte funcional, parametrização de módulos e acompanhamento pós-implantação. Vivência com os módulos Fiscal, Financeiro, Compras, Vendas, Estoque e Transporte, suporte à emissão de documentos fiscais eletrônicos (NF-e, NFC-e, NFS-e e CT-e), desenvolvimento de consultas SQL em SQL Server, importação de dados e configuração de integrações bancárias. Profissional com perfil analítico, comunicação clara e foco na resolução de problemas, comprometido em compreender as regras de negócio e entregar soluções que agreguem valor aos processos dos clientes. Conhecimentos em Power BI, PostgreSQL, Git/GitHub e metodologias ágeis (Scrum e Kanban).
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
