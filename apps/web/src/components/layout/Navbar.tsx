import Link from 'next/link';
import { UserPlus, Sparkles, LogOut } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-18">

          {/* === LOGO === */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg shadow-slate-900/10">
              <Sparkles size={18} className="text-sky-400 fill-sky-400" />
            </div>
            <span className="text-[1.15rem] font-black tracking-tight text-slate-950">
              Komu<span className="text-slate-500 font-bold">Learn</span>
            </span>
          </Link>

          {/* === LINKS CENTRALES === */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/explorar" className="px-5 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm flex items-center gap-2">
              Explorar
            </Link>
            <Link href="/comunidades" className="px-5 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all font-bold text-sm flex items-center gap-2">
              Comunidades
            </Link>
            {isLoggedIn && (
              <Link href="/comunidades/crear" className="px-5 py-2 rounded-xl text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-all font-bold text-sm flex items-center gap-2">
                <Sparkles size={14} className="fill-sky-600/20" />
                Crear
              </Link>
            )}
          </div>

          {/* === ACCIONES DE AUTH === */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link href="/perfil" className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm border border-slate-200">
                    {usuario?.nombre?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-slate-900 font-bold text-sm hidden sm:inline mr-2">
                    {usuario?.nombre}
                  </span>
                </Link>

                <form action={logoutAction}>
                  <button type="submit" className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-red-500 hover:border-red-100 transition-all text-sm">
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Salir</span>
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:text-slate-900 hover:bg-slate-50 transition-all text-sm">
                  Sesión
                </Link>
                <Link href="/register" className="px-6 py-2.5 bg-slate-950 text-white font-bold rounded-xl shadow-md shadow-slate-900/10 hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2">
                  <UserPlus size={16} />
                  Empezar
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
