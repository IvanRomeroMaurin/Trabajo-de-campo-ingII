/** Convierte la variable CORS_ORIGIN a la forma que espera enableCors */
export function parsearOrigenCors(valor?: string): string | string[] | boolean {
  if (!valor || valor === '*') return true;
  const origenes = valor
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return origenes.length === 1 ? origenes[0] : origenes;
}
