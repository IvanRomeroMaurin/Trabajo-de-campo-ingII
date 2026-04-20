'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { comunidadService, CreateCommunityDto } from '../services/comunidadService';

export async function createComunidadAction(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const id_categoria_comunidad = Number(formData.get('id_categoria_comunidad'));
  const portada_url = formData.get('portada_url') as string;

  if (!nombre || !id_categoria_comunidad) {
    throw new Error('Faltan campos obligatorios');
  }

  const dto: CreateCommunityDto = {
    nombre,
    descripcion,
    id_categoria_comunidad,
    portada_url: portada_url || undefined,
  };

  try {
    const comunidad = await comunidadService.createComunidad(dto);
    
    // Revalidamos las rutas de comunidades
    revalidatePath('/comunidades');
    revalidatePath('/explorar');

    // Redirigimos al panel de la nueva comunidad
    return { success: true, id: comunidad.id_comunidad };
  } catch (error) {
    console.error('Error al crear comunidad:', error);
    return { success: false, error: 'Ocurrió un error al crear la comunidad' };
  }
}
