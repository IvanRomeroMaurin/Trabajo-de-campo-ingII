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
    <div className="hero-bg" style={{ minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Cabecera de la página */}
        <header style={{ marginBottom: '3rem', textAlign: 'left' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="badge badge-purple">
              <Sparkles size={12} />
              Explorar el conocimiento
            </span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Descubrí tu próxima <span className="text-gradient">comunidad</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1.1rem' }}>
            Unite a grupos liderados por expertos, compartí recursos y aprendé junto a miles de estudiantes.
          </p>
        </header>

        {/* Barra de búsqueda y Filtros */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative', maxWidth: '500px' }}>
            <div style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center'
            }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem 0.9rem 3rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-purple)';
                e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)';
                e.target.style.boxShadow = 'none';
              }}
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
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '5rem 0', 
            background: 'var(--bg-card)', 
            borderRadius: '20px',
            border: '1px dashed var(--border-subtle)'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              No encontramos comunidades que coincidan con tu búsqueda.
            </p>
            <button 
              onClick={() => {setSelectedCategory('Todas'); setSearchQuery('');}}
              style={{ 
                marginTop: '1rem', 
                background: 'none', 
                border: 'none', 
                color: 'var(--accent-purple)', 
                fontWeight: 600, 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Ver todas las comunidades
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
