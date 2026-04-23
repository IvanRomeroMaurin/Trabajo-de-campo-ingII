import { Controller, Get } from '@nestjs/common';
import { CategoriaComunidadService } from './services/categoria-comunidad.service.interface';
import { categoria_comunidad } from '@prisma/client';

@Controller('categorias-comunidad')
export class CategoriaComunidadController {
  constructor(private readonly service: CategoriaComunidadService) {}

  @Get()
  public async getCategorias(): Promise<categoria_comunidad[]> {
    return this.service.getCategorias();
  }
}
