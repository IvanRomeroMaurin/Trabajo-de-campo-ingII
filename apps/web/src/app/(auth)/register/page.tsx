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
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="glass-card max-w-[460px] w-full p-10 py-12 border border-slate-100">

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-sky-500/20">
            <UserPlus size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">Creá tu cuenta</h1>
          <p className="text-slate-500 text-sm font-medium">Es gratis y te lleva menos de 1 minuto</p>
        </div>

        <RegisterForm />

        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-sky-500 font-bold hover:underline">
            Iniciá sesión
          </Link>
        </p>

        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 text-[0.85rem] font-bold hover:text-slate-600 transition-colors">
            <ArrowLeft size={14} /> Volver al inicio
          </Link>
        </div>

      </div>
    </div>
  );
}
