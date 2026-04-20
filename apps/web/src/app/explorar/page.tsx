'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { CommunityCard } from '@/features/comunidades/components/CommunityCard';
import { CategoryFilter } from '@/features/comunidades/components/CategoryFilter';
import { IComunidad } from '@repo/types';

// --- DATOS MOCKEADOS ---
const MOCK_COMMUNITIES: IComunidad[] = [
  {
    id_comunidad: '1',
    nombre: 'React Masterminds',
    descripcion: 'Aprende patrones avanzados de React, Next.js y ecosistema moderno con proyectos reales.',
    slug: 'react-masterminds',
    activa: true,
    fecha_creacion: new Date().toISOString(),
    id_categoria_comunidad: '1',
  },
  {
    id_comunidad: '2',
    nombre: 'UI/UX Design Lab',
    descripcion: 'Espacio para diseñadores que buscan dominar Figma, sistemas de diseño y psicología visual.',
    slug: 'ui-ux-design-lab',
    activa: true,
    fecha_creacion: new Date().toISOString(),
    id_categoria_comunidad: '2',
  },
  {
    id_comunidad: '3',
    nombre: 'Growth Marketing 101',
    descripcion: 'Estrategias de adquisición, retención y experimentación para startups en crecimiento.',
    slug: 'growth-marketing',
    activa: true,
    fecha_creacion: new Date().toISOString(),
    id_categoria_comunidad: '3',
  },
];

const CATEGORIES = ['Todas', 'Programación', 'Diseño', 'Marketing', 'Negocios', 'IA'];

// Mapeo simple para el filtro del mock
const CATEGORY_MAP: Record<string, string> = {
  'Todas': 'Todas',
  'Programación': '1',
  'Diseño': '2',
  'Marketing': '3',
  'Negocios': '4',
  'IA': '5'
};

export default function ExplorarPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado reactiva
  const filteredCommunities = MOCK_COMMUNITIES.filter((c) => {
    const categoryId = CATEGORY_MAP[selectedCategory];
    const matchesCategory = selectedCategory === 'Todas' || c.id_categoria_comunidad === categoryId;
    const matchesSearch = c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (c.descripcion?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la página */}
        <header className="mb-20 text-left">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles size={12} className="text-sky-500" />
              Explorar el conocimiento
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-950 leading-tight">
            Descubrí tu próxima <br />
            <span className="text-sky-600">comunidad de expertos</span>
          </h1>
          <p className="text-slate-600 max-w-2xl text-lg leading-relaxed font-medium">
            Unite a grupos liderados por mentores activos, compartí recursos y aprendé junto a miles de profesionales.
          </p>
        </header>

        {/* Barra de búsqueda y Filtros */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="relative max-w-xl group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center group-focus-within:text-sky-500 transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-base outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 placeholder:text-slate-400 font-medium"
            />
          </div>

          <CategoryFilter 
            categories={CATEGORIES} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        {/* Grilla de comunidades */}
        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id_comunidad} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-lg font-medium">
              No encontramos comunidades que coincidan con tu búsqueda.
            </p>
            <button 
              onClick={() => {setSelectedCategory('Todas'); setSearchQuery('');}}
              className="mt-6 text-sky-600 font-black hover:text-sky-700 transition-colors uppercase text-xs tracking-widest"
            >
              Ver todas las comunidades
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
