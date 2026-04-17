'use client';

import { TrendingUp } from 'lucide-react';

const stats = [
  { numero: '12K+', label: 'Estudiantes activos', detail: '+18% este mes' },
  { numero: '340+', label: 'Comunidades creadas', detail: 'En 12 categorías' },
  { numero: '95%', label: 'Satisfacción neta', detail: 'NPS > 70' },
  { numero: '$0', label: 'Para empezar', detail: 'Sin tarjeta de crédito' },
];

export function Stats() {
  return (
    <section className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10 border border-white/10 rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <div key={i} className="p-10 lg:p-14 flex flex-col items-start gap-3 hover:bg-white/5 transition-colors group">
              <div className="font-display text-5xl lg:text-6xl font-black text-white tracking-[-0.04em] group-hover:text-sky-400 transition-colors">
                {stat.numero}
              </div>
              <div className="text-slate-400 text-[0.8rem] font-bold uppercase tracking-[0.12em]">
                {stat.label}
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mt-1">
                <TrendingUp size={11} />
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
