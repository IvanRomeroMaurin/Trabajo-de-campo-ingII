import { Module } from '@nestjs/common';
import { ComunidadService } from './services/comunidad.service.interface';
import { ComunidadService as ComunidadServiceImpl } from './services/comunidad.service';
import { ComunidadController } from './comunidad.controller';
import { MiembroModule } from '../miembro/miembro.module';
import { CategoriaComunidadModule } from '../categoria-comunidad/categoria-comunidad.module';
import { ComunidadRepository } from './repositories/comunidad.repository.interface';
import { PrismaComunidadRepository } from './repositories/comunidad.prisma.repository';

@Module({
  imports: [MiembroModule, CategoriaComunidadModule],
  controllers: [ComunidadController],
  providers: [
    {
      provide: ComunidadService,
      useClass: ComunidadServiceImpl,
    },
    {
      provide: ComunidadRepository,
      useClass: PrismaComunidadRepository,
    },
  ],
  exports: [ComunidadService, ComunidadRepository],
})
export class ComunidadModule {}
