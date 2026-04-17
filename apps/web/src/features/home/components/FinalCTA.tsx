'use client';

import Link from 'next/link';
import { Sparkles, LogIn } from 'lucide-react';

export function FinalCTA() {
  return (
    <section style={{ padding: '10rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Fondo dinámico Tech */}
      <div style={{
        position: 'absolute', 
        inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.08) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }} className="animate-pulse" />

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          ¿Listo para <span className="text-gradient-tech">digitalizar</span> tu futuro?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '4rem', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto 4rem' }}>
          Unite a la red de conocimiento técnico más potente de la región. Sin barreras, solo progreso colecitvo.
        </p>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
            Empezar Ahora
            <Sparkles size={20} />
          </Link>
          <Link href="/login" className="btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
            Acceder al Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
