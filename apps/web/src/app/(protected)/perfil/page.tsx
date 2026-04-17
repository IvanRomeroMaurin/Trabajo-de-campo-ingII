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
    <div className="max-w-4xl mx-auto py-12 px-6">

      {/* Header del perfil con datos reales */}
      <div className="glass-card p-10 mb-8 border border-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="w-24 h-24 rounded-3xl flex-shrink-0 bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shadow-xl shadow-sky-500/20 text-3xl font-black text-white ring-4 ring-white">
            {usuario?.nombre?.[0]?.toUpperCase() ?? <User size={42} />}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">
              {usuario?.nombre} {usuario?.apellido}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-sm font-bold">
              <Mail size={16} className="text-slate-400" />
              {usuario?.email}
            </div>
            {!usuario?.activa && (
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-100 py-1.5 px-4 rounded-full font-black uppercase tracking-wider">
                <Shield size={12} /> Cuenta inactiva
              </span>
            )}
          </div>

          <form action={logoutAction}>
            <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-red-600 hover:border-red-100 transition-all text-sm">
              <LogOut size={16} /> Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Tarjetas de secciones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link href="/perfil/suscripciones" className="glass-card p-8 group border border-slate-100 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="font-black mb-1 text-slate-900 text-lg tracking-tight">Mis Suscripciones</h3>
          <p className="text-slate-500 text-[0.85rem] font-medium leading-relaxed">Comunidades a las que pertenecés</p>
        </Link>

        <Link href="/perfil/comunidades" className="glass-card p-8 group border border-slate-100 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <h3 className="font-black mb-1 text-slate-900 text-lg tracking-tight">Mis Comunidades</h3>
          <p className="text-slate-500 text-[0.85rem] font-medium leading-relaxed">Comunidades que administrás</p>
        </Link>

        <Link href="/perfil/ajustes" className="glass-card p-8 group border border-slate-100 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Settings size={24} />
          </div>
          <h3 className="font-black mb-1 text-slate-900 text-lg tracking-tight">Ajustes</h3>
          <p className="text-slate-500 text-[0.85rem] font-medium leading-relaxed">Datos personales y contraseña</p>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-slate-400 text-sm font-bold hover:text-sky-500 transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
