import { Usuario } from '../models/usuario.entity';

/**
 * Interfaz que define el contrato para el acceso a datos de Usuarios.
 * Centraliza la persistencia y recuperación de identidades, permitiendo el desacoplamiento técnico.
 */
export abstract class IUsuariosRepository {
  /**
   * Localiza un usuario por su dirección de email única.
   * @param email Correo electrónico.
   * @returns Entidad Usuario o null.
   */
  public abstract buscarUsuarioPorEmail(email: string): Promise<Usuario | null>;

  /**
   * Persiste un nuevo usuario en la base de datos.
   */
  public abstract crearUsuario(usuario: Usuario): Promise<Usuario>;

  /**
   * Actualiza un usuario existente en la base de datos.
   */
  public abstract actualizarUsuario(usuario: Usuario): Promise<Usuario>;

  /**
   * Localiza un usuario por su identificador único (UUID).
   * @param id Identificador.
   * @returns Entidad Usuario o null.
   */
  public abstract buscarUsuarioPorId(id: string): Promise<Usuario | null>;
}

