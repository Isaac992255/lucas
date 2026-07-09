import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Lucas Acosta — La mente detrás del negocio",
  description: "Hay plata en todos lados. Te enseño el sistema para filtrar, blindarte y operar sin renegar. Asesoría 1 a 1, mentoría y formación desde la calle.",
  generator: 'v0.app'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
