import Link from 'next/link';
import { LogIn, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar Sesión – KomuLearn',
  description: 'Accedé a tu cuenta en KomuLearn y continuá aprendiendo.',
};

export default function LoginPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '2.5rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.2rem', boxShadow: '0 8px 20px rgba(139,92,246,0.35)',
          }}>
            <LogIn size={24} color="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>Bienvenido de vuelta</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ingresá tus credenciales para continuar</p>
        </div>

        <LoginForm />

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          ¿No tenés cuenta?{' '}
          <Link href="/register" style={{ color: '#a78bfa', fontWeight: 600, textDecoration: 'none' }}>
            Registrate gratis
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
