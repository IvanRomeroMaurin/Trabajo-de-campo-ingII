import { Injectable, ConflictException } from '@nestjs/common';
import { IUsuariosService } from '../../usuarios/services/usuarios.service.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { IRespuestaAuth } from '@repo/types';

import { IAuthService } from './auth.service.interface';
import { RegistrarUsuarioCommand } from './auth.commands';
import { UsuarioResponseDto } from '../../usuarios/dto/usuario-response.dto';

/**
 * Servicio de Autenticación
 * Contiene la lógica de negocio responsable del encriptado de claves, generación
 * de tokens JWT, creación de usuarios y validación de las credenciales de entrada.
 */
@Injectable()
export class AuthService implements IAuthService {
  public constructor(
    private readonly usuariosService: IUsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida si la contraseña plana de un usuario coincide de forma segura con el Hash de la DB.
   * @param email Correo electrónico a buscar en el sistema.
   * @param pass Contraseña plana insertada por el cliente de forma cruda.
   * @returns El objeto del usuario (sin el password_hash) en caso válido, o `null` si hay error.
   */
  public async validarUsuario(
    email: string,
    pass: string,
  ): Promise<UsuarioResponseDto | null> {
    const usuario = await this.usuariosService.buscarPorCorreo(email);
    if (
      usuario &&
      usuario.password_hash &&
      (await bcrypt.compare(pass, usuario.password_hash))
    ) {
      return UsuarioResponseDto.fromEntity(usuario);
    }
    return null;
  }

  /**
   * Registra el inicio de sesion (en memoria) y genera el token JWT utilizando el id y el correo.
   * @param usuario El objeto usuario (sin hash) validado por la Estrategia Local anteriormente.
   * @returns Un token JWT con la expiración que haya sido configurada en la importación.
   */
  public iniciarSesion(usuario: UsuarioResponseDto): IRespuestaAuth {
    const payload = {
      email: usuario.email,
      sub: usuario.id_usuario,
    };
    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    };
  }

  /**
   * Transacciona el registro de usuario: se encarga de cifrar la contraseña con bcrypt
   * antes de contactar a Prisma. Verificará de antemano que el correo no esté ocupado.
   * @param command Los datos recolectados del request (nombre, email, pass).
   * @throws {ConflictException} Si el correo electrónico ya existía en la DB.
   * @returns El usuario creado sin el hash de contraseña.
   */
  public async registrarUsuario(
    command: RegistrarUsuarioCommand,
  ): Promise<UsuarioResponseDto> {
    const usuarioExistente = await this.usuariosService.buscarPorCorreo(
      command.email,
    );

    if (usuarioExistente) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(command.password, saltRounds);

    const nuevoUsuario = await this.usuariosService.crearUsuario({
      nombre: command.nombre,
      apellido: command.apellido,
      email: command.email,
      password_hash: passwordHash,
    });

    return UsuarioResponseDto.fromEntity(nuevoUsuario);
  }
}
