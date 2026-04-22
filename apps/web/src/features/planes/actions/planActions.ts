'use server';

import { revalidatePath } from 'next/cache';
import { ICreatePlanRequest } from '@repo/types';
import { planService } from '../services/planService';

export async function crearPlan(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const precio = Number(formData.get('precio'));
  const frecuencia = Number(formData.get('frecuencia'));
  const tipo_frecuencia = formData.get('tipo_frecuencia') as 'months' | 'days';
  const moneda = formData.get('moneda') as 'ARS' | 'USD';
  const id_comunidad = formData.get('id_comunidad') as string;

  if (!titulo || !precio || !frecuencia || !id_comunidad) {
    throw new Error('Faltan campos obligatorios para el plan');
  }

  const dto: ICreatePlanRequest = {
    titulo,
    descripcion,
    precio,
    frecuencia,
    tipo_frecuencia,
    moneda,
    id_comunidad,
  };

  try {
    const result = await planService.crearPlan(dto);
    
    // Revalidamos la ruta del detalle de la comunidad para mostrar el nuevo plan
    revalidatePath(`/comunidades/${id_comunidad}`);

    return { success: true, plan: result.plan };
  } catch (error) {
    console.error('Error al crear plan:', error);
    return { success: false, error: 'Ocurrió un error al registrar el plan en Mercado Pago' };
  }
}
