/**
 * Commands (Comandos) para el servicio de planes.
 * Representan la intención de realizar un cambio en el sistema y desacoplan
 * la lógica de negocio de los DTOs de la capa de transporte.
 */
export interface CrearPlanCommand {
  readonly titulo: string;
  readonly descripcion?: string;
  readonly precio: number;
  readonly frecuencia: number;
  readonly tipo_frecuencia: 'months' | 'days';
  readonly moneda: 'ARS' | 'USD';
  readonly id_comunidad: string;
}
