import { Module } from '@nestjs/common';
import { CategoriaComunidadController } from './controllers/categoria-comunidad.controller';
import { ICategoriaComunidadService } from './services/categoria-comunidad.service.interface';
import { CategoriaComunidadService } from './services/categoria-comunidad.service';

import { ICategoriaComunidadRepository } from './infrastructure/categoria-comunidad.repository.interface';
import { PrismaCategoriaComunidadRepository } from './repositories/categoria-comunidad.prisma.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriaNotFoundException } from './domain/exceptions';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaComunidadController],
  providers: [
    {
      provide: ICategoriaComunidadService,
      useClass: CategoriaComunidadService,
    },
    {
      provide: ICategoriaComunidadRepository,
      useClass: PrismaCategoriaComunidadRepository,
    },
  ],
  exports: [ICategoriaComunidadService, CategoriaNotFoundException],
})
export class CategoriaComunidadModule {}
