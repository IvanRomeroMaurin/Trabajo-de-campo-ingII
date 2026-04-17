import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '@repo/types';

/**
 * Estrategia de Validación de Token JWT
 * Responsable de interceptar las peticiones a rutas protegidas verificando en tiempo real
 * la legalidad de la cabecera / header 'Authorization: Bearer [TOKEN]'.
 * Usa ConfigService para garantizar que el secreto sea el mismo que usó JwtModule para firmar.
 */
@Injectable()
export class EstrategiaJwt extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  /**
   * Verifica individualmente el payload y le avisa inmediatamente a Nest si el token expiró.
   * Lo que devuelva esta función, se asignará sin problemas en el objeto `req.user` de los Controladores.
   * @param payload Contenido desencriptado de las tripas del Token.
   */
  public async validate(payload: IJwtPayload): Promise<{ id_usuario: number; email: string }> {
    return { id_usuario: parseInt(payload.sub, 10), email: payload.email };
  }
}
