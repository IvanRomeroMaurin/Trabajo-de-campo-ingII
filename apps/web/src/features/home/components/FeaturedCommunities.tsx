'use client';

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { CommunityCard, type Community } from '@/features/comunidades/components/CommunityCard';

const communidades: Community[] = [
  {
    id: '1',
    nombre: 'Dev Fullstack',
    descripcion: 'Aprende patrones avanzados de React, Next.js y ecosistema moderno con proyectos reales.',
    categoria: 'Programación',
    miembros: 1240,
    estrellas: 4.9,
    color: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
  },
  {
    id: '2',
    nombre: 'Diseño UX/UI',
    descripcion: 'Espacio para diseñadores que buscan dominar Figma, sistemas de diseño y psicología visual.',
    categoria: 'Diseño',
    miembros: 873,
    estrellas: 4.8,
    color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
  },
  {
    id: '3',
    nombre: 'Data & IA',
    descripcion: 'Python, Machine Learning, redes neuronales y análisis de datos con proyectos reales.',
    categoria: 'IA',
    miembros: 2100,
    estrellas: 5.0,
    color: 'linear-gradient(135deg, #0cebeb, #20e3b2)',
  },
];

export function FeaturedCommunities() {
  return (
    <section style={{ padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-purple" style={{ marginBottom: '1rem' }}>
            <Star size={12} />
            Comunidades Destacadas
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '0.8rem' }}>
            Empezá hoy mismo
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '1.05rem' }}>
            Elegí la comunidad que más se ajusta a tus objetivos y suscribite en segundos.
          </p>
          <div className="divider-glow"></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {communidades.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/comunidades" className="btn-outline" style={{ padding: '0.8rem 2rem' }}>
            Ver todas las comunidades <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
