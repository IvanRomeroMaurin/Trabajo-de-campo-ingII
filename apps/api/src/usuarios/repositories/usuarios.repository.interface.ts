import { Usuario } from '../models/usuario.entity';

/**
 * Interfaz de dominio para la creación de un nuevo usuario.
 */
export interface CrearUsuarioData {
  readonly nombre: string;
  readonly apellido: string;
  readonly email: string;
  readonly password_hash: string;
}

/**
 * Interfaz que define el contrato para el acceso a datos de Usuarios.
 * Sigue el patrón Repository para desacoplar el acceso a la base de datos de la lógica de negocio.
 */
export abstract class IUsuariosRepository {
  /**
   * Busca un usuario en la persistencia utilizando su dirección de correo electrónico.
   *
   * @param email - Correo electrónico del usuario.
   * @returns Una promesa con el usuario o null si no se encuentra.
   */
  public abstract buscarPorEmail(email: string): Promise<Usuario | null>;

  /**
   * Persiste un nuevo registro de usuario en la base de datos.
   *
   * @param data - Datos para la creación del usuario.
   * @returns Una promesa con el usuario creado y mapeado.
   */
  public abstract guardar(data: CrearUsuarioData): Promise<Usuario>;

  /**
   * Busca un usuario en la persistencia utilizando su ID único.
   *
   * @param id - Identificador único (UUID) del usuario.
   * @returns Una promesa con el usuario o null si no se encuentra.
   */
  public abstract buscarPorId(id: string): Promise<Usuario | null>;
}

