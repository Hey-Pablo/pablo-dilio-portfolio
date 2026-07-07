import { memo } from "react";

interface SpaceBackgroundProps {
  /** Show large orbiting planet in hero */
  showPlanet?: boolean;
  /** Additional className for the wrapper */
  className?: string;
}

/**
 * Reusable cosmic background: nebula gradients, three starfield layers
 * and an optional glowing planet. Purely decorative (aria-hidden).
 */
const SpaceBackground = memo(({ showPlanet = false, className = "" }: SpaceBackgroundProps) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Nebula orbs */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[hsl(var(--nebula-purple))/0.35] blur-3xl animate-float" />
      <div className="absolute top-1/3 -right-24 h-[360px] w-[360px] rounded-full bg-[hsl(var(--nebula-magenta))/0.30] blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[hsl(var(--nebula-blue))/0.22] blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Starfield layers */}
      <div className="stars" />
      <div className="stars-2" />
      <div className="stars-3" />

      {/* Planet */}
      {showPlanet && (
        <div className="absolute right-[-120px] top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-[420px] w-[420px]">
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#D946EF] to-[#38BDF8] opacity-30 blur-3xl animate-pulse-glow" />
            {/* Planet body */}
            <div
              className="absolute inset-6 rounded-full animate-spin-slow"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #EC4899 0%, #7C3AED 35%, #0B001F 75%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.4), transparent 40%)",
                boxShadow:
                  "inset -30px -40px 80px rgba(0,0,0,0.7), inset 20px 30px 60px rgba(217,70,239,0.35), 0 0 60px rgba(124,58,237,0.4)",
              }}
            />
            {/* Orbit ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 rotate-[20deg]" />
            <div className="absolute inset-8 rounded-full border border-white/5 -rotate-[15deg]" />
          </div>
        </div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
});

SpaceBackground.displayName = "SpaceBackground";
export default SpaceBackground;
