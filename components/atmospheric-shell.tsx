"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface AtmosphericShellProps {
  children: ReactNode;
}

export function AtmosphericShell({ children }: AtmosphericShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) return;
    const shell = shellRef.current;
    if (!shell) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = shell.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        shell.style.setProperty("--mouse-x", `${x}%`);
        shell.style.setProperty("--mouse-y", `${y}%`);
        rafId = 0;
      });
    };

    shell.addEventListener("mousemove", handleMouseMove);
    return () => {
      shell.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldReduce]);

  return (
    <div ref={shellRef} className="section-dark relative overflow-hidden">
      {/* Mouse-following spotlight — shared across Hero + Mindset */}
      {!shouldReduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 md:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(37, 99, 235, 0.08), transparent 40%)",
          }}
        />
      )}

      {/* Background gradient mesh — slow drifting blobs, spans the full shell */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[70vw] h-[70vw] translate-x-1/3 -translate-y-1/3">
          <div
            aria-hidden="true"
            className="w-full h-full bg-primary/5 rounded-full blur-[120px] animate-blob-float"
            style={{ animationDelay: "0s" }}
          />
        </div>
        <div className="absolute top-1/2 left-0 w-[55vw] h-[55vw] -translate-x-1/3 -translate-y-1/2">
          <div
            aria-hidden="true"
            className="w-full h-full bg-secondary/5 rounded-full blur-[100px] animate-blob-float"
            style={{ animationDelay: "-10s" }}
          />
        </div>
        <div className="absolute bottom-0 right-1/4 w-[45vw] h-[45vw] translate-y-1/3">
          <div
            aria-hidden="true"
            className="w-full h-full bg-primary/[0.03] rounded-full blur-[120px] animate-blob-float"
            style={{ animationDelay: "-20s" }}
          />
        </div>
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
