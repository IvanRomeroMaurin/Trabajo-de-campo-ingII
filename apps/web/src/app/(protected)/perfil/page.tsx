import Link from 'next/link';
import { User, BookOpen, Users, Settings, LogOut, Mail, Shield } from 'lucide-react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getProfileApi } from '@/shared/lib/api/auth/authApi';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/features/auth/actions/logoutAction';

export const metadata: Metadata = {
  title: 'Mi Perfil – KomuLearn',
  description: 'Tu perfil de usuario en KomuLearn.',
};

export default async function PerfilPage() {
  // Verificar que haya sesión activa
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    redirect('/login');
  }

  // Obtener datos reales del perfil desde NestJS
  let usuario = null;
  try {
    usuario = await getProfileApi();
  } catch {
    // Si el token expiró o es inválido, redirigir al login
    redirect('/login');
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem' }}>

      {/* Header del perfil con datos reales */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(139,92,246,0.35)',
            fontSize: '2rem',
          }}>
            {usuario?.nombre?.[0]?.toUpperCase() ?? <User size={36} color="white" />}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.25rem' }}>
              {usuario?.nombre} {usuario?.apellido}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Mail size={14} />
              {usuario?.email}
            </div>
            {!usuario?.activa && (
              <span style={{
                marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                fontSize: '0.75rem', color: '#f87171',
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                padding: '0.2rem 0.6rem', borderRadius: '50px',
              }}>
                <Shield size={11} /> Cuenta inactiva
              </span>
            )}
          </div>

          {/* Botón cerrar sesión con la acción centralizada */}
          <form action={logoutAction}>
            <button type="submit" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              <LogOut size={14} /> Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Tarjetas de secciones */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <Link href="/perfil/suscripciones" className="glass-card" style={{ padding: '1.5rem', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <BookOpen size={24} style={{ color: '#a78bfa', marginBottom: '0.75rem' }} />
          <h3 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Mis Suscripciones</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Comunidades a las que pertenecés</p>
        </Link>

        <Link href="/perfil/comunidades" className="glass-card" style={{ padding: '1.5rem', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <Users size={24} style={{ color: '#22d3ee', marginBottom: '0.75rem' }} />
          <h3 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Mis Comunidades</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Comunidades que administrás</p>
        </Link>

        <Link href="/perfil/ajustes" className="glass-card" style={{ padding: '1.5rem', textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <Settings size={24} style={{ color: '#f472b6', marginBottom: '0.75rem' }} />
          <h3 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Ajustes</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Datos personales y contraseña</p>
        </Link>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
