import { Module } from '@nestjs/common';
import { CategoriaComunidadService } from './categoria-comunidad.service';
import { CategoriaComunidadController } from './categoria-comunidad.controller';

@Module({
  controllers: [CategoriaComunidadController],
  providers: [CategoriaComunidadService],
  exports: [CategoriaComunidadService],
})
export class CategoriaComunidadModule {}
