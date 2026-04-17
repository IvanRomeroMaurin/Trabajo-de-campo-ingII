'use client';

const stats = [
  { numero: '12K+', label: 'Estudiantes activos' },
  { numero: '340+', label: 'Comunidades creadas' },
  { numero: '95%', label: 'Satisfacción' },
  { numero: '$0', label: 'Para empezar' },
];

export function Stats() {
  return (
    <section style={{ padding: '0 1.5rem 6rem' }}>
      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '2rem' 
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', border: '1px solid var(--border-glass)' }}>
            <div className="stat-number font-mono text-gradient-tech" style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
              {stat.numero}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
