import Link from 'next/link';
import { LogIn, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Iniciar Sesión – Komu',
  description: 'Accedé a tu cuenta en Komu y continuá aprendiendo.',
};

export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ from?: string }> 
}) {
  const { from } = await searchParams;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="glass-card max-w-md w-full p-10 py-12 border border-slate-200 shadow-xl shadow-slate-200/20">

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/10">
            <LogIn size={28} className="text-sky-400" />
          </div>
          <h1 className="text-3xl font-black mb-2 text-slate-950 tracking-tight leading-tight">Bienvenido de vuelta</h1>
          <p className="text-slate-500 text-sm font-medium">Ingresá tus credenciales para continuar</p>
        </div>

        <LoginForm callbackUrl={from} />

        <p className="text-center mt-10 text-slate-500 text-sm font-medium">
          ¿No tenés cuenta?{' '}
          <Link href="/register" className="text-sky-600 font-bold hover:underline">
            Registrate gratis
          </Link>
        </p>

        <div className="text-center mt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors">
            <ArrowLeft size={14} /> Volver al sitio principal
          </Link>
        </div>

      </div>
    </div>
  );
}
