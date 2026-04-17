'use client';

import Link from 'next/link';
import { Users, BookOpen, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export interface Community {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  miembros: number;
  estrellas: number;
  color: string;
}

interface CommunityCardProps {
  community: Community;
}

export function CommunityCard({ community }: CommunityCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format numbers safely for hydration
  const formattedMiembros = mounted 
    ? community.miembros.toLocaleString('es-AR') 
    : community.miembros.toString();

  return (
    <div className="group h-full">
      <div className="glass-card h-full p-8 flex flex-col hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 border border-slate-100">
        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg ring-4 ring-white"
            style={{ background: community.color }}
          >
            {community.nombre[0]}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="text-[0.65rem] font-black text-sky-500 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                {community.categoria}
              </span>
              <div className="flex items-center gap-1 text-cyan-600 text-[0.8rem] font-black">
                <Star size={14} className="fill-cyan-500 text-cyan-500" />
                {community.estrellas.toFixed(1)}
              </div>
            </div>
            <h3 className="text-xl font-black mt-2 text-slate-900 tracking-tight leading-tight">
              {community.nombre}
            </h3>
          </div>
        </div>

        <p className="text-slate-500 text-[0.9rem] leading-relaxed mb-8 flex-1 font-medium">
          {community.descripcion}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex gap-4">
            <span className="text-[0.8rem] text-slate-400 font-bold flex items-center gap-1.5">
              <Users size={16} className="text-slate-300" /> {formattedMiembros}
            </span>
            <span className="text-[0.8rem] text-slate-400 font-bold flex items-center gap-1.5">
              <BookOpen size={16} className="text-slate-300" /> 12+
            </span>
          </div>
          <Link
            href={`/comunidades/${community.id}`}
            className="text-sky-500 font-black text-[0.85rem] flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Entrar <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
