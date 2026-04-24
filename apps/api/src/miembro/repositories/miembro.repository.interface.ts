import { Miembro } from '../models/miembro.entity';

/**
 * Datos necesarios para la creación de un nuevo miembro.
 */
export interface CrearMiembroData {
  readonly id_usuario: string;
  readonly id_comunidad: string;
  readonly id_rol_comunidad: string;
  readonly fecha_ingreso: Date;
}

/**
 * Datos permitidos para la actualización de un miembro existente.
 */
export interface ActualizarMiembroData {
  readonly id_rol_comunidad?: string;
  readonly fecha_actualizacion: Date;
}

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
  public abstract buscarMiembro(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<Miembro | null>;

  /**
   * Registra una nueva unión de un usuario a una comunidad.
   *
   * @param data - Datos para la creación del miembro.
   * @returns Una promesa que se resuelve al completar la creación.
   */
  public abstract crearMiembro(data: CrearMiembroData): Promise<void>;

  /**
   * Modifica los atributos de una membresía existente (ej. cambio de rol o actualización de actividad).
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @param data - Campos a actualizar.
   * @returns Una promesa que se resuelve al completar la actualización.
   */
  public abstract actualizarMiembro(
    id_usuario: string,
    id_comunidad: string,
    data: ActualizarMiembroData,
  ): Promise<void>;

  /**
   * Determina si un usuario específico tiene asignado el rol de 'Creador' en una comunidad.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns True si el usuario es el creador.
   */
  public abstract esCreador(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean>;

  /**
   * Valida si una comunidad existe en la persistencia.
   * // TODO: mover a ComunidadService cuando se resuelva la dependencia circular.
   *
   * @param id_comunidad - ID a verificar.
   * @returns True si existe.
   */
  public abstract existeComunidad(id_comunidad: string): Promise<boolean>;

  /**
   * Valida si un rol específico existe en el sistema.

   *
   * @param id_rol - ID del rol a verificar.
   * @returns True si existe.
   */
  public abstract existeRol(id_rol: string): Promise<boolean>;
}

