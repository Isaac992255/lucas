"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { LucasLogo } from "./lucas-logo";
import { ScrollReveal } from "./scroll-reveal";
import { AtmosphericShell } from "./atmospheric-shell";

export function FooterLucas() {
  return (
    <AtmosphericShell>
      <footer id="contacto" className="py-24 md:py-40 relative">
      <div className="container">
        {/* Split CTA: left headline + right action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-[-0.02em] mb-8 text-foreground-on-dark">
            Dejá de perder plata por no tener un {" "}
              <i className="font-light text-primary">método</i>
            </h2>
            <p className="text-foreground-muted-dark text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              Si querés ordenar tus operaciones, dejar de renegar con deudores difíciles y escalar tu capital con un sistema que funciona de verdad en la calle, mandame un mensaje y un audio contándome a qué te dedicás.
            </p>
            <Link
              href="https://www.instagram.com/lucasramacosta/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] hover:bg-primary-hover transition-colors duration-300"
            >
              Escribime por Instagram
              <ArrowUpRight weight="regular" className="w-4 h-4 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
            </Link>
            <p className="text-foreground-muted-dark text-xs mt-4 tracking-wider">
              @lucasramacosta - única cuenta real.
            </p>
          </ScrollReveal>

          {/* Right: contact + anti-scam */}
          <ScrollReveal delay={150} className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm uppercase tracking-[0.15em] text-foreground-muted-dark mb-6">
              Redes
            </p>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/lucasramacosta/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground-on-dark hover:text-primary transition-colors duration-300 text-sm"
              >
                Instagram - @lucasramacosta
              </a>
              <a
                href="https://www.tiktok.com/@lucasramacosta"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground-muted-dark hover:text-primary transition-colors duration-300 text-sm"
              >
                TikTok - @lucasramacosta
              </a>
            </div>

            <div className="mt-10 p-6 border border-border-dark bg-[#141d33]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-3 font-medium">
                Aviso importante
              </p>
              <p className="text-foreground-muted-dark text-xs leading-relaxed">
                Yo NUNCA pido plata por adelantado. NUNCA inicio una conversación. Si alguien te escribe haciéndose pasar por mí, es trucho. Sean más pillos.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <LucasLogo className="w-[140px] text-foreground-muted-dark" />
          <p className="text-xs text-foreground-muted-dark tracking-wider">
            © {new Date().getFullYear()} Lucas Acosta. La mente detrás del negocio.
          </p>
        </div>
      </div>
    </footer>
    </AtmosphericShell>
  );
}
