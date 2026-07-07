import { useEffect, useState } from "react";

/**
 * Returns the current window.scrollY, throttled via rAF.
 * Disabled (returns 0) when the user prefers reduced motion.
 */
export const useScrollParallax = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setY(window.scrollY);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
};
