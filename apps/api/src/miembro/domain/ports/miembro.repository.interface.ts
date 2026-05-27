import { Miembro } from '../entities/miembro.entity';

/**
 * Interfaz que define el contrato para el acceso a datos relacionados con miembros de comunidades.
 */
export abstract class IMiembroRepository {
  /**
   * Busca un registro de membresía específico por su clave compuesta (PK).
   * @param id_usuario ID del usuario.
   * @param id_comunidad ID de la comunidad.
   * @returns La entidad Miembro o null.
   */
  public abstract buscarMiembroPorId(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<Miembro | null>;

  /**
   * Registra un nuevo miembro en la base de datos.
   */
  public abstract crearMiembro(miembro: Miembro): Promise<void>;

  /**
   * Actualiza un miembro existente en la base de datos.
   */
  public abstract actualizarMiembro(miembro: Miembro): Promise<void>;

  /**
   * Determina si un usuario específico tiene asignado el rol de 'Creador' en una comunidad.
   * @param id_usuario ID del usuario.
   * @param id_comunidad ID de la comunidad.
   * @returns True si es el creador.
   */
  public abstract esCreadorDeComunidad(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean>;

  /**
   * Valida si una comunidad existe en el sistema.
   * @param id_comunidad ID a buscar.
   * @returns True si existe.
   */
  public abstract existeComunidad(id_comunidad: string): Promise<boolean>;

  /**
   * Valida si un rol específico existe en la configuración del sistema.
   * @param id_rol ID del rol.
   * @returns True si existe.
   */
  public abstract existeRol(id_rol: string): Promise<boolean>;
}
