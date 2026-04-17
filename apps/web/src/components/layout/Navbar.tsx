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
              width: '38px', height: '38px', borderRadius: '12px',
              background: 'var(--gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
            }}>
              <Sparkles size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.03em' }}>
              <span className="text-gradient">Komu</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>Learn</span>
            </span>
          </Link>

          {/* === LINKS CENTRALES === */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Link href="/explorar" className="btn-ghost">
              <BookOpen size={16} />
              Explorar
            </Link>
            <Link href="/comunidades" className="btn-ghost">
              <Users size={16} />
              Comunidades
              <ChevronDown size={14} style={{ opacity: 0.5 }} />
            </Link>
          </div>

          {/* === ACCIONES DE AUTH === */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            {isLoggedIn ? (
              <>
                {/* Saludo con el nombre real del usuario */}
                <Link href="/perfil" className="btn-ghost" style={{ gap: '0.6rem' }}>
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--gradient-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800, color: 'white',
                    boxShadow: '0 2px 8px rgba(14, 165, 233, 0.3)'
                  }}>
                    {usuario?.nombre?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    {usuario?.nombre}
                  </span>
                </Link>

                {/* Cerrar sesión usando la acción centralizada */}
                <form action={logoutAction}>
                  <button type="submit" className="btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <LogOut size={16} />
                    Salir
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  <LogIn size={16} />
                  Sesión
                </Link>
                <Link href="/register" className="btn-primary">
                  <UserPlus size={16} />
                  Sumarme
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
