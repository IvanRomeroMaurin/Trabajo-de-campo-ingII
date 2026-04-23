import { Injectable } from '@nestjs/common';
import { categoria_comunidad } from '@prisma/client';
import { CategoriaComunidadRepository } from '../repositories/categoria-comunidad.repository.interface';
import { CategoriaComunidadService as ICategoriaComunidadService } from './categoria-comunidad.service.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Implementación del servicio de categorías de comunidad.
 */
@Injectable()
export class CategoriaComunidadService implements ICategoriaComunidadService {
  public constructor(private readonly repository: CategoriaComunidadRepository) {}

  /**
   * Obtiene todas las categorías activas a través del repositorio.
   *
   * @returns Listado de categorías.
   */
  public async getCategorias(): Promise<CategoriaComunidad[]> {
    return this.repository.buscarTodasActivas();
  }
}
