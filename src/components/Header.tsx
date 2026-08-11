import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Sobre" },
    { href: "#skills", label: "Habilidades" },
    { href: "#projects", label: "Projetos" },
    { href: "#case-studies", label: "Cases" },
    { href: "#experience", label: "Experiência" },
    { href: "#contact", label: "Contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_-12px_rgba(124,58,237,0.35)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-200"
            >
              Pablo Dilio
            </a>
            <span className="ml-2 text-sm text-foreground/50 dark:text-white/50 font-mono hidden sm:inline">
              &lt;dev/&gt;
            </span>
          </div>

          <div className="nav-limelight-shell hidden md:flex items-center gap-1 rounded-full px-2 py-1.5">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="nav-limelight-link relative rounded-full px-3 py-1.5 text-sm font-medium text-foreground/70 transition-all duration-300 hover:-translate-y-px hover:text-foreground dark:text-white/70 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-foreground/80 dark:text-white/80 hover:bg-foreground/10 dark:hover:bg-white/10 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu-panel md:hidden absolute top-full left-0 right-0 z-50 mt-2 mx-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-2xl animate-fade-in">
            <div className="py-3 px-2">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-4 py-3 text-sm font-medium text-foreground/90 dark:text-white/90 hover:text-foreground dark:hover:text-white hover:bg-foreground/10 dark:hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
