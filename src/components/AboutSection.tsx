
import { User, Code, Book, Settings } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Book,
      title: "Formação Acadêmica",
      description: "4º semestre de ADS - Centro Universitário União das Américas Descomplica"
    },
    {
      icon: Code,
      title: "Experiência Atual",
      description: "Auxiliar de Informática Jr. na TID Software - Suporte e desenvolvimento"
    },
    {
      icon: Settings,
      title: "Especialização",
      description: "Desenvolvimento Full Stack com foco em sistemas web e análise"
    },
    {
      icon: User,
      title: "Objetivo",
      description: "Consolidar conhecimentos e me tornar um desenvolvedor full stack completo"
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
                  Sou Pablo Adriano Maciel Dilio, um desenvolvedor em formação apaixonado por tecnologia 
                  e resolução de problemas. Atualmente no 4º semestre de Análise e Desenvolvimento de 
                  Sistemas, tenho uma trajetória única que me levou da área de vendas até a TI.
                </p>
                <p>
                  Minha experiência profissional inclui passagens pela Magazine Luiza, Caterpillar Brasil 
                  e atualmente na TID Software, onde atuo como Auxiliar de Informática Jr. Essa progressão 
                  me proporcionou uma visão ampla de negócios e a capacidade de entender as necessidades 
                  reais dos usuários.
                </p>
                <p>
                  Meus valores profissionais são baseados no aprendizado contínuo, resolução de problemas 
                  complexos e na busca constante por conhecimento técnico. Estou focado em me tornar um 
                  desenvolvedor full stack completo, combinando frontend e backend.
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
