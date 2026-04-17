'use client';

import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { CommunityCard, type Community } from '@/features/comunidades/components/CommunityCard';
import { CategoryFilter } from '@/features/comunidades/components/CategoryFilter';

// --- DATOS MOCKEADOS ---
const MOCK_COMMUNITIES: Community[] = [
  {
    id: '1',
    nombre: 'React Masterminds',
    descripcion: 'Aprende patrones avanzados de React, Next.js y ecosistema moderno con proyectos reales.',
    categoria: 'Programación',
    miembros: 1540,
    estrellas: 4.9,
    color: 'linear-gradient(135deg, #61dafb, #2188ff)',
  },
  {
    id: '2',
    nombre: 'UI/UX Design Lab',
    descripcion: 'Espacio para diseñadores que buscan dominar Figma, sistemas de diseño y psicología visual.',
    categoria: 'Diseño',
    miembros: 920,
    estrellas: 4.8,
    color: 'linear-gradient(135deg, #f24e1e, #a259ff)',
  },
  {
    id: '3',
    nombre: 'Growth Marketing 101',
    descripcion: 'Estrategias de adquisición, retención y experimentación para startups en crecimiento.',
    categoria: 'Marketing',
    miembros: 750,
    estrellas: 4.7,
    color: 'linear-gradient(135deg, #ff4b2b, #ff416c)',
  },
  {
    id: '4',
    nombre: 'IA & LLM Builders',
    descripcion: 'Comunidad dedicada a la creación de aplicaciones usando GPT-4, LangChain y modelos locales.',
    categoria: 'IA',
    miembros: 2100,
    estrellas: 5.0,
    color: 'linear-gradient(135deg, #0cebeb, #20e3b2, #29ffc6)',
  },
  {
    id: '5',
    nombre: 'Frontend Trends',
    descripcion: 'Mantenete al día con lo último en CSS, animaciones y frameworks emergentes del lado del cliente.',
    categoria: 'Programación',
    miembros: 1200,
    estrellas: 4.8,
    color: 'linear-gradient(135deg, #8e2de2, #4a00e0)',
  },
  {
    id: '6',
    nombre: 'Business Strategy',
    descripcion: 'Modelos de negocio, finanzas para emprendedores y escalabilidad de servicios digitales.',
    categoria: 'Negocios',
    miembros: 430,
    estrellas: 4.6,
    color: 'linear-gradient(135deg, #f7971e, #ffd200)',
  },
];

const CATEGORIES = ['Todas', 'Programación', 'Diseño', 'Marketing', 'Negocios', 'IA'];

export default function ComunidadesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de filtrado reactiva
  const filteredCommunities = MOCK_COMMUNITIES.filter((c) => {
    const matchesCategory = selectedCategory === 'Todas' || c.categoria === selectedCategory;
    const matchesSearch = c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera de la página */}
        <header className="mb-20 text-left">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[0.65rem] font-bold uppercase tracking-wider shadow-sm">
              <Sparkles size={12} className="text-sky-500" />
              Explorar el conocimiento
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-950 leading-tight">
            Descubrí tu próxima <br />
            <span className="text-sky-600">comunidad de expertos</span>
          </h1>
          <p className="text-slate-600 max-w-[600px] text-lg leading-relaxed font-medium">
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
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-[1rem] outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-100 placeholder:text-slate-400 font-medium"
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
              <CommunityCard key={community.id} community={community} />
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
