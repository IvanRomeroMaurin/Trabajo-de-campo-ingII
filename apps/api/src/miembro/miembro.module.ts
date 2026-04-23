import { Module } from '@nestjs/common';
import { MiembroService } from './services/miembro.service.interface';
import { MiembroService as MiembroServiceImpl } from './services/miembro.service';
import { MiembroRepository } from './repositories/miembro.repository.interface';
import { PrismaMiembroRepository } from './repositories/miembro.prisma.repository';

@Module({
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
  exports: [MiembroService, MiembroRepository],
})
export class MiembroModule {}
