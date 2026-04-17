'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="dot-grid" style={{ 
      padding: '8rem 1.5rem 6rem', 
      textAlign: 'center', 
      position: 'relative', 
      zIndex: 1,
      minHeight: '65vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border-subtle)',
      marginBottom: '3rem'
    }}>
      {/* Overlay sutil para profundidad y gradiente suave */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at top, rgba(139, 92, 246, 0.03) 0%, transparent 70%), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%)',
        zIndex: -1,
      }} />

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
          <span className="badge badge-purple">
            <Sparkles size={12} />
            Plataforma Educativa de nueva generación
          </span>
        </div>

        <h1
          className="animate-fade-in-up animation-delay-100"
          style={{ 
            fontSize: 'clamp(2.8rem, 8vw, 4.8rem)', 
            fontWeight: 900, 
            lineHeight: 1.05, 
            letterSpacing: '-0.04em', 
            marginBottom: '1.8rem',
            color: 'var(--text-primary)'
          }}
        >
          El lugar donde el<br />
          <span className="text-gradient-warm">conocimiento une comunidades</span>
        </h1>

        <p
          className="animate-fade-in-up animation-delay-200"
          style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-secondary)', 
            maxWidth: '620px', 
            margin: '0 auto 3.5rem', 
            lineHeight: 1.6,
            fontWeight: 450
          }}
        >
          Suscribite a comunidades de expertos, aprendé a tu ritmo y, cuando estés listo, 
          creá la tuya propia para compartir lo que sabés con el mundo.
        </p>

        <div className="animate-fade-in-up animation-delay-300" style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/comunidades" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
            Explorar Comunidades
            <ArrowRight size={18} />
          </Link>
          <Link href="/register" className="btn-outline" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
            Crear mi Comunidad
            <Zap size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
