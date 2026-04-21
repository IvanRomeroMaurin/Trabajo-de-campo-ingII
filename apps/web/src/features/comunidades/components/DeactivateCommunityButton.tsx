'use client';

import { useState } from 'react';
import { PowerOff, Loader2 } from 'lucide-react';
import { deactivateComunidadAction } from '../actions/comunidadActions';
import { useRouter } from 'next/navigation';

interface DeactivateCommunityButtonProps {
  idComunidad: string;
}

export function DeactivateCommunityButton({ idComunidad }: DeactivateCommunityButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleDeactivate = async () => {
    if (!confirm('¿Estás seguro de que quieres dar de baja esta comunidad? Esta acción la ocultará del público.')) {
      return;
    }

    setIsPending(true);
    try {
      const result = await deactivateComunidadAction(idComunidad);
      if (result.success) {
        router.push('/comunidades');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Error de conectividad al dar de baja.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleDeactivate}
      disabled={isPending}
      className="flex items-center gap-2 px-6 py-3 bg-white border border-red-200 text-red-600 font-black rounded-xl hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all text-sm shadow-sm disabled:opacity-70"
    >
      {isPending ? <Loader2 size={18} className="animate-spin" /> : <PowerOff size={18} />}
      Dar de baja
    </button>
  );
}
