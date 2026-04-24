/**
 * Commands (Comandos) para el servicio de comunidades.
 * Representan la intención de realizar un cambio en el sistema y desacoplan
 * la lógica de negocio de los DTOs de la capa de transporte.
 */

export interface CrearComunidadCommand {
  readonly nombre: string;
  readonly descripcion?: string;
  readonly portada_url?: string;
  readonly id_categoria_comunidad: string;
}

export interface ActualizarComunidadCommand {
  readonly nombre?: string;
  readonly descripcion?: string;
  readonly portada_url?: string;
  readonly id_categoria_comunidad?: string;
  readonly activa?: boolean;
}

