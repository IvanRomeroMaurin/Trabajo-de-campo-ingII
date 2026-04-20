'use client';

import Link from 'next/link';
import { Users, BookOpen, ChevronRight, Star } from 'lucide-react';
import { IComunidad } from '@repo/types';

interface CommunityCardProps {
  community: IComunidad;
}

export function CommunityCard({ community }: CommunityCardProps) {
  // Datos mockeados para campos que podrían no venir de la API aún
  const miembros = 0; // O community.miembros si existiera en el tipo
  const estrellas = 4.8;
  const color = 'linear-gradient(135deg, #61dafb, #2188ff)';

  const id = community.id_comunidad;
  const nombre = community.nombre;
  const descripcion = community.descripcion || 'Sin descripción';
  const categoria = community.categoria_comunidad?.descripcion || 'General';

  return (
    <div className="group h-full">
      <div className="glass-card h-full p-8 flex flex-col hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 border border-slate-100">
        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white"
            style={{ background: color }}
          >
            {nombre[0]}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-black text-sky-500 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                {categoria}
              </span>
              <div className="flex items-center gap-1 text-cyan-600 text-sm font-black">
                <Star size={14} className="fill-cyan-500 text-cyan-500" />
                {estrellas.toFixed(1)}
              </div>
            </div>
            <h3 className="text-xl font-black mt-2 text-slate-900 tracking-tight leading-tight">
              {nombre}
            </h3>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 font-medium">
          {descripcion}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex gap-4">
            <span className="text-sm text-slate-400 font-bold flex items-center gap-1.5">
              <Users size={16} className="text-slate-300" /> {miembros}
            </span>
            <span className="text-sm text-slate-400 font-bold flex items-center gap-1.5">
              <BookOpen size={16} className="text-slate-300" /> 12+
            </span>
          </div>
          <Link
            href={`/comunidades/${community.slug}`}
            className="text-sky-500 font-black text-xs flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Entrar <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
