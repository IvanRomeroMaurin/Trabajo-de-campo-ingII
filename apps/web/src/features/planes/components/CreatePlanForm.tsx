'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Calendar, Tag, ArrowRight, Loader2, DollarSign } from 'lucide-react';
import { createPlanAction } from '../actions/planActions';

interface CreatePlanFormProps {
  idComunidad: string;
}

export function CreatePlanForm({ idComunidad }: CreatePlanFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.append('id_comunidad', idComunidad);
    
    try {
      const result = await createPlanAction(formData);
      if (result.success) {
        router.push(`/comunidades/${idComunidad}`);
      } else {
        setError(result.error || 'Error al crear el plan');
      }
    } catch (e) {
      setError('Error de conexión');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Tag size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-950">Detalles del Plan</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="titulo" className="text-sm font-bold text-slate-700 ml-1">
                Título del plan
              </label>
              <input
                required
                id="titulo"
                name="titulo"
                type="text"
                placeholder="Ej: Plan Premium Mensual"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 placeholder:text-slate-400 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="descripcion" className="text-sm font-bold text-slate-700 ml-1">
                Descripción (opcional)
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows={3}
                placeholder="¿Qué incluye este plan?"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 placeholder:text-slate-400 font-medium resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <DollarSign size={20} />
            </div>
            <h2 className="text-xl font-black text-slate-950">Precio y Recurrencia</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="precio" className="text-sm font-bold text-slate-700 ml-1">
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                <input
                  required
                  id="precio"
                  name="precio"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 font-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="moneda" className="text-sm font-bold text-slate-700 ml-1">
                Moneda
              </label>
              <select
                id="moneda"
                name="moneda"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 font-bold appearance-none"
              >
                <option value="ARS">Peso Argentino (ARS)</option>
                <option value="USD">Dólar (USD)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="frecuencia" className="text-sm font-bold text-slate-700 ml-1">
                Frecuencia
              </label>
              <input
                required
                id="frecuencia"
                name="frecuencia"
                type="number"
                min="1"
                defaultValue="1"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 font-bold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tipo_frecuencia" className="text-sm font-bold text-slate-700 ml-1">
                Período
              </label>
              <select
                id="tipo_frecuencia"
                name="tipo_frecuencia"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:bg-white focus:border-emerald-500 font-bold appearance-none"
              >
                <option value="months">Meses</option>
                <option value="days">Días</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl shadow-xl shadow-slate-900/20 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Registrando en Mercado Pago...
            </>
          ) : (
            <>
              Crear Plan de Suscripción
              <ArrowRight size={20} />
            </>
          )}
        </button>

      </form>
    </div>
  );
}
