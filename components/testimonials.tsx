"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Play, Pause } from "@phosphor-icons/react";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

const featuredTestimonials = [
  {
    id: 1,
    src: "/testimonios/1.mp4",
    name: "Luis Fernando",
    role: "Venezuela",
    quote:
      "",
  },
  {
    id: 2,
    src: "/testimonios/2.mp4",
    name: "Agustín",
    role: "Argentina",
    quote:
      "",
  },
  {
    id: 3,
    src: "/testimonios/4.mp4",
    name: "Alexis",
    role: "México",
    quote:
      "",

  },
];

const moreTestimonials = [
  {
    
    id: 4,
    src: "/testimonios/3.mp4",
    name: "Mariano",
    role: "Argentina",
    quote:
      "",
  },
  {
    id: 5,
    src: "/testimonios/5.mp4",
    name: "Gabriel",
    role: "Argentina - Salta",
    quote:
      "",
  },
];

interface VideoCardProps {
  item: (typeof featuredTestimonials)[0];
  index: number;
  active: number | null;
  setActive: (index: number | null) => void;
  playingId: number | null;
  setPlayingId: (id: number | null) => void;
  isMobile?: boolean;
}

function VideoCard({
  item,
  index,
  active,
  setActive,
  playingId,
  setPlayingId,
  isMobile,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const reduce = useReducedMotion();
  const isActive = active === index;
  const isPlaying = playingId === item.id;
  const markLoaded = () => setIsLoaded(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    if (isPlaying) {
      video.muted = false;
      video.play().catch(() => {
        setPlayingId(null);
      });
    } else {
      video.pause();
      // Only seek back to the start once the video actually has data loaded.
      // Resetting currentTime before that aborts the initial network request.
      if (video.readyState > 0) {
        video.currentTime = 0;
      }
      video.muted = true;
    }
  }, [isPlaying, reduce, setPlayingId]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingId(isPlaying ? null : item.id);
  };

  if (isMobile) {
    return (
      <div
        className="w-full max-w-[320px] mx-auto aspect-[9/16] relative rounded-lg overflow-hidden bg-background-elevated cursor-pointer"
        onClick={() => {
          setActive(index);
          if (!isPlaying) setPlayingId(item.id);
        }}
      >
        <video
          ref={videoRef}
          src={item.src}
          muted={!isPlaying}
          loop
          playsInline
          preload="metadata"
          onLoadedData={markLoaded}
          onCanPlay={markLoaded}
          onPlaying={markLoaded}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f1629]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pausar testimonio" : "Reproducir testimonio"}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white active:bg-primary/80 transition-colors"
        >
          {isPlaying ? (
            <Pause weight="fill" className="w-5 h-5" />
          ) : (
            <Play weight="fill" className="w-5 h-5 ml-0.5" />
          )}
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          {item.quote && (
            <p className="font-sentient text-lg text-white leading-snug mb-3">
              {item.quote}
            </p>
          )}
          <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-medium">
            {item.name}
          </p>
          <p className="text-[11px] text-foreground-muted-dark">{item.role}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      onHoverStart={() => setActive(index)}
      onHoverEnd={() => {
        setActive(null);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="relative aspect-[9/16] overflow-hidden rounded-lg bg-background-elevated cursor-pointer group"
    >
      <video
        ref={videoRef}
        src={item.src}
        muted={!isPlaying}
        loop
        playsInline
        preload="metadata"
        onLoadedData={markLoaded}
        onCanPlay={markLoaded}
        onPlaying={markLoaded}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          isActive ? "scale-105" : "scale-100"
        )}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f1629]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? "Pausar testimonio" : "Reproducir testimonio"}
        className={cn(
          "absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:bg-primary hover:scale-110",
          isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        {isPlaying ? (
          <Pause weight="fill" className="w-7 h-7" />
        ) : (
          <Play weight="fill" className="w-7 h-7 ml-1" />
        )}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        {isActive && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sentient text-lg md:text-xl text-white leading-snug mb-4"
          >
            {item.quote}
          </motion.p>
        )}

        <div
          className={cn(
            "transition-opacity duration-300",
            isActive ? "opacity-100" : "opacity-70"
          )}
        >
          <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium">
            {item.name}
          </p>
          <p className="text-xs text-foreground-muted-dark">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ExtraVideoCard({
  item,
  playingId,
  setPlayingId,
}: {
  item: (typeof moreTestimonials)[0];
  playingId: number | null;
  setPlayingId: (id: number | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isPlaying = playingId === item.id;
  const markLoaded = () => setIsLoaded(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.muted = false;
      video.play().catch(() => setPlayingId(null));
    } else {
      video.pause();
      // Only seek back to the start once the video actually has data loaded.
      // Resetting currentTime before that aborts the initial network request.
      if (video.readyState > 0) {
        video.currentTime = 0;
      }
      video.muted = true;
    }
  }, [isPlaying, setPlayingId]);

  return (
    <div className="relative aspect-[9/16] w-full max-w-[260px] mx-auto md:mx-3 rounded-lg overflow-hidden bg-background-elevated group">
      <video
        ref={videoRef}
        src={item.src}
        muted={!isPlaying}
        loop
        playsInline
        preload="metadata"
        onLoadedData={markLoaded}
        onCanPlay={markLoaded}
        onPlaying={markLoaded}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f1629]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <button
        type="button"
        onClick={() => setPlayingId(isPlaying ? null : item.id)}
        aria-label={isPlaying ? "Pausar testimonio" : "Reproducir testimonio"}
        className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 hover:bg-primary hover:scale-110"
      >
        {isPlaying ? (
          <Pause weight="fill" className="w-6 h-6" />
        ) : (
          <Play weight="fill" className="w-6 h-6 ml-0.5" />
        )}
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium">
          {item.name}
        </p>
        <p className="text-xs text-foreground-muted-dark">{item.role}</p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="testimonios"
      className="section-light py-12 md:pt-8 relative overflow-hidden"
    >
      <div className="container relative">
        <ScrollReveal className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-[-0.02em] mb-6 text-foreground-on-light">
            Gente real{" "}
            <i className="font-light text-blue-900">que ya aplicó el método.</i>
          </h2>

        </ScrollReveal>

        {/* Desktop: grid de 3 tarjetas verticales */}
        <ScrollReveal className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {featuredTestimonials.map((t, i) => (
            <VideoCard
              key={t.id}
              item={t}
              index={i}
              active={active}
              setActive={setActive}
              playingId={playingId}
              setPlayingId={setPlayingId}
            />
          ))}
        </ScrollReveal>

        {/* Mobile: tarjetas apiladas verticalmente, una debajo de otra */}
        <div className="md:hidden flex flex-col gap-6">
          {featuredTestimonials.map((t, i) => (
            <VideoCard
              key={t.id}
              item={t}
              index={i}
              active={active}
              setActive={setActive}
              playingId={playingId}
              setPlayingId={setPlayingId}
              isMobile
            />
          ))}
        </div>

        {/* Ver más */}
        <div className="mt-12 md:mt-16">
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="inline-flex items-center gap-3 text-foreground-muted-dark hover:text-primary text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300"
          >
            {showMore ? "Ver menos testimonios" : "Ver más testimonios"}
            <span
              className={cn(
                "transition-transform duration-300",
                showMore ? "rotate-180" : "rotate-0"
              )}
            >
              ↓
            </span>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-8">
                  {moreTestimonials.map((t) => (
                    <ExtraVideoCard
                      key={t.id}
                      item={t}
                      playingId={playingId}
                      setPlayingId={setPlayingId}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}