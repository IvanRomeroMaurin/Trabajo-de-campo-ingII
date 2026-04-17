'use client';

import Link from 'next/link';
import { Users, BookOpen, ChevronRight, Star } from 'lucide-react';

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
  return (
    <div className="community-card hover-shimmer">
      <div className="community-card-inner glass-card" style={{ padding: '1.8rem', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.2rem' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
            background: community.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', color: 'white', fontWeight: 800,
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          }}>
            {community.nombre[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {community.categoria}
              </span>
              <div className="font-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#06b6d4', fontSize: '0.8rem', fontWeight: 700 }}>
                <Star size={14} fill="#06b6d4" stroke="none" />
                {community.estrellas.toFixed(1)}
              </div>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {community.nombre}
            </h3>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem', minHeight: '3.5rem' }}>
          {community.descripcion}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.2rem', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Users size={16} /> {community.miembros.toLocaleString()}
            </span>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <BookOpen size={16} /> 12+
            </span>
          </div>
          <Link
            href={`/comunidades/${community.id}`}
            style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Entrar <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
