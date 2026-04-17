import Link from 'next/link';
import { BookOpen, Users, LogIn, UserPlus, ChevronDown, Sparkles, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import { getProfileApi } from '@/shared/lib/api/auth/authApi';
import { logoutAction } from '@/features/auth/actions/logoutAction';

/**
 * Navbar Global – Server Component Async
 * Lee la cookie de sesión del servidor para mostrar el estado real de autenticación
 * sin necesidad de Context, estado global ni Client Components.
 */
export async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  // Si hay token, intentamos obtener el perfil para mostrar el nombre
  let usuario = null;
  if (token) {
    try {
      usuario = await getProfileApi();
    } catch {
      // Token inválido o expirado — tratamos como no logueado
    }
  }

  const isLoggedIn = !!usuario;

  return (
    <nav className="navbar-glass">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>

          {/* === LOGO === */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
            }}>
              <Sparkles size={18} color="white" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
              <span className="text-gradient">Komu</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '400' }}>Learn</span>
            </span>
          </Link>

          {/* === LINKS CENTRALES === */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Link href="/explorar" className="btn-ghost">
              <BookOpen size={15} />
              Explorar
            </Link>
            <Link href="/comunidades" className="btn-ghost">
              <Users size={15} />
              Comunidades
              <ChevronDown size={13} />
            </Link>
          </div>

          {/* === ACCIONES DE AUTH === */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isLoggedIn ? (
              <>
                {/* Saludo con el nombre real del usuario */}
                <Link href="/perfil" className="btn-ghost" style={{ gap: '0.5rem' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 700, color: 'white',
                  }}>
                    {usuario?.nombre?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {usuario?.nombre}
                  </span>
                </Link>

                {/* Cerrar sesión usando la acción centralizada */}
                <form action={logoutAction}>
                  <button type="submit" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <LogOut size={14} />
                    Salir
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  <LogIn size={15} />
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="btn-primary">
                  <UserPlus size={15} />
                  Registrarse
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
