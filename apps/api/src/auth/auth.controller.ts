import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';
import { IUsuario, IRespuestaAuth } from '@repo/types';

/**
 * Controlador de Autenticación
 * Maneja las rutas principales para el registro y el inicio de sesión de usuarios.
 */
@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Registra un nuevo usuario en la plataforma.
   * @param registrarUsuarioDto Objeto con los datos del usuario (nombre, apellido, email, password)
   * @returns El usuario recién creado guardado en la base de datos.
   */
  @Post('registrar')
  public async registrar(
    @Body() registrarUsuarioDto: RegistrarUsuarioDto,
  ): Promise<IUsuario> {
    return this.authService.registrarUsuario(registrarUsuarioDto);
  }

  /**
   * Autentica a un usuario usando la estrategia local (verificando la contraseña con bcrypt).
   * @param req Objeto Request de Express que inyecta el usuario desencriptado al pasar el Guard.
   * @param iniciarSesionDto DTO del inicio de sesión (email y contraseña)
   * @returns Un JWT de acceso (access_token) y la información pública del usuario.
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('iniciar-sesion')
  public async iniciarSesion(
    @Request() req: { user: IUsuario },
  ): Promise<IRespuestaAuth> {
    // El AuthGuard('local') valida las credenciales y añade el usuario a req.user
    return this.authService.iniciarSesion(req.user);
  }

  /**
   * Endpoint protegido para probar que un token JWT es válido.
   * Si el guard de JWT valida la firma correctamente, extrae el perfil y lo devuelve.
   * @param req Objeto Request de Express donde el guard inyectó al usuario validado.
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  public obtenerPerfil(
    @Request() req: { user: Partial<IUsuario> },
  ): Partial<IUsuario> {
    return req.user;
  }
}
