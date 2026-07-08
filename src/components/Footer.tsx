import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Habilidades", href: "#skills" },
    { label: "Experiência", href: "#experience" },
    { label: "Contato", href: "#contact" }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Hey-Pablo",
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/pablo-dilio-4063991b2",
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: "mailto:dilio.pablo@gmail.com",
      label: "Email"
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold gradient-text mb-2">Pablo Dilio</h3>
                <p className="text-sm font-mono text-muted-foreground">&lt;dev/&gt;</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Analista de Implantação e Suporte ERP, formado em Análise e Desenvolvimento de Sistemas. 
                Especializado em implantação, configuração, parametrização e suporte de sistemas ERP, 
                sempre em busca de novos desafios e aprendizado contínuo.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Links Rápidos</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contato</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📍 Piracicaba, SP</p>
                <p>📧 dilio.pablo@gmail.com</p>
                <p>📱 19 99269-8202</p>
                <p className="text-tech-green">🟢 Disponível para projetos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2 md:mb-0">
              <span>© {currentYear} Pablo Adriano Maciel Dilio. Feito com</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>e muito ☕</span>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-mono">v1.0.0 | Em Desenvolvimento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50"
        aria-label="Voltar ao topo"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
