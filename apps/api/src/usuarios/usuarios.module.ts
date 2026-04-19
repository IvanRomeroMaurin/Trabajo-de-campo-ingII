import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Módulo de Usuarios
 * Empaqueta el Servicio de Usuarios para mantener organizado el código.
 * Gracias a que incluye el array `exports: [UsuariosService]`, permite que cualquier
 * otro módulo en NestJS (como el AuthModule) pueda importar este módulo y usar
 * las búsquedas de usuarios automáticamente.
 */
@Module({
  imports: [PrismaModule],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
