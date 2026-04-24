/**
 * Convierte un texto en un slug URL-friendly.
 * Ej: "SpaceX Academy!!!" → "spacex-academy"
 *
 * @param text - El texto a convertir.
 * @returns El slug resultante.
 */
export const stringToSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina tildes
    .replace(/[^a-z0-9\s-]/g, '') // elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-'); // espacios → guiones
};
