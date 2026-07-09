"use client";

import { type ReactNode, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, type Variants } from "motion/react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  CircleNotch,
} from "@phosphor-icons/react";
import {
  useForm,
  type FieldPath,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitLead, type LeadPayload } from "@/lib/submit-lead";

type FormVariant = "full" | "simple";
type FormType = "asesoria" | "mentoria" | "curso";

const baseFormSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresá tu nombre y apellido"),
  whatsapp: z.string().trim().min(6, "Ingresá un WhatsApp válido"),
  location: z.string().trim().min(2, "Ingresá país y provincia"),
  lendsMoney: z.enum(["yes", "no"]).optional(),
  currentCapital: z.string().trim().optional().default(""),
  lostMoney: z.string().trim().optional().default(""),
  mainChallenge: z
    .string()
    .trim()
    .min(10, "Contanos un poco más (mínimo 10 caracteres)"),
  sixMonthGoal: z
    .string()
    .trim()
    .min(10, "Contanos un poco más (mínimo 10 caracteres)"),
});

function getFormSchema(variant: FormVariant) {
  return baseFormSchema.superRefine((data, ctx) => {
    // The "situación" step (lendsMoney + conditionals) only applies to the
    // full advisory flow — the simple variant (mentoría/curso) skips it.
    if (variant !== "full") return;

    if (!data.lendsMoney) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["lendsMoney"],
        message: "Elegí una opción para continuar",
      });
      return;
    }

    if (data.lendsMoney === "yes") {
      if (!data.currentCapital) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["currentCapital"],
          message: "Contanos cuánto capital tenés prestado",
        });
      }
      if (!data.lostMoney) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["lostMoney"],
          message: "Escribí 0 si nunca perdiste plata",
        });
      }
    }
  });
}

type FormValues = z.infer<typeof baseFormSchema>;

type StepKey = "contacto" | "situacion" | "objetivos";

function getSteps(
  variant: FormVariant
): { key: StepKey; title: string; fields: FieldPath<FormValues>[] }[] {
  const steps: { key: StepKey; title: string; fields: FieldPath<FormValues>[] }[] = [
    { key: "contacto", title: "Contanos quién sos", fields: ["fullName", "whatsapp", "location"] },
  ];

  if (variant === "full") {
    steps.push({
      key: "situacion",
      title: "Tu situación actual",
      fields: ["lendsMoney", "currentCapital", "lostMoney"],
    });
  }

  steps.push({ key: "objetivos", title: "Tus objetivos", fields: ["mainChallenge", "sixMonthGoal"] });

  return steps;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-base sm:text-sm text-foreground-on-dark placeholder:text-foreground-muted-dark/50 outline-none transition-colors duration-300 focus:border-primary/70 focus:bg-white/[0.07]";

const textareaClass = `${inputClass} resize-none`;

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const stepVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 32 : -32, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block ">
      <span className="mb-2  block text-xs uppercase tracking-[0.15em] text-foreground-muted-dark">
        {label}
      </span>
      {hint && (
        <span className="mb-2 block text-[11px] text-foreground-muted-dark/70">
          {hint}
        </span>
      )}
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1.5 block text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

function RadioCard({
  title,
  subtitle,
  value,
  registerProps,
}: {
  title: string;
  subtitle: string;
  value: string;
  registerProps: UseFormRegisterReturn;
}) {
  return (
    <label className="group relative flex cursor-pointer flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all duration-300 hover:border-white/20 has-checked:border-primary has-checked:bg-primary/10">
      <input
        type="radio"
        value={value}
        {...registerProps}
        className="absolute opacity-0"
      />
      <span className="pr-6 text-sm font-medium text-foreground-on-dark">
        {title}
      </span>
      <span className="text-xs text-foreground-muted-dark">{subtitle}</span>
      <CheckCircle
        weight="fill"
        className="absolute top-4 right-4 h-5 w-5 text-primary opacity-0 transition-opacity duration-300 group-has-checked:opacity-100"
      />
    </label>
  );
}

interface AdvisoryFormDialogProps {
  trigger: ReactNode;
  /** "full" = contacto + situación + objetivos (asesoría 1:1). "simple" = contacto + objetivos (mentoría/curso). */
  variant?: FormVariant;
  /** Identifica el producto para el backend de leads. Por defecto se infiere de `variant`. */
  formType?: FormType;
  eyebrow?: string;
  successMessage?: string;
}

export function AdvisoryFormDialog({
  trigger,
  variant = "full",
  formType = variant === "full" ? "asesoria" : "mentoria",
  eyebrow = "Aplicá a la asesoría",
  successMessage = "para coordinar tu asesoría 1 a 1.",
}: AdvisoryFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const STEPS = useMemo(() => getSteps(variant), [variant]);
  const formSchema = useMemo(() => getFormSchema(variant), [variant]);

  const {
    register,
    handleSubmit,
    trigger: triggerValidation,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      whatsapp: "",
      location: "",
      lendsMoney: undefined,
      currentCapital: "",
      lostMoney: "",
      mainChallenge: "",
      sixMonthGoal: "",
    },
  });

  const lendsMoney = watch("lendsMoney");
  const fullName = watch("fullName");
  const isLastStep = step === STEPS.length - 1;

  const resetAll = () => {
    setStep(0);
    setDirection(1);
    setStatus("idle");
    setErrorMessage(null);
    reset();
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      window.setTimeout(resetAll, 300);
    }
  };

  const goNext = async () => {
    const fields = STEPS[step].fields.filter((field) => {
      if (
        (field === "currentCapital" || field === "lostMoney") &&
        lendsMoney !== "yes"
      ) {
        return false;
      }
      return true;
    });
    const valid = await triggerValidation(fields);
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setErrorMessage(null);

    const payload: LeadPayload =
      variant === "full"
        ? {
            formType: "asesoria",
            fullName: values.fullName,
            whatsapp: values.whatsapp,
            location: values.location,
            lendsMoney: values.lendsMoney ?? "no",
            currentCapital:
              values.lendsMoney === "yes" ? values.currentCapital : "",
            lostMoney: values.lendsMoney === "yes" ? values.lostMoney : "",
            mainChallenge: values.mainChallenge,
            sixMonthGoal: values.sixMonthGoal,
          }
        : {
            formType: formType === "asesoria" ? "mentoria" : formType,
            fullName: values.fullName,
            whatsapp: values.whatsapp,
            location: values.location,
            mainChallenge: values.mainChallenge,
            sixMonthGoal: values.sixMonthGoal,
          };

    const result = await submitLead(payload);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("idle");
      setErrorMessage(result.message ?? "Error al enviar el formulario.");
    }
  });

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                className="fixed inset-0 z-100 bg-background-dark/85 backdrop-blur-md"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            </Dialog.Overlay>

            <Dialog.Content forceMount asChild>
              <motion.div
                className="fixed inset-0 z-101 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
                initial={false}
                animate="visible"
              >
                <motion.div
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-background-elevated shadow-2xl shadow-black/50 sm:max-w-lg"
                >
                {/* Ambient glow — echoes the site's atmospheric shell for visual continuity */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-[90px] animate-blob-float" />
                  <div
                    className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-tercero/10 blur-[90px] animate-blob-float"
                    style={{ animationDelay: "-10s" }}
                  />
                </div>

                <div className="relative max-h-[calc(100vh-2rem)] overflow-y-auto pb-[env(safe-area-inset-bottom)] sm:max-h-[85vh] sm:pb-0">
                  <div className="sticky top-0 z-20 bg-background-elevated pt-6 pb-1 sm:static sm:bg-transparent sm:pt-10 sm:pb-0">
                    <div className="flex items-start justify-between gap-4 px-6 sm:px-10">
                      <div>
                        <Dialog.Title asChild>
                          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">
                            {eyebrow}
                          </p>
                        </Dialog.Title>
                        <h2 className="font-sentient text-2xl font-extralight text-foreground-on-dark sm:text-3xl">
                          {status === "success" ? "Listo, ya está." : STEPS[step].title}
                        </h2>
                      </div>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          aria-label="Cerrar formulario"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-foreground-muted-dark transition-colors hover:border-white/30 hover:text-white sm:h-9 sm:w-9"
                        >
                          <X weight="regular" className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {status !== "success" && (
                      <>
                        <div className="mt-6 flex items-center gap-2 px-6 sm:px-10">
                          {STEPS.map((_, i) => (
                            <div
                              key={i}
                              className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                            >
                              <motion.div
                                className="h-full bg-primary"
                                initial={false}
                                animate={{ width: i <= step ? "100%" : "0%" }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 px-6 pb-4 text-[11px] uppercase tracking-[0.15em] text-foreground-muted-dark sm:px-10 sm:pb-0">
                          Paso {step + 1} de {STEPS.length}
                        </p>
                      </>
                    )}
                  </div>

                  <Dialog.Description className="sr-only">
                    Formulario para aplicar a la asesoría 1 a 1 con Lucas Acosta.
                  </Dialog.Description>

                  <form onSubmit={onSubmit} className="px-6 py-8 sm:px-10">
                    <AnimatePresence mode="wait" custom={direction}>
                      {status === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="flex flex-col items-center py-4 text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.15,
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"
                          >
                            <CheckCircle weight="fill" className="h-9 w-9" />
                          </motion.div>
                          <p className="mb-2 text-lg text-foreground-on-dark">
                            Recibimos tu solicitud
                            {fullName ? `, ${fullName.split(" ")[0]}` : ""}.
                          </p>
                          <p className="mb-8 max-w-sm text-sm text-foreground-muted-dark">
                            En las próximas 24–48 horas te vamos a escribir por
                            WhatsApp {successMessage}
                          </p>
                          <Dialog.Close asChild>
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground-on-dark transition-colors hover:border-white/30"
                            >
                              Cerrar
                            </button>
                          </Dialog.Close>
                        </motion.div>
                      ) : (
                        <motion.div
                          key={step}
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                        >
                          {STEPS[step].key === "contacto" && (
                            <div className="space-y-5">
                              <Field label="Nombre y apellido" error={errors.fullName?.message}>
                                <input
                                  {...register("fullName")}
                                  placeholder="Ej: Martina Gómez"
                                  className={inputClass}
                                />
                              </Field>
                              <Field label="WhatsApp" error={errors.whatsapp?.message}>
                                <input
                                  {...register("whatsapp")}
                                  type="tel"
                                  placeholder="+54 9 11 1234 5678"
                                  className={inputClass}
                                />
                              </Field>
                              <Field label="País y provincia" error={errors.location?.message}>
                                <input
                                  {...register("location")}
                                  placeholder="Ej: Argentina, Buenos Aires"
                                  className={inputClass}
                                />
                              </Field>
                            </div>
                          )}

                          {STEPS[step].key === "situacion" && (
                            <div className="space-y-5">
                              <div>
                                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-foreground-muted-dark">
                                  ¿Prestás dinero o lo hiciste previamente?
                                </p>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                  <RadioCard
                                    value="yes"
                                    title="Sí"
                                    subtitle="Ya presto o prestaba plata"
                                    registerProps={register("lendsMoney")}
                                  />
                                  <RadioCard
                                    value="no"
                                    title="No, pero quiero empezar"
                                    subtitle="Estoy arrancando de cero"
                                    registerProps={register("lendsMoney")}
                                  />
                                </div>
                                <AnimatePresence>
                                  {errors.lendsMoney && (
                                    <motion.p
                                      initial={{ opacity: 0, y: -4 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -4 }}
                                      className="mt-2 text-xs text-red-400"
                                    >
                                      {errors.lendsMoney.message}
                                    </motion.p>
                                  )}
                                </AnimatePresence>
                              </div>

                              <AnimatePresence initial={false}>
                                {lendsMoney === "yes" && (
                                  <motion.div
                                    key="extra-fields"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="space-y-5 pt-1">
                                      <Field
                                        label="¿Cuánto capital tenés prestado actualmente?"
                                        hint="Respuesta corta o un rango aproximado"
                                        error={errors.currentCapital?.message}
                                      >
                                        <input
                                          {...register("currentCapital")}
                                          placeholder="Ej: USD 5.000 - 10.000"
                                          className={inputClass}
                                        />
                                      </Field>
                                      <Field
                                        label="¿Cuánto dinero estimás que perdiste prestando?"
                                        hint="Si nunca perdiste, escribí 0."
                                        error={errors.lostMoney?.message}
                                      >
                                        <input
                                          {...register("lostMoney")}
                                          placeholder="Ej: 0"
                                          className={inputClass}
                                        />
                                      </Field>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}

                          {STEPS[step].key === "objetivos" && (
                            <div className="space-y-5">
                              <Field
                                label="¿Cuál es hoy tu principal problema o desafío?"
                                error={errors.mainChallenge?.message}
                              >
                                <textarea
                                  {...register("mainChallenge")}
                                  rows={4}
                                  placeholder="Contame en detalle qué es lo que más te está costando..."
                                  className={textareaClass}
                                />
                              </Field>
                              <Field
                                label="¿Qué te gustaría lograr en los próximos 6 meses?"
                                error={errors.sixMonthGoal?.message}
                              >
                                <textarea
                                  {...register("sixMonthGoal")}
                                  rows={4}
                                  placeholder="Contame tu objetivo..."
                                  className={textareaClass}
                                />
                              </Field>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {errorMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: -4, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -4, height: 0 }}
                          className="mt-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-400"
                        >
                          {errorMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {status !== "success" && (
                      <div className="sticky bottom-0 z-20 -mx-6 mt-10 flex items-center justify-between gap-4 border-t border-white/10 bg-background-elevated px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:pt-0 sm:pb-0">
                        {step > 0 ? (
                          <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted-dark transition-colors hover:border-white/30 hover:text-white"
                          >
                            <ArrowLeft weight="regular" className="h-4 w-4" />
                            Atrás
                          </button>
                        ) : (
                          <span />
                        )}

                        {!isLastStep ? (
                          <button
                            type="button"
                            onClick={goNext}
                            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-300 hover:bg-primary-hover"
                          >
                            Siguiente
                            <ArrowRight
                              weight="regular"
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium uppercase tracking-[0.1em] text-primary-foreground transition-colors duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {status === "submitting" ? (
                              <CircleNotch
                                weight="bold"
                                className="h-4 w-4 animate-spin"
                              />
                            ) : (
                              <ArrowRight weight="regular" className="h-4 w-4" />
                            )}
                            {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
                          </button>
                        )}
                      </div>
                    )}
                  </form>
                </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
