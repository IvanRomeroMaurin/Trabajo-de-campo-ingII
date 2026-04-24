import { Module } from '@nestjs/common';
import { MiembroService } from './services/miembro.service.interface';
import { MiembroServiceImpl } from './services/miembro.service';


import { MiembroRepository } from './repositories/miembro.repository.interface';
import { PrismaMiembroRepository } from './repositories/miembro.prisma.repository';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  providers: [

    {
      provide: MiembroService,
      useClass: MiembroServiceImpl,
    },
    {
      provide: MiembroRepository,
      useClass: PrismaMiembroRepository,
    },
  ],
  exports: [MiembroService],
})

export class MiembroModule {}
