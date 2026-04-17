'use client';

const stats = [
  { numero: '12K+', label: 'Estudiantes activos' },
  { numero: '340+', label: 'Comunidades creadas' },
  { numero: '95%', label: 'Satisfacción' },
  { numero: '$0', label: 'Para empezar' },
];

export function Stats() {
  return (
    <section style={{ padding: '2rem 1.5rem 4rem' }}>
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {stats.map((stat, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div className="stat-number text-gradient">{stat.numero}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
