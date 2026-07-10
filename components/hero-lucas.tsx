"use client";

import { ArrowDownRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { AdvisoryFormDialog } from "./advisory-form-dialog";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroLucas() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="asesoria"
      className="relative min-h-svh flex items-center pb-16 md:pb-24 pt-16 md:pt-24"
    >
        <div className="container w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text column — 7 cols (dominant) */}
            <div className="lg:col-span-7 order-1 flex flex-col justify-center">
              <motion.div
                className="max-w-2xl"
                initial={shouldReduce ? false : "hidden"}
                animate="visible"
                variants={containerVariants}
              >
                <motion.p
                  variants={itemVariants}
                  className="text-foreground-muted-dark text-xs md:text-sm uppercase tracking-[0.2em] mb-6"
                >
                  La mente detrás del negocio
                </motion.p>

                <motion.h1
                  variants={itemVariants}
                  className="font-sentient text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-[-0.02em]"
                >
                  El miedo a perderlo todo te está {" "}
                  <i className="font-light text-primary">frenando</i>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-foreground-muted-dark text-base md:text-lg leading-relaxed mt-8 max-w-xl"
                >
                  Te enseño un método desde cero para que puedas ganar plata haciendo préstamos sin arriesgar tu capital.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-10">
                  <AdvisoryFormDialog
                    trigger={
                      <button
                        type="button"
                        className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] hover:bg-primary-hover transition-colors duration-300"
                      >
                        Llamada 1:1 conmigo
                        <ArrowDownRight weight="regular" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
                      </button>
                    }
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Image column — 5 cols */}
            <motion.div
              className="lg:col-span-5 order-2 flex flex-col justify-center"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-square max-w-md mx-auto w-full image-placeholder overflow-hidden rounded-full ring-1 ring-white/10 shadow-2xl shadow-primary/10">
                <img
                  src="/hero.jpeg"
                  alt="Foto principal de Lucas Acosta"
                  className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
    </section>
  );
}
