import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service.interface';
import { AuthServiceImpl } from './services/auth.service';

import { AuthController } from './controllers/auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { EstrategiaLocal } from './estrategias/estrategia-local';
import { EstrategiaJwt } from './estrategias/estrategia-jwt';

/**
 * Módulo de Autenticación
 * Actúa como la unidad central que cohesiona y agrupa todo lo relacionado con la seguridad.
 * Aquí sucede la "magia" de configuración: usa ConfigService para leer JWT_SECRET de forma
 * garantizada y consistente tanto para firmar como para verificar los tokens JWT.
 */
@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // 7 días es un balance aceptable para un MVP. TODO: Implementar Refresh Tokens.
      }),
    }),
  ],
  providers: [
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
    EstrategiaLocal,
    EstrategiaJwt,
  ],
  controllers: [AuthController],
})

export class AuthModule {}
