'use client';

import { useState } from 'react';
import { PowerOff, CheckCircle, Loader2 } from 'lucide-react';
import { deactivateComunidadAction, activateComunidadAction } from '../actions/comunidadActions';
import { useRouter } from 'next/navigation';

interface DeactivateCommunityButtonProps {
  idComunidad: string;
  isActive: boolean;
}

export function DeactivateCommunityButton({ idComunidad, isActive }: DeactivateCommunityButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    const actionDesc = isActive ? 'dar de baja' : 'volver a activar';
    if (!confirm(`¿Estás seguro de que quieres ${actionDesc} esta comunidad?`)) {
      return;
    }

    setIsPending(true);
    try {
      let result;
      if (isActive) {
        result = await deactivateComunidadAction(idComunidad);
      } else {
        result = await activateComunidadAction(idComunidad);
      }

      if (result.success) {
        // La recarga de Next.js refrescará el estado en el padre.
        router.push('/comunidades');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Error de conectividad al cambiar el estado.');
    } finally {
      setIsPending(false);
    }
  };

  if (isActive) {
    return (
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="flex items-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 font-black rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all text-sm shadow-sm disabled:opacity-70"
      >
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <PowerOff size={18} />}
        Dar de baja
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="flex items-center gap-2 px-6 py-3 bg-white border border-emerald-200 text-emerald-600 font-black rounded-xl hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all text-sm shadow-sm disabled:opacity-70"
    >
      {isPending ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle size={18} />}
      Dar de alta
    </button>
  );
}
