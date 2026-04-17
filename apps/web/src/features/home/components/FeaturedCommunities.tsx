'use client';

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { CommunityCard, type Community } from '@/features/comunidades/components/CommunityCard';

const communidades: Community[] = [
  {
    id: '1',
    nombre: 'Frontend Engineering',
    descripcion: 'Domina Next.js 14, TypeScript y arquitecturas escalables con estándares de la industria.',
    categoria: 'Development',
    miembros: 1240,
    estrellas: 4.9,
    color: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
  },
  {
    id: '2',
    nombre: 'SaaS Design System',
    descripcion: 'Crea sistemas de diseño profesionales. Tokens, componentes y documentación técnica.',
    categoria: 'Design',
    miembros: 873,
    estrellas: 4.8,
    color: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
  },
  {
    id: '3',
    nombre: 'AI & Data Ops',
    descripcion: 'Modelos de lenguaje, pipelines de datos y automatización avanzada para desarrolladores.',
    categoria: 'Intelligence',
    miembros: 2100,
    estrellas: 5.0,
    color: 'linear-gradient(135deg, #8b5cf6, #0ea5e9)',
  },
];

export function FeaturedCommunities() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-32 bg-slate-50 relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[0.65rem] font-bold mb-8 shadow-sm uppercase tracking-wider">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            Nodos Seleccionados
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black text-slate-950 tracking-tight mb-6">
            Comunidades de <span className="text-sky-600">Alto Impacto</span>
          </h2>
          <p className="text-slate-600 max-w-[580px] mx-auto text-lg leading-relaxed font-medium">
            Seleccionamos ecosistemas con mentores activos y contenido curado para acelerar tu crecimiento técnico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {communidades.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        <div className="text-center mt-24">
          <Link href="/comunidades" className="btn-outline px-10 py-4 group border-slate-300">
            Explorar todo el ecosistema 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
