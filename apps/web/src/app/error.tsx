'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error de aplicación:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-red-50/30 rounded-full blur-3xl -z-10" />

      <div className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
          <AlertCircle size={32} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-950 tracking-tight font-outfit">
            Algo no salió bien
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Hubo un problema técnico al cargar esta parte. No te preocupes, tus datos están seguros.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/10 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
