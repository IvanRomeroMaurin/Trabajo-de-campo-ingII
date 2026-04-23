/**
 * Commands (Comandos) para el servicio de planes.
 * Representan la intención de realizar un cambio en el sistema y desacoplan
 * la lógica de negocio de los DTOs de la capa de transporte.
 */
export class CrearPlanCommand {
  titulo: string;
  descripcion?: string;
  precio: number;
  frecuencia: number;
  tipo_frecuencia: 'months' | 'days';
  moneda: 'ARS' | 'USD';
  id_comunidad: string;
}
