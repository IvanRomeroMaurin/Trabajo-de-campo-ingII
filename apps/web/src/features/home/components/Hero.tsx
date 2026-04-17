'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="dot-grid" style={{ 
      padding: '6rem 1.5rem 8rem', 
      textAlign: 'center', 
      position: 'relative', 
      zIndex: 1,
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottom: '1px solid var(--border-glass)',
      overflow: 'hidden'
    }}>
      {/* Visual Aura - Tech Background Element */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        zIndex: -1,
      }} className="animate-pulse" />

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', textAlign: 'left' }}>
        
        <div>
          <div className="animate-fade-in-up" style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-tech">
              <Zap size={14} fill="currentColor" />
              Suscripciones Educativas 2.0
            </span>
          </div>

          <h1
            className="animate-fade-in-up animation-delay-100"
            style={{ 
              fontSize: 'clamp(3rem, 6vw, 4.5rem)', 
              fontWeight: 900, 
              lineHeight: 1.05, 
              letterSpacing: '-0.04em', 
              marginBottom: '1.5rem',
              color: 'var(--text-primary)'
            }}
          >
            Impulsá tu carrera con<br />
            <span className="text-gradient-tech">comunidades reales</span>
          </h1>

          <p
            className="animate-fade-in-up animation-delay-200"
            style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-secondary)', 
              maxWidth: '540px', 
              marginBottom: '3rem', 
              lineHeight: 1.6,
              fontWeight: 450
            }}
          >
            Sumate a ecosistemas de aprendizaje liderados por expertos. 
            Adquirí habilidades demandadas y conectá con profesionales de todo el mundo.
          </p>

          <div className="animate-fade-in-up animation-delay-300" style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/comunidades" className="btn-primary" style={{ padding: '1.2rem 2.8rem' }}>
              Explorar Ahora
              <ArrowRight size={20} />
            </Link>
            <Link href="/register" className="btn-outline" style={{ padding: '1.2rem 2.8rem' }}>
              Crear Grupo
            </Link>
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-200" style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-20px',
            background: 'var(--gradient-glow)',
            zIndex: -1,
            borderRadius: '50%',
            filter: 'blur(40px)',
          }} className="animate-float" />
          <img 
            src="/assets/hero_tech.png" 
            alt="KomuLearn Tech Illustration"
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '24px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-glass)',
            }}
          />
        </div>

      </div>
    </section>
  );
}
