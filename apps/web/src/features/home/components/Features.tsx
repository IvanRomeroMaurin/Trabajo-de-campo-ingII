'use client';

import { Users, BookOpen, TrendingUp, Shield } from 'lucide-react';

const featuresData = [
  {
    icon: <Users size={28} />,
    title: 'Nodos de Aprendizaje',
    desc: 'Conexión directa con expertos y pares. Resolución de dudas en tiempo real y mentoría continua.',
    color: 'rgba(14, 165, 233, 0.1)',
    iconColor: 'var(--accent-primary)',
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Recursos Curados',
    desc: 'Acceso a documentación técnica, repositorios y clases maestras de alta fidelidad.',
    color: 'rgba(6, 182, 212, 0.1)',
    iconColor: 'var(--accent-secondary)',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Escalamiento Técnico',
    desc: 'Rutas de aprendizaje diseñadas para llevar tus habilidades al siguiente nivel profesional.',
    color: 'rgba(124, 58, 237, 0.08)',
    iconColor: 'var(--accent-tertiary)',
  },
  {
    icon: <Shield size={28} />,
    title: 'Verificación de Expertos',
    desc: 'Cada mentor pasa por una rigurosa auditoría técnica para garantizar la calidad del contenido.',
    color: 'rgba(14, 165, 233, 0.1)',
    iconColor: 'var(--accent-primary)',
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

        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Nuestra <span className="text-gradient-tech">Infraestructura Digital</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
            Combinamos tecnología de punta con la calidez del aprendizaje colaborativo para ofrecer una experiencia educativa inigualable.
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
