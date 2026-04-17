import Link from 'next/link';
import { UserPlus, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Crear Cuenta – KomuLearn',
  description: 'Creá tu cuenta gratuita y empezá a explorar comunidades educativas.',
};

export default function RegisterPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div className="glass-card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.2rem', boxShadow: '0 8px 20px rgba(236,72,153,0.3)',
          }}>
            <UserPlus size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>Creá tu cuenta</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Es gratis y te lleva menos de 1 minuto</p>
        </div>

        <RegisterForm />

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
            Iniciá sesión
          </Link>
        </p>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none' }}>
            <ArrowLeft size={13} /> Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}
