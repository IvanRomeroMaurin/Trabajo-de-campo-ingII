import { Controller, Get } from '@nestjs/common';
import { CategoriaComunidadService } from './services/categoria-comunidad.service.interface';
import { CategoriaComunidad } from './models/categoria-comunidad.entity';

@Controller('categorias-comunidad')
export class CategoriaComunidadController {
  public constructor(private readonly service: CategoriaComunidadService) {}

  @Get()
  public async getCategorias(): Promise<CategoriaComunidad[]> {
    return this.service.getCategorias();
  }
}
