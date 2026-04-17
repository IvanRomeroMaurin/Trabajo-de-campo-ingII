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
    <div className="community-card">
      <div className="community-card-inner">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
            background: community.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            {community.nombre[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {community.categoria}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 600 }}>
                <Star size={12} fill="#fbbf24" />
                {community.estrellas}
              </div>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.1rem', color: 'var(--text-primary)' }}>
              {community.nombre}
            </h3>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem', minHeight: '3.2rem' }}>
          {community.descripcion}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Users size={14} /> {community.miembros.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <BookOpen size={14} /> 12 temas
            </span>
          </div>
          <Link
            href={`/comunidades/${community.id}`}
            style={{ color: 'var(--accent-purple)', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            Unirse <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
