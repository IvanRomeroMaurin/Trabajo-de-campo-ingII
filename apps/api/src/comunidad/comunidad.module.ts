import { Module } from '@nestjs/common';
import { IComunidadService } from './services/comunidad.service.interface';
import { ComunidadService } from './services/comunidad.service';
import { ComunidadController } from './controllers/comunidad.controller';
import { MiembroModule } from '../miembro/miembro.module';
import { CategoriaComunidadModule } from '../categoria-comunidad/categoria-comunidad.module';
import { IComunidadRepository } from './infrastructure/comunidad.repository.interface';
import { PrismaComunidadRepository } from './repositories/comunidad.prisma.repository';
import { ComunidadOwnerGuard } from '../common/guards/comunidad-owner.guard';

@Module({
  imports: [MiembroModule, CategoriaComunidadModule],
  controllers: [ComunidadController],
  providers: [
    {
      provide: IComunidadService,
      useClass: ComunidadService,
    },
    {
      provide: IComunidadRepository,
      useClass: PrismaComunidadRepository,
    },
    ComunidadOwnerGuard,
  ],
  exports: [IComunidadService, ComunidadOwnerGuard, MiembroModule],
})
export class ComunidadModule { }

