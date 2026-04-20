import { KomuLogo } from "@/components/layout/KomuLogo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-sky-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -right-[10%] w-[70%] h-[70%] bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <KomuLogo size={32} light={true} />
            </Link>
            <Link 
              href="/" 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Volver al inicio
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-24">
          <article className="prose prose-invert prose-slate max-w-none 
            prose-headings:font-display prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
            prose-h1:text-5xl prose-h1:mb-12 prose-h1:bg-gradient-to-r prose-h1:from-white prose-h1:to-slate-500 prose-h1:bg-clip-text prose-h1:text-transparent
            prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-sky-100/90
            prose-p:font-sans prose-p:text-slate-400 prose-p:leading-[1.8] prose-p:text-lg prose-p:mb-8
            prose-li:font-sans prose-li:text-slate-400 prose-li:text-lg prose-li:leading-relaxed
            prose-strong:text-sky-400 prose-strong:font-bold prose-strong:tracking-wide
            prose-a:text-sky-500 prose-a:font-medium prose-a:no-underline hover:prose-a:text-sky-400 transition-all"
          >
            {children}
          </article>
        </main>

        {/* Footer info */}
        <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-white/5 text-slate-600 text-xs text-center font-medium tracking-widest uppercase">
            Última actualización: Abril 2026 • Komu Knowledge Platform
        </footer>
      </div>
    </div>
  );
}
