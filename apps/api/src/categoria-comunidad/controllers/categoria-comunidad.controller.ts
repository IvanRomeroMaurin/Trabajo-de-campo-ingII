import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ICategoriaComunidadService } from '../services/categoria-comunidad.service.interface';
import { CategoriaComunidadResponseDto } from '../dto/categoria-comunidad-response.dto';

@ApiTags('Categorías de Comunidad')
@Controller('categorias-comunidad')
export class CategoriaComunidadController {
  public constructor(private readonly service: ICategoriaComunidadService) {}

  @ApiOperation({ summary: 'Obtiene todas las categorías de comunidades' })
  @ApiResponse({
    status: 200,
    description: 'Listado de categorías.',
    type: [CategoriaComunidadResponseDto],
  })
  @Get()
  public async getCategorias(): Promise<CategoriaComunidadResponseDto[]> {
    const categorias = await this.service.getCategorias();
    return categorias.map((c) => CategoriaComunidadResponseDto.fromEntity(c));
  }
}
