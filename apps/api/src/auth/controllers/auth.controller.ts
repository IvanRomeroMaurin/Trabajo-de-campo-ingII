import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IAuthService } from '../services/auth.service.interface';
import { RegistrarUsuarioDto } from '../dto/registrar-usuario.dto';

import type { IRespuestaAuth } from '@repo/types';
import { UsuarioResponseDto } from '../../usuarios/dto/usuario-response.dto';

/**
 * Controlador de Autenticación
 * Maneja las rutas principales para el registro y el inicio de sesión de usuarios.
 */
@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: IAuthService) {}

  /**
   * Registra un nuevo usuario en la plataforma.
   * @param registrarUsuarioDto Objeto con los datos del usuario (nombre, apellido, email, password)
   * @returns El usuario recién creado guardado en la base de datos.
   */
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente.',
    type: UsuarioResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'El correo electrónico ya está en uso.',
  })
  @Post('registrar')
  public async registrar(
    @Body() registrarUsuarioDto: RegistrarUsuarioDto,
  ): Promise<UsuarioResponseDto> {
    return this.authService.registrarUsuario({
      nombre: registrarUsuarioDto.nombre,
      apellido: registrarUsuarioDto.apellido,
      email: registrarUsuarioDto.email,
      password: registrarUsuarioDto.password,
    });
  }

  /**
   * Autentica a un usuario usando la estrategia local (verificando la contraseña con bcrypt).
   * @param req Objeto Request de Express que inyecta el usuario desencriptado al pasar el Guard.
   * @returns Un JWT de acceso (access_token) y la información pública del usuario.
   */
  @ApiOperation({ summary: 'Inicia sesión con email y contraseña' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@ejemplo.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sesión iniciada. Devuelve el JWT.',
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('iniciar-sesion')
  public iniciarSesion(
    @Req() req: { user: UsuarioResponseDto },
  ): IRespuestaAuth {
    // El AuthGuard('local') valida las credenciales y añade el usuario a req.user
    return this.authService.iniciarSesion(req.user);
  }

  /**
   * Endpoint protegido para probar que un token JWT es válido.
   * Si el guard de JWT valida la firma correctamente, extrae el perfil y lo devuelve.
   * @param req Objeto Request de Express donde el guard inyectó al usuario validado.
   */
  @ApiOperation({ summary: 'Obtiene el perfil del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Datos del perfil.',
    type: UsuarioResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('perfil')
  public obtenerPerfil(
    @Req() req: { user: UsuarioResponseDto },
  ): UsuarioResponseDto {
    return req.user;
  }
}
