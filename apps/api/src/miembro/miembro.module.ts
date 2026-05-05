import { Module } from '@nestjs/common';
import { IMiembroService } from './services/miembro.service.interface';
import { MiembroService } from './services/miembro.service';

import { IMiembroRepository } from './infrastructure/miembro.repository.interface';
import { PrismaMiembroRepository } from './repositories/miembro.prisma.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';

/**
 * Módulo encargado de gestionar la membresía y roles de los usuarios dentro de las comunidades.
 */
@Module({
  imports: [UsuariosModule],
  providers: [
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
