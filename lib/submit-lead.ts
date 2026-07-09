type AsesoriaPayload = {
  formType: "asesoria";
  fullName: string;
  whatsapp: string;
  location: string;
  lendsMoney: "yes" | "no";
  currentCapital: string; // '' si lendsMoney === 'no'
  lostMoney: string; // '' si lendsMoney === 'no'
  mainChallenge: string;
  sixMonthGoal: string;
};

type SimplePayload = {
  formType: "mentoria" | "curso";
  fullName: string;
  whatsapp: string;
  location: string;
  mainChallenge: string;
  sixMonthGoal: string;
};

export type LeadPayload = AsesoriaPayload | SimplePayload;

export type LeadResponse =
  | { success: true }
  | { success: false; message?: string };

// Fallback hardcoded because this is a public, client-exposed endpoint anyway
// (NEXT_PUBLIC_* vars ship to the browser regardless), and Netlify's build
// didn't have NEXT_PUBLIC_LEADS_API_URL set (.env.local is gitignored and
// never reaches the deploy). Override via the env var if the endpoint changes.
const FALLBACK_API_URL =
  "https://lead-mailer-224870988029.southamerica-east1.run.app/leads";

const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL || FALLBACK_API_URL;

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data: LeadResponse = await res.json();

    if (!res.ok || !data.success) {
      const message = !data.success ? data.message : undefined;
      return { success: false, message: message ?? "Error al enviar el formulario." };
    }

    return data;
  } catch {
    return { success: false, message: "No se pudo conectar con el servidor." };
  }
}
