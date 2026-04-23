/**
 * Interfaz que define el contrato para el acceso a datos relacionados con miembros de comunidades.
 * Centraliza las consultas de persistencia y validaciones de existencia para el módulo Miembro.
 */
export abstract class MiembroRepository {
  /**
   * Busca un registro de membresía específico.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns Una promesa con el registro de membresía o null.
   */
  abstract buscarMiembro(id_usuario: string, id_comunidad: string): Promise<any>;

  /**
   * Registra una nueva unión de un usuario a una comunidad.
   *
   * @param data - Objeto con los IDs de usuario, comunidad, rol y fecha de ingreso.
   * @returns Una promesa que se resuelve al completar la creación.
   */
  abstract crearMiembro(data: {
    id_usuario: string;
    id_comunidad: string;
    id_rol_comunidad: string;
    fecha_ingreso: Date;
  }): Promise<void>;

  /**
   * Modifica los atributos de una membresía existente (ej. cambio de rol o actualización de actividad).
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @param data - Campos a actualizar.
   * @returns Una promesa que se resuelve al completar la actualización.
   */
  abstract actualizarMiembro(
    id_usuario: string,
    id_comunidad: string,
    data: {
      id_rol_comunidad?: string;
      fecha_actualizacion: Date;
    },
  ): Promise<void>;

  /**
   * Determina si un usuario específico tiene asignado el rol de 'Creador' en una comunidad.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns True si el usuario es el creador.
   */
  abstract esCreador(id_usuario: string, id_comunidad: string): Promise<boolean>;

  /**
   * Valida si un usuario existe en la persistencia.
   *
   * @param id_usuario - ID a verificar.
   * @returns True si existe.
   */
  abstract existeUsuario(id_usuario: string): Promise<boolean>;

  /**
   * Valida si una comunidad existe en la persistencia.
   *
   * @param id_comunidad - ID a verificar.
   * @returns True si existe.
   */
  abstract existeComunidad(id_comunidad: string): Promise<boolean>;

  /**
   * Valida si un rol específico existe en el sistema.
   *
   * @param id_rol - ID del rol a verificar.
   * @returns True si existe.
   */
  abstract existeRol(id_rol: string): Promise<boolean>;
}
