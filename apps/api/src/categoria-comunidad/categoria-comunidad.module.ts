import { Module } from '@nestjs/common';
import { CategoriaComunidadController } from './controllers/categoria-comunidad.controller';
import { CategoriaComunidadService } from './services/categoria-comunidad.service.interface';
import { CategoriaComunidadServiceImpl } from './services/categoria-comunidad.service';

import { CategoriaComunidadRepository } from './repositories/categoria-comunidad.repository.interface';
import { PrismaCategoriaComunidadRepository } from './repositories/categoria-comunidad.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaComunidadController],
  providers: [
    {
      provide: CategoriaComunidadService,
      useClass: CategoriaComunidadServiceImpl,
    },
    {
      provide: CategoriaComunidadRepository,
      useClass: PrismaCategoriaComunidadRepository,
    },
  ],
  exports: [CategoriaComunidadService],
})

export class CategoriaComunidadModule {}
