import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';

/**
 * Servicio de Autenticación
 * Contiene la lógica de negocio responsable del encriptado de claves, generación
 * de tokens JWT, creación de usuarios y validación de las credenciales de entrada.
 */
@Injectable()
export class AuthService {
  private readonly usuariosService: UsuariosService;
  private readonly jwtService: JwtService;

  constructor(usuariosService: UsuariosService, jwtService: JwtService) {
    this.usuariosService = usuariosService;
    this.jwtService = jwtService;
  }

  /**
   * Valida si la contraseña plana de un usuario coincide de forma segura con el Hash de la DB.
   * @param email Correo electrónico a buscar en el sistema.
   * @param pass Contraseña plana insertada por el cliente de forma cruda.
   * @returns El archivo del usuario completo (sin el password_hash) en caso válido, o `null` si hay error.
   */
  public async validarUsuario(email: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.buscarPorCorreo(email);
    if (usuario && await bcrypt.compare(pass, usuario.password_hash)) {
      const { password_hash, ...result } = usuario;
      return result;
    }
    return null;
  }

  /**
   * Registra el inicio de sesion (en memoria) y genera el token JWT utilizando el id y el correo.
   * @param usuario El objeto usuario validado por la Estrategia Local anteriormente.
   * @returns Un token JWT con la expiración que haya sido configurada en la importación.
   */
  public async iniciarSesion(usuario: any): Promise<{ access_token: string; usuario: any }> {
    const payload = { email: usuario.email, sub: usuario.id_usuario.toString() };
    return {
      access_token: this.jwtService.sign(payload),
      usuario,
    };
  }

  /**
   * Transacciona el registro de usuario: se encarga de cifrar la contraseña con bcrypt 
   * antes de contactar a Prisma. Verificará de antemano que el correo no esté ocupado.
   * @param dto Los datos recolectados del request (nombre, email, pass).
   * @throws {ConflictException} Si el correo electrónico ya existía en la DB.
   */
  public async registrarUsuario(dto: RegistrarUsuarioDto): Promise<any> {
    const usuarioExistente = await this.usuariosService.buscarPorCorreo(dto.email);
    
    if (usuarioExistente) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    const nuevoUsuario = await this.usuariosService.crearUsuario({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      password_hash: passwordHash,
      activa: true,
    });

    const { password_hash, ...usuarioRestante } = nuevoUsuario;
    return usuarioRestante;
  }
}
