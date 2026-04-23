import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload, IUsuario } from '@repo/types';
import { UsuariosService } from '../../usuarios/usuarios.service';

/**
 * Estrategia de Validación de Token JWT
 * Responsable de interceptar las peticiones a rutas protegidas verificando en tiempo real
 * la legalidad de la cabecera / header 'Authorization: Bearer [TOKEN]'.
 * Usa ConfigService para garantizar que el secreto sea el mismo que usó JwtModule para firmar.
 */
@Injectable()
export class EstrategiaJwt extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usuariosService: UsuariosService,
  ) {
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
  public async validate(payload: IJwtPayload): Promise<IUsuario> {
    const usuario = await this.usuariosService.buscarPorId(payload.sub);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Convertimos password_hash a omitido
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...res } = usuario;

    return res as unknown as IUsuario;
  }
}
