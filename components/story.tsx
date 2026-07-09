"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./scroll-reveal";
import { AtmosphericShell } from "./atmospheric-shell";
import { cn } from "@/lib/utils";

// ─── Scroll-linked parallax + Ken Burns ───────────────────────────────────────
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  strength?: number; // total px of travel (split evenly top / bottom)
}

function ParallaxImage({ src, alt, className, strength = 40 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const half = strength / 2;
  const y = useTransform(scrollYProgress, [0, 1], [`${half}px`, `-${half}px`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        className="absolute left-0 right-0 w-full object-cover"
        style={
          shouldReduce
            ? { top: 0, height: "100%" }
            : { top: `-${half}px`, height: `calc(100% + ${strength}px)`, y }
        }
      />
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────
export function Story() {
  return (
    <>
      {/* ═══ PARTE 1: ORIGEN — dark ═══ */}
      <AtmosphericShell>
        <section
          id="historia"
          className="py-24 md:py-32 relative"
        >
          <div className="container relative">
            {/* Full-width section header */}

            {/* Sticky leader (desktop) — scrolling content (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* IZQ — sticky */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <ScrollReveal>
                  <p className="font-sentient text-2xl md:text-3xl font-extralight leading-snug text-foreground-on-dark">
                    Yo sé lo que es la calle abajo de todo.
                  </p>
                </ScrollReveal>
                <ScrollReveal>
              <p className="text-foreground-muted-dark text-base md:text-lg leading-relaxed">               
                   Nací en el barrio, me hice desde abajo a base de errores y caídas.
                  </p>                
                </ScrollReveal>
              </div>

              {/* DER — imagen + párrafo */}
              <div className="lg:col-span-4 lg:col-start-8 flex flex-col gap-14">
                <ScrollReveal>
                  <ParallaxImage
                    src="/progreso-inicios.jpeg"
                    alt="Lucas Acosta en sus inicios — la calle"
                    className="aspect-square"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </AtmosphericShell>

      {/* ═══ PARTE 2: QUIEBRE + TRANSFORMACIÓN — dark ═══ */}
      <AtmosphericShell>
        <section className="pb-20 md:py-32 relative">
          <div className="container relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* IZQ — sticky */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <ScrollReveal>
                  <p className="font-sentient text-2xl md:text-3xl font-extralight leading-snug text-foreground-on-dark">
                    Puse un comercio con dinero ajeno, quebré y dormí un año en un sillón.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <p className="text-foreground-muted-dark text-base md:text-lg leading-relaxed">
                    Traté de levantar un local gigante sin un peso propio, levantando capitales de otros. Me fue mal. Terminé durmiendo un año entero en el sillón de un familiar. 
                  </p>
                </ScrollReveal>
                   <ScrollReveal delay={100}>
                    <br />
                  <p className="text-foreground-muted-dark text-base md:text-lg leading-relaxed">
  En ese pozo me comí 15 libros de desarrollo personal, empecé a leer la Biblia todas las mañanas y cambié mi mentalidad a base de golpes. No le tengo miedo al error; la experiencia es la única respuesta.
                  </p>
                </ScrollReveal>
              </div>

              {/* DER — párrafo + editorial offset */}
              <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
                

                {/* Editorial offset: biblia (cuadrada, izq) + proceso (3/4, der, desplazada) */}
                <ScrollReveal delay={150}>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <ParallaxImage
                      src="/progreso-inicios-2.jpeg"
                      alt="Lucas Acosta joven, estudiando la Biblia con mate"
                      className="aspect-square"
                    />
                    <div className="mt-14 md:mt-20">
                      <ParallaxImage
                        src="/lucas-estudia-proceso.jpeg"
                        alt="Lucas Acosta leyendo y subrayando libros"
                        className="aspect-3/4"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </AtmosphericShell>

      {/* ═══ PARTE 3: ASCENSO + CIERRE — light ═══ */}
      <section className="section-light py-24 md:py-32 relative overflow-hidden">
        {/* Blue elevation glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-0 w-[55vw] h-[55vw] rounded-full bg-primary/5 blur-[140px] translate-x-1/3"
        />

        <div className="container relative">
          {/* Ascenso — sticky leader + scrolling */}
          {/* Desktop — layout original sin cambios */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24 md:mb-36">
            {/* IZQ — sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <ScrollReveal>
                <p className=" text-lg md:text-lg text-shadow-zinc-800 leading-relaxed">
                  Arranqué trabajando a comisión hasta hacer mi propio capital.
                </p>
              </ScrollReveal>
               <ScrollReveal delay={100}>
                <br />
                <p className="text-shadow-zinc-800 text-base md:text-lg leading-relaxed">
                  Vendía iphones y mis clientes me empezaron a pedir financiamiento. Al principio decía que no, hasta que conecté personas necesitadas con dos amigos que financiaban. Empecé a hacer plata comisionando solo cordinando chats de whatsapp </p>
              </ScrollReveal>
              <br />
                <ScrollReveal delay={100}>
                <p className="text-shadow-zinc-800 text-base md:text-lg leading-relaxed">
              Ahí me avivé y arranqué con mi propio capital: 250 lucas y un Excel meticuloso.</p>
              </ScrollReveal>
              <br />
             
          <p className=" font-bold text-blue-950 text-lg  mb-6 ">
            
             Hoy opero montos grandes con comercios del norte de GBA, asesoro gente hasta de México, y duermo tranquilo porque el filtro lo hago antes.
            
          </p>
              
            </div>

            {/* DER — /lucas-vida-nueva-exitosa.jpeg (movida desde Parte 2) + párrafo */}
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
              <ScrollReveal>
                <ParallaxImage
                  src="/lucas-vida-nueva-exitosa.jpeg"
                  alt="Lucas Acosta disfrutando su nueva vida"
                  className="aspect-4/5"
                />
              </ScrollReveal>
             
            </div>
          </div>

          {/* Mobile — foto arriba, párrafo "hoy opero" primero, resto del texto después */}
          <div className="flex flex-col gap-8 mb-24 md:mb-36 lg:hidden">
            <ScrollReveal>
              <p className="text-shadow-zinc-800 text-base md:text-lg leading-relaxed">
                Hoy opero montos grandes con comercios del norte de GBA, asesoro gente hasta de México, y duermo tranquilo porque el filtro lo hago antes.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <ParallaxImage
                src="/lucas-vida-nueva-exitosa.jpeg"
                alt="Lucas Acosta disfrutando su nueva vida"
                className="aspect-4/5"
              />
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-lg md:text-lg text-shadow-zinc-800 leading-relaxed">
                Arranqué trabajando a comisión hasta hacer mi propio capital.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-shadow-zinc-800 text-base md:text-lg leading-relaxed">
                Vendía iphones y mis clientes me empezaron a pedir financiamiento. Al principio decía que no, hasta que conecté personas necesitadas con dos amigos que financiaban. Empecé a hacer plata comisionando solo cordinando chats de whatsapp
              </p>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-shadow-zinc-800 text-base md:text-lg leading-relaxed">
                Ahí me avivé y arranqué con mi propio capital: 250 lucas y un Excel meticuloso.
              </p>
            </ScrollReveal>
          </div>

          {/* Cierre climático — centrado */}
          <ScrollReveal delay={100} className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-8 ring-2 ring-border-light ring-offset-4 ring-offset-background-light">
              <img
                src="/lucas-ahora.jpeg"
                alt="Lucas Acosta en la actualidad"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <p className="font-sentient text-2xl md:text-4xl font-extralight leading-snug text-foreground-on-light max-w-3xl">
              El éxito está a la vuelta de tu casa. Lo único que tenés que hacer es tomar la decisión de ir.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
