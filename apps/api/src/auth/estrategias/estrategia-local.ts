import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUsuario } from '@repo/types';

/**
 * Estrategia de Autenticación Local
 * Hereda de la estrategia de Passport tradicional. Es llamada tácitamente cuando decoramos la 
 * ruta de login con el @UseGuards('local').
 */
@Injectable()
export class EstrategiaLocal extends PassportStrategy(Strategy) {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
    this.authService = authService;
  }

  /**
   * Función que es ejecutada en cadena por Passport; se invoca con las properties decodificadas de la petición.
   * Retornar un error de tipo Unauthorized si el password está mal, sino devuelve al objeto usuario.
   */
  public async validate(email: string, pass: string): Promise<IUsuario> {
    const usuario = await this.authService.validarUsuario(email, pass);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    if (!usuario.activa) {
      throw new UnauthorizedException('Tu cuenta se encuentra suspendida o dada de baja');
    }
    return usuario;
  }
}
