import { useSiteContent, useUpdateSiteContent } from "@/hooks/useContent";
import EditableText from "./EditableText";

interface Props {
  sectionKey: "projects" | "education" | "certificates" | "experience" | "skills";
  showKicker?: boolean;
  fallback: {
    kicker?: string;
    title_prefix: string;
    title_highlight: string;
    subtitle: string;
  };
}

/**
 * Reads titles from site_content.section_titles[sectionKey] and lets admin edit inline.
 */
export default function SectionHeader({ sectionKey, showKicker, fallback }: Props) {
  const { data } = useSiteContent<Record<string, any>>("section_titles");
  const update = useUpdateSiteContent();
  const cur = (data && data[sectionKey]) || {};

  const save = async (field: string, v: string) => {
    const next = {
      ...(data || {}),
      [sectionKey]: { ...cur, [field]: v },
    };
    await update.mutateAsync({ key: "section_titles", value: next });
  };

  const kicker = cur.kicker ?? fallback.kicker;
  const title_prefix = cur.title_prefix ?? fallback.title_prefix;
  const title_highlight = cur.title_highlight ?? fallback.title_highlight;
  const subtitle = cur.subtitle ?? fallback.subtitle;

  return (
    <div className="text-center mb-14">
      {showKicker && kicker && (
        <EditableText
          as="p"
          value={kicker}
          onSave={(v) => save("kicker", v)}
          className="text-sm font-mono text-[hsl(var(--nebula-blue))] mb-3 tracking-widest inline-block"
        />
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-4">
        <EditableText value={title_prefix} onSave={(v) => save("title_prefix", v)} />{" "}
        <EditableText
          value={title_highlight}
          onSave={(v) => save("title_highlight", v)}
          className="gradient-text"
        />
      </h2>
      <EditableText
        as="p"
        value={subtitle}
        multiline
        onSave={(v) => save("subtitle", v)}
        className="text-muted-foreground text-lg max-w-2xl mx-auto block"
      />
    </div>
  );
}
