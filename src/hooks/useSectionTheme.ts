import { useEffect, useState } from "react";

export interface SectionThemeMap {
  [sectionId: string]: {
    hue: number; // degrees, css hue-rotate
    label?: string;
  };
}

/**
 * Watches which section is most visible and returns its theme entry.
 * Sections are identified by id attribute on the DOM.
 */
export const useSectionTheme = (
  sectionIds: string[],
  themes: SectionThemeMap,
  fallbackId: string
) => {
  const [activeId, setActiveId] = useState(fallbackId);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.intersectionRatio);
        }
        let best = fallbackId;
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveId(best);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, fallbackId]);

  return { activeId, theme: themes[activeId] ?? themes[fallbackId] };
};
