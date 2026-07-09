"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./scroll-reveal";
import { CaretDown } from "@phosphor-icons/react";

const skills = [
  {
    title: "El Filtro antes que la plata",
    description: "Analizar chats, perfiles de redes, audios y gestos. Si hay mala redacción o le falta ortografía, hay que dudar.",
  },
  {
    title: "Negociación de calle",
    description: "Cómo leer la mesa frente a frente. El cliente se adapta a tus reglas y plazos, no vos a él. Tratos ganar-ganar pero cuidando a muerte tu capital.",
  },
  {
    title: "Estructura legal total",
    description: "Firma obligatoria de pagaré y contrato modelo en cada movimiento. Si no está documentado y firmado, no existe. Te doy mi plantilla blindada.",
  },
  {
    title: "Manejo de mora y cobranza",
    description: "Diferenciar entre retraso con comunicación o que te quieran boludear. Si mienten, se delega de una al estudio jurídico y cobrador presencial. Cero violencia.",
  },
  {
    title: "Reinversión y Excel Maestro",
    description: "Seguimiento milimétrico de riesgo por nivel. Si empezás a gastar la ganancia en lujos, morís en el prestamista del barrio. Se reinvierte el 100%.",
  },
];

const problems = [
  "Confundís la empatía con el negocio y terminás negociando por lástima.",
  "Financiás sin contratos ni pagarés firmados.",
  "Creés que una tasa de interés alta compensa un pésimo análisis de riesgo previo.",
  "Ponés capital en manos de desesperados con urgencia, o peor: en tu entorno de amigos y familiares.",
  "Renovás deudas cobrando solo intereses, perdiendo autoridad y orden desde la primera cuota.",
];

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const listContainer = {
  hidden: {},
  visible: {  
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};
const skillListContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.35 },
  },
};
const listItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const skillItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Mindset() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="mentalidad"
      className="pt-16 md:pt-0 md:pb-24 relative"
    >
        <div className="container relative">
          {/* Section header — hero-style staggered entrance */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
            initial={shouldReduce ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={heroContainer}
          >
            <motion.h2
              variants={heroItem}
              className="font-sentient text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extralight leading-[1.1] tracking-[-0.02em] text-balance"
            >
              No se trata solo de mover plata. Se trata de{" "}
              <em className="font-light text-amber-800 not-italic">entender las reglas de juego de la calle.</em>
            </motion.h2>
          </motion.div>

          {/* Problem block — warm alert tone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 md:mb-24">
            <ScrollReveal className="lg:col-span-4">
              <div className="h-[2px] w-16 bg-secondary-variant mb-6" />
              <h3 className="font-sentient text-2xl md:text-3xl font-extralight text-foreground-on-dark tracking-tight">
                Por qué te quemás solo
              </h3>
            </ScrollReveal>

            <motion.ul
              className="lg:col-span-7 lg:col-start-6 divide-y divide-border-dark"
              initial={shouldReduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={listContainer}
            >
              {problems.map((problem, index) => (
                <motion.li
                  key={index}
                  variants={listItem}
                  className="py-6 first:pt-0 last:pb-0 flex gap-4 items-baseline group"
                >
                  <span className="text-sm tabular-nums text-secondary font-light shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-sentient text-lg md:text-xl font-extralight leading-snug text-foreground-on-dark">
                    {problem}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Scroll break: problem → solution */}
          <div className=" md:py-6" aria-hidden="true" />

          {/* Skills block — cool solution tone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 md:pb-0">
            <ScrollReveal className="lg:col-span-4">
              <h3 className="font-sentient text-2xl md:text-3xl font-extralight text-foreground-on-dark tracking-tight">
                No es suerte, es método.
              </h3>
            </ScrollReveal>

            <motion.div
              className="lg:col-span-7 lg:col-start-6"
              initial={shouldReduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={skillListContainer}
            >
              <Accordion.Root
                type="single"
                collapsible
                className="divide-y divide-border-dark border-t border-b border-border-dark"
              >
                {skills.map((skill, index) => {
                  return (
                    <motion.div key={index} variants={skillItem}>
                      <Accordion.Item value={`skill-${index}`} className="group">
                        <Accordion.Trigger className="w-full py-6 md:py-7 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors duration-300 hover:bg-secondary/[0.03]">
                          <span className="flex items-baseline gap-4">
                            <span className="text-sm tabular-nums text-secondary font-light">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h4 className="font-sentient text-lg md:text-xl font-extralight text-foreground-on-dark leading-snug">
                              {skill.title}
                            </h4>
                          </span>
                          <CaretDown
                            className="w-4 h-4 text-secondary shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180"
                            weight="bold"
                            aria-hidden="true"
                          />
                        </Accordion.Trigger>
                        <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                          <p className="pl-9 pb-7 text-base md:text-lg leading-relaxed font-light text-foreground-muted-dark max-w-xl">
                            {skill.description}
                          </p>
                        </Accordion.Content>
                      </Accordion.Item>
                    </motion.div>
                  );
                })}
              </Accordion.Root>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
