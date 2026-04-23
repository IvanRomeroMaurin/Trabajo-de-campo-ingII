import { Controller, Get } from '@nestjs/common';
import { CategoriaComunidadService } from './categoria-comunidad.service';
import { categoria_comunidad } from '@prisma/client';

@Controller('comunidades')
export class CategoriaComunidadController {
  constructor(
    private readonly categoriaComunidadService: CategoriaComunidadService,
  ) {}

  /**
   * Obtiene la lista de categorías para comunidades.
   * @route GET /comunidades/categorias
   * @access Público
   */
  @Get('categorias')
  public async getCategorias(): Promise<categoria_comunidad[]> {
    return this.categoriaComunidadService.getCategorias();
  }
}
