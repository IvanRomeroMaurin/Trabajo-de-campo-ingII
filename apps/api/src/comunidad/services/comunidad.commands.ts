/**
 * Commands (Comandos) para el servicio de comunidades.
 * Representan la intención de realizar un cambio en el sistema y desacoplan
 * la lógica de negocio de los DTOs de la capa de transporte.
 */

export class CrearComunidadCommand {
  nombre: string;
  descripcion?: string;
  portada_url?: string;
  id_categoria_comunidad: string;
}

export class ActualizarComunidadCommand {
  nombre?: string;
  descripcion?: string;
  portada_url?: string;
  id_categoria_comunidad?: string;
  activa?: boolean;
}
