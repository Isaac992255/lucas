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

const API_URL = process.env.NEXT_PUBLIC_LEADS_API_URL as string;

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  if (!API_URL) {
    return {
      success: false,
      message: "Falta configurar la URL del servidor de leads.",
    };
  }

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
