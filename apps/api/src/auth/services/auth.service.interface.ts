import type { IRespuestaAuth } from '@repo/types';

import { RegistrarUsuarioCommand } from './auth.commands';
import { UsuarioResponseDto } from '../../usuarios/dto/usuario-response.dto';

/**
 * Interfaz que define el contrato para el servicio de Autenticación.
 */
export abstract class IAuthService {
  /**
   * Valida las credenciales de un usuario.
   *
   * @param email - Correo electrónico del usuario.
   * @param pass - Contraseña plana.
   * @returns El usuario sin el hash de contraseña o null si las credenciales son inválidas.
   */
  public abstract validarUsuario(
    email: string,
    pass: string,
  ): Promise<UsuarioResponseDto | null>;

  /**
   * Inicia la sesión de un usuario generando un token JWT.
   *
   * @param usuario - El objeto del usuario autenticado (sin hash).
   * @returns La respuesta de autenticación con el token y datos del usuario.
   */
  public abstract iniciarSesion(usuario: UsuarioResponseDto): IRespuestaAuth;

  /**
   * Registra un nuevo usuario en el sistema.
   *
   * @param command - Datos para el registro del usuario.
   * @returns El usuario creado sin el hash de contraseña.
   */
  public abstract registrarUsuario(
    command: RegistrarUsuarioCommand,
  ): Promise<UsuarioResponseDto>;
}
