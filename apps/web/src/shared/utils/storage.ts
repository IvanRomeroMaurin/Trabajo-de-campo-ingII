import { createClient } from '@supabase/supabase-js';

// Inicializar el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Variables de entorno de Supabase faltantes');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface UploadOptions {
  maxSizeMb?: number;
  allowedMimeTypes?: string[];
}

export const DEFAULT_UPLOAD_OPTIONS: UploadOptions = {
  maxSizeMb: 2,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
};

/**
 * Función reutilizable para subir archivos a Supabase Storage
 * 
 * @param file El archivo a subir (como File)
 * @param bucket Nombre del bucket en Supabase
 * @param path Ruta donde se guardará (ej: 'portadas/123/portada.jpg')
 * @param options Opciones de validación de tamaño y mime types
 * @returns La URL pública del archivo subido
 */
export async function uploadFileToStorage(
  file: File,
  bucket: string,
  path: string,
  options: UploadOptions = DEFAULT_UPLOAD_OPTIONS
): Promise<string> {
  // Validación de mime types
  if (options.allowedMimeTypes && !options.allowedMimeTypes.includes(file.type)) {
    throw new Error(`Tipo de archivo inválido. Permitidos: ${options.allowedMimeTypes.join(', ')}`);
  }

  // Validación de tamaño de archivo (de MB a bytes)
  if (options.maxSizeMb) {
    const maxSizeBytes = options.maxSizeMb * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new Error(`El archivo supera el tamaño máximo permitido de ${options.maxSizeMb}MB`);
    }
  }

  // Subir usando Supabase
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert: true, // Reemplazar si existe
  });

  if (error) {
    console.error('FULL SUPABASE ERROR:', error);
    throw new Error(`Error subiendo archivo a Supabase: ${error.message}`);
  }

  // Obtener URL pública
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}
