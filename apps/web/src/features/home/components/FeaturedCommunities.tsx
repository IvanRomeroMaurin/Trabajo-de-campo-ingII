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
    <section style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="badge badge-tech" style={{ marginBottom: '1.2rem' }}>
            <Star size={14} fill="currentColor" stroke="none" />
            Nodos Destacados
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Comunidades de <span className="text-gradient-tech">Alto Impacto</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Seleccionamos comunidades con mentores activos y contenido curado para acelerar tu crecimiento técnico.
          </p>
          <div className="divider-glow"></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
          gap: '2rem' 
        }}>
          {communidades.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link href="/comunidades" className="btn-outline" style={{ padding: '1rem 2.5rem' }}>
            Explorar todo el ecosistema <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
