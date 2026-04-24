/**
 * Commands (Comandos) para el servicio de comunidades.
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
