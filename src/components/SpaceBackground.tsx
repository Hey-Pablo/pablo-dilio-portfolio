import { memo, useEffect, useMemo, useRef } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { useSectionTheme, type SectionThemeMap } from "@/hooks/useSectionTheme";

/**
 * Global fixed cosmic background:
 *  - Rotating spiral "galaxy" pinned to hero area (fades on scroll)
 *  - 3 parallax starfields at different depths
 *  - Nebula orbs whose hue morphs based on the currently visible section
 *
 * Purely decorative (aria-hidden). Sits behind everything (z-index: -10).
 */

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "projects",
  "gallery",
  "education",
  "certificates",
  "experience",
  "contact",
];

// hue-rotate degrees (relative to base purple/magenta palette)
const THEMES: SectionThemeMap = {
  home:         { hue: 0,   label: "Purple Core" },
  about:        { hue: -30, label: "Deep Blue" },
  skills:       { hue: -20, label: "Nebula Blue" },
  projects:     { hue: 25,  label: "Magenta Cluster" },
  gallery:      { hue: 15,  label: "Rose Nebula" },
  education:    { hue: -10, label: "Indigo" },
  certificates: { hue: 5,   label: "Violet" },
  experience:   { hue: -40, label: "Deep Space" },
  contact:      { hue: -20, label: "Aurora" },
};

const SpaceBackground = memo(() => {
  const y = useScrollParallax();
  const { theme } = useSectionTheme(SECTION_IDS, THEMES, "home");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Galaxy fades out as user scrolls past the first viewport
  const galaxyOpacity = useMemo(() => {
    if (typeof window === "undefined") return 1;
    const vh = window.innerHeight || 800;
    return Math.max(0, 1 - y / (vh * 0.9));
  }, [y]);

  // Animated spiral galaxy on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stable particle field for the galaxy spiral
    const PARTICLES = 900;
    const arms = 3;
    const particles = Array.from({ length: PARTICLES }, (_, i) => {
      const arm = i % arms;
      const t = Math.random();
      const radius = Math.pow(t, 0.6);
      const angle = arm * ((Math.PI * 2) / arms) + radius * 6 + (Math.random() - 0.5) * 0.35;
      return {
        r: radius,
        a: angle,
        size: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        hueShift: Math.random() * 40 - 20,
      };
    });

    let raf = 0;
    let rot = 0;
    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // core glow
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.35);
      core.addColorStop(0, "rgba(255, 240, 255, 0.9)");
      core.addColorStop(0.25, "rgba(217, 70, 239, 0.5)");
      core.addColorStop(0.6, "rgba(124, 58, 237, 0.15)");
      core.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // particles
      for (const p of particles) {
        const a = p.a + rot;
        const x = cx + Math.cos(a) * p.r * maxR;
        const y2 = cy + Math.sin(a) * p.r * maxR * 0.55; // flatten
        const hue = 280 + p.hueShift + p.r * 40;
        ctx.fillStyle = `hsla(${hue}, 95%, ${65 + (1 - p.r) * 20}%, ${p.alpha * (1 - p.r * 0.4)})`;
        ctx.beginPath();
        ctx.arc(x, y2, p.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) rot += 0.0006;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        transition: "filter 1.2s ease",
        filter: `hue-rotate(${theme.hue}deg)`,
      }}
    >
      {/* Nebula orbs (subtle) */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[hsl(var(--nebula-purple))/0.28] blur-3xl animate-float" />
      <div
        className="absolute top-1/3 -right-24 h-[360px] w-[360px] rounded-full bg-[hsl(var(--nebula-magenta))/0.24] blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[hsl(var(--nebula-blue))/0.18] blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Parallax starfields */}
      <div className="stars" style={{ transform: `translate3d(0, ${y * 0.05}px, 0)` }} />
      <div className="stars-2" style={{ transform: `translate3d(0, ${y * 0.12}px, 0)` }} />
      <div className="stars-3" style={{ transform: `translate3d(0, ${y * 0.22}px, 0)` }} />

      {/* Galaxy spiral canvas (hero) */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: galaxyOpacity,
          transition: "opacity 0.2s linear",
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-[min(120vh,1200px)] w-[min(120vw,1400px)]"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
    </div>
  );
});

SpaceBackground.displayName = "SpaceBackground";
export default SpaceBackground;
