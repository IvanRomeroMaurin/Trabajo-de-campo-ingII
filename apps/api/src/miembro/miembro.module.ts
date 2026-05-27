import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DomainExceptionFilter } from '../common/filters/domain-exception.filter';
import { IMiembroService } from './application/services/miembro.service.interface';
import { MiembroService } from './application/services/miembro.service';
import { IMiembroRepository } from './domain/ports/miembro.repository.interface';
import { PrismaMiembroRepository } from './infrastructure/persistence/repositories/miembro.prisma.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Módulo encargado de gestionar la membresía y roles de los usuarios dentro de las comunidades.
 */
@Module({
  imports: [UsuariosModule, PrismaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: DomainExceptionFilter,
    },
    {
      provide: IMiembroService,
      useClass: MiembroService,
    },
    {
      provide: IMiembroRepository,
      useClass: PrismaMiembroRepository,
    },
  ],
  exports: [IMiembroService],
})
export class MiembroModule {}
