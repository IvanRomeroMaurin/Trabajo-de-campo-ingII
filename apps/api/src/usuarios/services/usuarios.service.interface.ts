import { IUsuario } from '@repo/types';
import { CrearUsuarioCommand } from './usuarios.commands';

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
  abstract buscarPorCorreo(email: string): Promise<IUsuario | null>;

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param data - Datos necesarios para la creación del usuario (comandos).
   * @returns Una promesa que resuelve con los datos del usuario recién creado.
   */
  abstract crearUsuario(data: CrearUsuarioCommand): Promise<IUsuario>;

  /**
   * Busca un usuario registrado utilizando su identificador único (UUID).
   *
   * @param id - Identificador único del usuario.
   * @returns Una promesa que resuelve con el usuario encontrado o null si no existe.
   */
  abstract buscarPorId(id: string): Promise<IUsuario | null>;
}
