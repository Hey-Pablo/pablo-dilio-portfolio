
import { useState } from "react";
import { Mail, User, Github, Linkedin, Calendar, Check } from "lucide-react";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "dilio.pablo@gmail.com",
      href: "mailto:dilio.pablo@gmail.com"
    },
    {
      icon: User,
      label: "Telefone",
      value: "19 99269-8202",
      href: "tel:+551****8202"
    },
    {
      icon: User,
      label: "Localização",
      value: "Piracicaba, SP",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Hey-Pablo",
      color: "hover:text-tech-blue"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/pablo-dilio-4063991b2",
      color: "hover:text-tech-blue"
    },
    {
      icon: Mail,
      label: "Email",
      action: "copy",
      email: "dilio.pablo@gmail.com",
      color: "hover:text-tech-green"
    }
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("dilio.pablo@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text method
      const textarea = document.createElement("textarea");
      textarea.value = "dilio.pablo@gmail.com";
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" data-scroll-reveal="section" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vamos conversar sobre oportunidades, projetos ou colaborações. Estou sempre aberto a novos desafios!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="animate-fade-in">
            {/* Contact Details */}
            <div className="tech-card mb-6">
              <h3 className="text-xl font-semibold mb-6">Informações de Contato</h3>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${
                      contact.href === "#" ? "pointer-events-none" : ""
                    }`}
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <contact.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.label}</p>
                      <p className="text-sm text-muted-foreground">{contact.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="tech-card mb-6">
              <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
              
              <div className="flex space-x-4 items-center">
                {socialLinks.map((social, index) =>
                  social.action === "copy" ? (
                    <button
                      key={index}
                      onClick={handleCopyEmail}
                      title={copied ? "Email copiado!" : "Copiar email"}
                      className={`p-3 bg-muted rounded-lg transition-all duration-300 hover:scale-110 relative ${social.color}`}
                    >
                      {copied ? <Check size={20} className="text-tech-green" /> : <social.icon size={20} />}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-muted rounded-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <social.icon size={20} />
                    </a>
                  )
                )}

                {/* Toast */}
                {copied && (
                  <div className="text-xs text-tech-green font-medium animate-pulse">
                    Copiado!
                  </div>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="tech-card">
              <h3 className="text-lg font-semibold mb-4">Disponibilidade</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-tech-green" />
                  <span className="text-sm">Disponível para freelances</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-tech-blue" />
                  <span className="text-sm">Aberto a oportunidades de estágio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-accent" />
                  <span className="text-sm">Interessado em projetos colaborativos</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Tempo de resposta: Geralmente dentro de 24 horas
                </p>
              </div>
            </div>
          </div>

          {/* Professional Image Placeholder */}
          <div className="animate-slide-in-left">
            <div className="tech-card h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-tech-blue/20 to-tech-green/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User size={64} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pablo Adriano Maciel Dilio</h3>
                <p className="text-muted-foreground">Analista de Implantação e Suporte ERP</p>
                <p className="text-sm text-muted-foreground mt-2">Piracicaba, SP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
