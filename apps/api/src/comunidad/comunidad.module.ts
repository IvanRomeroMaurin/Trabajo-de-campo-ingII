import { Module } from '@nestjs/common';
import { ComunidadService } from './comunidad.service';
import { ComunidadController } from './comunidad.controller';

/**
 * Módulo de Comunidades
 * Agrupa el controlador y el servicio de comunidades.
 * No necesita importar PrismaModule explícitamente porque está declarado como @Global().
 */
@Module({
  controllers: [ComunidadController],
  providers: [ComunidadService],
  exports: [ComunidadService],
})
export class ComunidadModule { }
