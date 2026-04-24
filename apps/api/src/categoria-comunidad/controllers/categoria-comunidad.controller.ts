import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriaComunidadService } from '../services/categoria-comunidad.service.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

@ApiTags('Categorías de Comunidad')
@Controller('categorias-comunidad')
export class CategoriaComunidadController {
  public constructor(private readonly service: CategoriaComunidadService) {}

  @ApiOperation({ summary: 'Obtiene todas las categorías de comunidades' })
  @ApiResponse({
    status: 200,
    description: 'Listado de categorías.',
    type: [CategoriaComunidad],
  })
  @Get()
  public async getCategorias(): Promise<CategoriaComunidad[]> {
    return this.service.getCategorias();
  }
}
