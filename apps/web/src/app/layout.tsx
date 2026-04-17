import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="es" className={inter.variable}>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem',
        }}>
          © {new Date().getFullYear()} KomuLearn · Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}
