'use client';

import Link from 'next/link';
import { Sparkles, LogIn } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-48 text-center relative overflow-hidden bg-slate-50 border-t border-slate-200">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 hero-aura opacity-[0.5]" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-display text-5xl md:text-7xl font-black text-slate-950 tracking-tight mb-10 leading-[1.05]">
          ¿Listo para <span className="text-sky-600">escalar</span> tu futuro?
        </h2>
        <p className="text-slate-600 text-xl leading-relaxed mb-16 max-w-[640px] mx-auto font-medium">
          Unite a la red de conocimiento técnico más potente de la región. Sin barreras, solo progreso colectivo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="/register" className="btn-primary py-4 px-12 text-lg bg-slate-950">
            Empezar Ahora
            <Sparkles size={20} className="text-sky-400" />
          </Link>
          <Link href="/login" className="btn-outline py-4 px-12 text-lg shadow-sm">
            Acceder al Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
