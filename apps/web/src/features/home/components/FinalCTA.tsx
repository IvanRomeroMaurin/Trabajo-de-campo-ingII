'use client';

import Link from 'next/link';
import { Sparkles, LogIn } from 'lucide-react';

export function FinalCTA() {
  return (
    <section style={{ padding: '8rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Fondo dinámico sutil */}
      <div style={{
        position: 'absolute', 
        inset: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(139,92,246,0.05) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(99,102,241,0.03) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '1.2rem' }}>
          ¿Listo para <span className="text-gradient">aprender</span> o <span className="text-gradient">enseñar</span>?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '3rem', lineHeight: 1.7 }}>
          Registrate gratis hoy y empezá a explorar el ecosistema de comunidades educativas más vibrante del mundo.
        </p>
        
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '1.1rem' }}>
            Crear cuenta gratis
            <Sparkles size={18} />
          </Link>
          <Link href="/login" className="btn-outline" style={{ padding: '1rem 2.8rem', fontSize: '1.1rem', background: '#ffffff' }}>
            Ya tengo cuenta
            <LogIn size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
