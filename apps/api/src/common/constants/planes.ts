/**
 * IDs de Monedas fijos en la base de datos
 */
export const MONEDAS = {
  USD: '2c57bdec-9467-4f05-95f2-631d3cc8c4b4',
  ARS: '5ce60c07-913f-46f4-8628-4e4019aa481b',
} as const;

/**
 * IDs de Ciclos de Pago fijos en la base de datos
 */
export const CICLOS_PAGO = {
  DIARIO: '1e4dfbb7-6e97-46cd-a8cb-a5a0a517b8df',
  MENSUAL: 'beaf90f2-90ad-43dd-be5e-072746e4f8ab',
  ANUAL: 'f31889f9-952c-4cbf-b9c2-1034940c1e26',
} as const;

/**
 * Mapa de validación para Ciclos de Pago
 * Permite convertir una combinación de (tipo_frecuencia:frecuencia) en un ID de UUID
 */
export const MAP_CICLOS_PAGO: Record<string, string> = {
  'days:1': CICLOS_PAGO.DIARIO,
  'months:1': CICLOS_PAGO.MENSUAL,
  'months:12': CICLOS_PAGO.ANUAL,
} as const;
