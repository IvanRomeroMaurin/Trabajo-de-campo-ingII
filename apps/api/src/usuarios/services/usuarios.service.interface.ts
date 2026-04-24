import { CrearUsuarioCommand } from './usuarios.commands';
import { Usuario } from '../models/usuario.entity';

/**
 * Interfaz que define el contrato para el servicio de Usuarios.
 * Centraliza las operaciones de negocio relacionadas con la gestión de usuarios.
 */
export abstract class UsuariosService {
  /**
   * Busca un usuario registrado en el sistema utilizando su dirección de correo electrónico.
   *
   * @param email - Correo electrónico del usuario a buscar.
   * @returns Una promesa que resuelve con el usuario encontrado o null si no existe.
   */
  public abstract buscarPorCorreo(email: string): Promise<Usuario | null>;

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param data - Datos necesarios para la creación del usuario (comandos).
   * @returns Una promesa que resuelve con los datos del usuario recién creado.
   */
  public abstract crearUsuario(data: CrearUsuarioCommand): Promise<Usuario>;

  /**
   * Busca un usuario registrado utilizando su identificador único (UUID).
   *
   * @param id - Identificador único del usuario.
   * @returns Una promesa que resuelve con el usuario encontrado o null si no existe.
   */
  public abstract buscarPorId(id: string): Promise<Usuario | null>;
}
