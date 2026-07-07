import { User, Code, Book, Settings, LucideIcon } from "lucide-react";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/useContent";
import EditableText from "@/components/admin/EditableText";

const iconMap: Record<string, LucideIcon> = { User, Code, Book, Settings };

const DEFAULTS = {
  title_prefix: "Sobre",
  title_highlight: "Mim",
  subtitle: "Conheça minha trajetória de crescimento profissional e acadêmico na área de tecnologia",
  story_title: "Minha Trajetória",
  story_paragraphs: [
    "Sou Pablo Adriano Maciel Dilio, um desenvolvedor em formação apaixonado por tecnologia e resolução de problemas.",
    "Minha experiência profissional inclui passagens por diversas empresas.",
    "Meus valores profissionais são baseados no aprendizado contínuo.",
  ],
  highlights: [
    { icon: "Book", title: "Formação Acadêmica", description: "" },
    { icon: "Code", title: "Experiência Atual", description: "" },
    { icon: "Settings", title: "Especialização", description: "" },
    { icon: "User", title: "Objetivo", description: "" },
  ],
};

const AboutSection = () => {
  const { data } = useSiteContent<typeof DEFAULTS>("about");
  const update = useUpdateSiteContent();
  const a = { ...DEFAULTS, ...(data || {}) };

  const save = (field: string, v: any) =>
    update.mutateAsync({ key: "about", value: { ...a, [field]: v } });

  const saveParagraph = (idx: number) => (v: string) => {
    const next = [...a.story_paragraphs];
    next[idx] = v;
    return save("story_paragraphs", next);
  };
  const saveHighlight = (idx: number, field: "title" | "description") => (v: string) => {
    const next = a.highlights.map((h: any, i: number) =>
      i === idx ? { ...h, [field]: v } : h
    );
    return save("highlights", next);
  };

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <EditableText value={a.title_prefix} onSave={(v) => save("title_prefix", v)} />{" "}
            <EditableText
              value={a.title_highlight}
              onSave={(v) => save("title_highlight", v)}
              className="gradient-text"
            />
          </h2>
          <EditableText
            as="p"
            multiline
            value={a.subtitle}
            onSave={(v) => save("subtitle", v)}
            className="text-muted-foreground text-lg max-w-2xl mx-auto block"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-in-left">
            <div className="mb-8">
              <EditableText
                as="h3"
                value={a.story_title}
                onSave={(v) => save("story_title", v)}
                className="text-2xl font-semibold mb-4 block"
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {a.story_paragraphs.map((p: string, i: number) => (
                  <EditableText
                    key={i}
                    as="p"
                    multiline
                    value={p}
                    onSave={saveParagraph(i)}
                    className="block"
                  />
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {a.highlights.map((item: any, i: number) => {
                const Icon = iconMap[item.icon] ?? User;
                return (
                  <div key={i} className="tech-card">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <EditableText
                          as="h4"
                          value={item.title}
                          onSave={saveHighlight(i, "title")}
                          className="font-semibold text-sm mb-1 block"
                        />
                        <EditableText
                          as="p"
                          multiline
                          value={item.description}
                          onSave={saveHighlight(i, "description")}
                          className="text-xs text-muted-foreground leading-relaxed block"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
