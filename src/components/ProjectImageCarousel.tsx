import { memo, useEffect, useState, useCallback } from "react";
import { Projector, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  images?: string[];
  fallbackGradient: string;
  interval?: number;
  className?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  onIndexChange?: (index: number) => void;
}

/**
 * Cross-fade slideshow of project images.
 * Falls back to a gradient "planet" when no images are provided.
 */
const ProjectImageCarousel = memo(
  ({
    images,
    fallbackGradient,
    interval = 3500,
    className = "",
    alt = "",
    objectFit = "cover",
    onIndexChange,
  }: Props) => {
    const list = images?.filter(Boolean) ?? [];
    const hasImages = list.length > 0;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback((i: number) => {
      setIndex(i);
    }, []);

    const prev = useCallback(() => {
      setIndex((i) => (i - 1 + list.length) % list.length);
    }, [list.length]);

    const next = useCallback(() => {
      setIndex((i) => (i + 1) % list.length);
    }, [list.length]);

    useEffect(() => {
      if (!hasImages || list.length < 2 || paused) return;
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % list.length);
      }, interval);
      return () => window.clearInterval(id);
    }, [hasImages, list.length, paused, interval]);

    useEffect(() => {
      onIndexChange?.(index);
    }, [index, onIndexChange]);

    useEffect(() => {
      if (list.length < 2) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          prev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          next();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [list.length, prev, next]);

    if (!hasImages) {
      return (
        <div
          className={`relative overflow-hidden ${className}`}
          aria-hidden="true"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${fallbackGradient} opacity-80`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_55%)]" />
          <div className="absolute -bottom-16 -right-10 h-40 w-40 rounded-full bg-black/40 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-white/30 to-transparent border border-white/20 backdrop-blur-sm animate-float flex items-center justify-center">
              <Projector size={32} className="text-white drop-shadow-lg" />
            </div>
          </div>
        </div>
      );
    }

    const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {list.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={alt}
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* subtle overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Side click zones */}
        {list.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Imagem anterior"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-0 top-0 bottom-0 w-1/4 z-20 flex items-center justify-start pl-2 group focus:outline-none"
            >
              <span className="p-2 rounded-full bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <ChevronLeft size={24} />
              </span>
            </button>
            <button
              type="button"
              aria-label="Próxima imagem"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-0 top-0 bottom-0 w-1/4 z-20 flex items-center justify-end pr-2 group focus:outline-none"
            >
              <span className="p-2 rounded-full bg-black/40 text-white/70 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                <ChevronRight size={24} />
              </span>
            </button>
          </>
        )}

        {list.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para imagem ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ProjectImageCarousel.displayName = "ProjectImageCarousel";
export default ProjectImageCarousel;
