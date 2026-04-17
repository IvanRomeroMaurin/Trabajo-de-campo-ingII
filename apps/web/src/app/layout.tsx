import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KomuLearn – Aprende, crea y crece con comunidades",
  description:
    "Plataforma de suscripción a comunidades educativas. Aprendé con expertos, creá tu propia comunidad y compartí conocimiento con el mundo.",
  keywords: ["comunidades educativas", "suscripciones", "aprendizaje online", "cursos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 w-full pt-18">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
