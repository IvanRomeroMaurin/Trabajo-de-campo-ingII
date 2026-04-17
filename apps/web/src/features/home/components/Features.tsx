'use client';

import { Users, BookOpen, TrendingUp, Shield } from 'lucide-react';

const featuresData = [
  {
    icon: <Users size={24} />,
    title: 'Comunidades Activas',
    desc: 'Conectate con cientos de personas aprendiendo lo mismo que vos. Resolución colectiva y networking real.',
    color: 'rgba(139, 92, 246, 0.15)',
    iconColor: '#a78bfa',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Contenido Exclusivo',
    desc: 'Clases, recursos, grabaciones y materiales que no encontrarás en ningún otro lugar.',
    color: 'rgba(6, 182, 212, 0.15)',
    iconColor: '#22d3ee',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Crecé a tu ritmo',
    desc: 'Accedé al contenido cuando quieras, sin horarios. El conocimiento te espera.',
    color: 'rgba(236, 72, 153, 0.15)',
    iconColor: '#f472b6',
  },
  {
    icon: <Shield size={24} />,
    title: 'Calidad Garantizada',
    desc: 'Cada creador pasa un proceso de verificación. Solo expertos comparten conocimiento.',
    color: 'rgba(16, 185, 129, 0.15)',
    iconColor: '#34d399',
  },
];

export function Features() {
  return (
    <section style={{ 
      padding: '6rem 1.5rem', 
      background: 'rgba(255,255,255,0.01)', 
      borderTop: '1px solid var(--border-subtle)', 
      borderBottom: '1px solid var(--border-subtle)' 
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.8rem' }}>
            ¿Por qué <span className="text-gradient">KomuLearn</span>?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '1.05rem' }}>
            Diseñamos la plataforma pensando en que el conocimiento fluya de manera natural entre personas.
          </p>
          <div className="divider-glow"></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {featuresData.map((feat, i) => (
            <div key={i} className="glass-card" style={{ padding: '2.5rem 2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="feature-icon" style={{ 
                background: feat.color, 
                color: feat.iconColor,
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.8rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
