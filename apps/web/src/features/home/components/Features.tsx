'use client';

import { Users, BookOpen, TrendingUp, Shield, ArrowRight } from 'lucide-react';

const featuresData = [
  {
    number: '01',
    icon: <Users size={22} />,
    title: 'Comunidades de Aprendizaje',
    desc: 'Conexión directa con expertos y pares. Resolución de dudas en tiempo real y mentoría continua semana a semana.',
    tag: 'Community',
    color: 'sky',
  },
  {
    number: '02',
    icon: <BookOpen size={22} />,
    title: 'Recursos Curados',
    desc: 'Acceso a documentación técnica, repositorios privados y clases maestras grabadas para repasar a tu ritmo.',
    tag: 'Content',
    color: 'cyan',
  },
  {
    number: '03',
    icon: <TrendingUp size={22} />,
    title: 'Rutas Técnicas',
    desc: 'Paths de aprendizaje diseñados por ingenieros senior para llevar tus habilidades al nivel profesional más alto.',
    tag: 'Growth',
    color: 'violet',
  },
  {
    number: '04',
    icon: <Shield size={22} />,
    title: 'Mentores Verificados',
    desc: 'Cada mentor pasa por una auditoría técnica rigurosa. Solo expertos con experiencia real en producción.',
    tag: 'Trust',
    color: 'emerald',
  },
];

const colorMap: Record<string, string> = {
  sky: 'bg-sky-50 text-sky-600 border border-sky-100',
  cyan: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
  violet: 'bg-violet-50 text-violet-600 border border-violet-100',
  emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
};

const tagColorMap: Record<string, string> = {
  sky: 'bg-sky-100 text-sky-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  violet: 'bg-violet-100 text-violet-700',
  emerald: 'bg-emerald-100 text-emerald-700',
};

export function Features() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white relative">
      <div className="max-w-7xl mx-auto">

        {/* Section Header — editorial left-aligned */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Capacidades del Ecosistema
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-none">
              Todo lo que<br />
              <span className="text-sky-600">necesitás</span> para crecer.
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-base leading-relaxed font-medium">
            Herramientas profesionales, mentores reales y una comunidad que empuja hacia arriba.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-100 rounded-3xl overflow-hidden">
          {featuresData.map((feat, i) => (
            <div
              key={i}
              className={`p-10 flex flex-col gap-8 group hover:bg-slate-50 transition-colors duration-300 ${i < 3 ? 'border-r border-slate-100' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[feat.color]}`}>
                  {feat.icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${tagColorMap[feat.color]}`}>
                  {feat.tag}
                </span>
              </div>

              <div>
                <div className="text-xs font-black text-slate-300 tracking-widest mb-3">{feat.number}</div>
                <h3 className="font-display text-xl font-black text-slate-950 mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{feat.desc}</p>
              </div>

              <div className="mt-auto flex items-center gap-1.5 text-slate-300 group-hover:text-sky-500 transition-colors text-xs font-bold uppercase tracking-wider">
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                Saber más
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
