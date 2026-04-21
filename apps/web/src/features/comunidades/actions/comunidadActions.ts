'use server';

import { revalidatePath } from 'next/cache';
import { comunidadService, CreateCommunityDto } from '../services/comunidadService';
import { uploadFileToStorage } from '@/shared/utils/storage';

export async function createComunidadAction(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const id_categoria_comunidad = Number(formData.get('id_categoria_comunidad'));
  const portadaFile = formData.get('portada_url') as File | null;

  if (!nombre || !id_categoria_comunidad) {
    throw new Error('Faltan campos obligatorios');
  }

  const dto: CreateCommunityDto = {
    nombre,
    descripcion,
    id_categoria_comunidad,
  };

  try {
    // 1. Crear la comunidad base
    const comunidad = await comunidadService.createComunidad(dto);
    
    // 2. Si hay imagen de portada, subirla a Supabase y actualizar la comunidad
    if (portadaFile && portadaFile.size > 0) {
      try {
        const path = `portadas/${comunidad.id_comunidad}/portada.jpg`;
        const publicUrl = await uploadFileToStorage(portadaFile, 'comunidades', path);
        
        await comunidadService.actualizarComunidad(comunidad.id_comunidad, {
          portada_url: publicUrl,
        });
      } catch (uploadError) {
        console.error('Error al subir la imagen de portada:', uploadError);
        // Opcional: Podríamos retornar un warning indicando que se creó pero falló la imagen,
        // pero vamos a continuar el flujo para no perder la comunidad ya creada.
      }
    }

    // Revalidamos las rutas de comunidades
    revalidatePath('/comunidades');
    revalidatePath('/explorar');

    // Redirigimos al panel de la nueva comunidad
    return { success: true, id: comunidad.id_comunidad, slug: comunidad.slug };
  } catch (error) {
    console.error('Error al crear comunidad:', error);
    return { success: false, error: 'Ocurrió un error al crear la comunidad' };
  }
}

export async function updateComunidadAction(id_comunidad: string, formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const descripcion = formData.get('descripcion') as string;
  const id_categoria_comunidad = formData.get('id_categoria_comunidad') ? Number(formData.get('id_categoria_comunidad')) : undefined;
  const portadaFile = formData.get('portada_url') as File | null;

  const dto: any = {};
  if (nombre) dto.nombre = nombre;
  if (descripcion) dto.descripcion = descripcion;
  if (id_categoria_comunidad) dto.id_categoria_comunidad = id_categoria_comunidad;

  try {
    // 1. Subir la portada si hay una nueva
    if (portadaFile && portadaFile.size > 0) {
      try {
        const path = `portadas/${id_comunidad}/portada.jpg`;
        const publicUrl = await uploadFileToStorage(portadaFile, 'comunidades', path);
        dto.portada_url = publicUrl;
      } catch (uploadError) {
        console.error('Error al subir la imagen de portada:', uploadError);
        return { success: false, error: 'Error al subir la imagen de portada' };
      }
    }

    // 2. Actualizar comunidad
    if (Object.keys(dto).length > 0) {
      await comunidadService.actualizarComunidad(id_comunidad, dto);
    }

    // Revalidar
    revalidatePath('/comunidades');
    revalidatePath(`/comunidades/${id_comunidad}`);
    revalidatePath('/explorar');

    return { success: true };
  } catch (error) {
    console.error('Error al actualizar comunidad:', error);
    return { success: false, error: 'Ocurrió un error al actualizar la comunidad' };
  }
}

export async function deactivateComunidadAction(id_comunidad: string) {
  try {
    await comunidadService.desactivarComunidad(id_comunidad);
    
    revalidatePath('/comunidades');
    revalidatePath(`/comunidades/${id_comunidad}`);
    revalidatePath('/explorar');

    return { success: true };
  } catch (error) {
    console.error('Error al desactivar comunidad:', error);
    return { success: false, error: 'Error al desactivar la comunidad' };
  }
}

export async function activateComunidadAction(id_comunidad: string) {
  try {
    await comunidadService.reactivarComunidad(id_comunidad);
    
    revalidatePath('/comunidades');
    revalidatePath(`/comunidades/${id_comunidad}`);
    revalidatePath('/explorar');

    return { success: true };
  } catch (error) {
    console.error('Error al reactivar comunidad:', error);
    return { success: false, error: 'Error al reactivar la comunidad' };
  }
}
