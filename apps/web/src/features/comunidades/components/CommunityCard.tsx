'use client';

import Link from 'next/link';
import { Users, BookOpen, ChevronRight, Star, Sparkles } from 'lucide-react';
import { IComunidad } from '@repo/types';

interface CommunityCardProps {
  community: IComunidad;
  href?: string;
}

export function CommunityCard({ community, href }: CommunityCardProps) {
  // Datos mockeados para campos que podrían no venir de la API aún
  const miembros = 0;
  const estrellas = 4.8;
  // Degradado para cuando no hay imagen
  const colorPlaceholder = 'bg-linear-to-br from-slate-800 to-slate-950';

  const nombre = community.nombre;
  const descripcion = community.descripcion || 'Sin descripción detallada disponible.';
  const categoria = community.categoria_comunidad?.descripcion || 'General';
  const imagen = community.portada_url;

  return (
    <div className="group h-full flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 hover:-translate-y-1">

      {/* Contenedor de Imagen (Product Style) */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full ${colorPlaceholder} flex items-center justify-center`}>
            <Sparkles size={48} className="text-white/20" />
            <span className="absolute text-5xl font-black text-white/10 select-none">
              {nombre[0]}
            </span>
          </div>
        )}

        {/* Badge de Categoría encima de la imagen */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-900 uppercase tracking-wider shadow-sm border border-white/20">
            {categoria}
          </span>
        </div>

        {/* Rating flotante */}
        <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-slate-900/40 backdrop-blur-md border border-white/10 flex items-center gap-1 text-white text-xs font-black">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          {estrellas}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mb-3 group-hover:text-sky-600 transition-colors">
          {nombre}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 font-medium line-clamp-3">
          {descripcion}
        </p>

        {/* Footer con Stats */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-50">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <Users size={14} className="text-slate-400" />
              </div>
              <span className="text-xs text-slate-600 font-bold">{miembros}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                <BookOpen size={14} className="text-slate-400" />
              </div>
              <span className="text-xs text-slate-600 font-bold">12+</span>
            </div>
          </div>

          <Link
            href={href || `/comunidades/${community.slug}`}
            className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-sky-600 transition-all shadow-lg shadow-slate-900/10 group-hover:shadow-sky-500/20"
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
