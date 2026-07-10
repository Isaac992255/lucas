"use client";

import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowRight, Crown, CaretDown } from "@phosphor-icons/react";
import { ScrollReveal } from "./scroll-reveal";
import { AdvisoryFormDialog } from "./advisory-form-dialog";

const featured = {
  name: "Asesoría de Negocios 1 a 1 conmigo",
  description: "Reviso tu operación entera frente a frente acá en Tigre (o por videollamada privada). Te digo exactamente dónde estás perdiendo plata, cómo blindar tu capital con mi contrato y pagaré modelo, y cómo escalar sin renegar nunca más.",
  cta: "Aplicar a la asesoría",
  href: "#asesoria",
};

const secondary = [
  {
    name: "Mentoría Grupal Semanal",
    price: "USD 60 / mes",
    description: "Encuentros en vivo  conmigo y otros emprendedores que están en la misma. Analizamos operaciones reales, resolvemos casos de cobros difíciles (como el caso viral de Adriana) y cruzamos contactos útiles. El progreso es diario.",
    cta: "Sumarme a la mentoría",
    href: "#mentoria",
    form: {
      formType: "mentoria" as const,
      eyebrow: "Sumate a la mentoría grupal",
      successMessage: "para coordinar tu ingreso a la mentoría semanal.",
    },
  },
  {
    name: "Curso de Ventas, Cierre y Persuasión",
    price: "USD 100 - 300",
    description: "En producción. En esta vida todo es una venta y una negociación. El que es comerciante y sabe cerrar tratos de verdad es el que gana siempre. Aprendé a leer los ojos del otro y hacé que te firme de una. Lista de espera abierta.",
    cta: "Anotarme a la lista",
    href: "#curso",
    form: {
      formType: "curso" as const,
      eyebrow: "Anotate a la lista de espera",
      successMessage: "para avisarte apenas abra el curso de Ventas, Cierre y Persuasión.",
    },
  },
];

export function Products() {
  return (
    <section id="programas" className="section-light py-24 md:py-40 relative">
      <div className="container">
        {/* Section header — eyebrow allowed here */}
        <ScrollReveal className="max-w-3xl mb-16 md:mb-24">
       
          <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-[-0.02em] mb-6 text-foreground-on-light">
            Empezá por donde estés.{" "}
            <i className="font-light text-blue-900">Lo importante es que arranques.</i>
          </h2>
          <p className="text-zinc-800 text-base md:text-lg leading-relaxed">
            Cada nivel está pensado para una etapa distinta. El que está arrancando necesita una cosa, el que ya opera necesita otra. Fijate cuál es para vos.
          </p>
        </ScrollReveal>

        {/* Featured product — full width card */}
        <ScrollReveal className="mb-12">
          <div className="relative p-6 md:p-14 bg-background-dark text-white">
            <h3 className="font-sentient text-2xl md:text-4xl font-extralight mb-3">
              {featured.name}
            </h3>
            <p className="font-sentient text-xl md:text-3xl font-extralight text-white mb-6">
              {featured.price}
            </p>
            <p className="text-foreground-muted-dark text-base leading-relaxed max-w-2xl mb-10">
              {featured.description}
            </p>
            <AdvisoryFormDialog
              trigger={
                <button
                  type="button"
                  className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium uppercase tracking-[0.1em] hover:bg-primary-hover transition-colors duration-300"
                >
                  {featured.cta}
                  <ArrowRight weight="regular" className="w-4 h-4" />
                </button>
              }
            />
          </div>
        </ScrollReveal>

        {/* Secondary products — accordion (description collapsible) */}
        <ScrollReveal>
          <Accordion.Root type="single" collapsible className="divide-y divide-border-light border-t border-border-light">
            {secondary.map((product, index) => (
              <Accordion.Item key={index} value={`product-${index}`} className="group">
                <div className="py-6 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                  <Accordion.Trigger
                    className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer text-left active:opacity-60 md:active:opacity-100 transition-opacity duration-150"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <span
                      className="shrink-0 -ml-1.5 md:ml-0 flex items-center justify-center w-9 h-9 md:w-4 md:h-4 rounded-full md:rounded-none border md:border-0 border-border-light group-data-[state=open]:border-primary/40 group-data-[state=open]:bg-primary/5 transition-colors duration-300"
                      aria-hidden="true"
                    >
                      <CaretDown
                        className="w-4 h-4 text-foreground-muted-light transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary"
                        weight="bold"
                      />
                    </span>
                    <h3 className="font-sentient text-xl md:text-2xl font-extralight text-foreground-on-light group-data-[state=open]:text-primary md:group-data-[state=open]:text-foreground-on-light transition-colors duration-300">
                      {product.name}
                    </h3>
                  </Accordion.Trigger>
                  <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 pl-[3.25rem] md:pl-0 shrink-0">
                    <p className="font-sentient text-base md:text-xl font-extralight text-blue-900">
                      {product.price}
                    </p>
                    {product.form ? (
                      <AdvisoryFormDialog
                        variant="simple"
                        formType={product.form.formType}
                        eyebrow={product.form.eyebrow}
                        successMessage={product.form.successMessage}
                        trigger={
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-[0.1em] hover:gap-4 active:gap-4 transition-all duration-300 py-2 -my-2 shrink-0"
                          >
                            {product.cta}
                            <ArrowRight weight="regular" className="w-4 h-4" />
                          </button>
                        }
                      />
                    ) : (
                      <Link
                        href={product.href}
                        className="inline-flex items-center gap-2 text-primary text-sm font-medium uppercase tracking-[0.1em] hover:gap-4 active:gap-4 transition-all duration-300 py-2 -my-2 shrink-0"
                      >
                        {product.cta}
                        <ArrowRight weight="regular" className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <p className="pl-[3.25rem] md:pl-9 pb-8 text-zinc-800 md:text-lg leading-relaxed font-light text-foreground-muted-light max-w-2xl">
                    {product.description}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </ScrollReveal>
      </div>
    </section>
  );
}
