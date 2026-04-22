import Link from 'next/link';
import { Rocket, ArrowLeft, Sparkles, Clock, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Próximamente – Komu',
  description: 'Esta función estará disponible muy pronto en Komu.',
};

export default function ProximamentePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden relative">

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full text-center relative z-10">

        {/* Icono Principal Animado */}
        <div className="mb-12 relative flex justify-center">
          <div className="w-32 h-32 bg-linear-to-tr from-sky-500 to-cyan-400 rounded-[40px] flex items-center justify-center shadow-2xl shadow-sky-500/20 rotate-12 transition-transform hover:rotate-0 duration-500 group">
            <Rocket size={56} className="text-white group-hover:scale-110 transition-transform cursor-default" />
          </div>
        </div>

        {/* Texto */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-950 mb-6 tracking-tight leading-tight">
          Estamos <span className="text-sky-600">construyendo</span> algo grande
        </h1>

        <p className="text-slate-500 text-lg md:text-xl font-medium mb-12 leading-relaxed max-w-lg mx-auto">
          Esta función aún no está disponible, pero nuestro equipo está trabajando para traerte la mejor experiencia de comunidades muy pronto.
        </p>

        {/* Botón de regreso */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-10 py-5 bg-slate-950 text-white font-black rounded-3xl shadow-2xl shadow-slate-900/20 hover:-translate-y-1 transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

      </div>

    </div>
  );
}
