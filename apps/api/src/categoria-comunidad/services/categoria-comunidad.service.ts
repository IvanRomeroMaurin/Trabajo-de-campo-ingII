import { Injectable } from '@nestjs/common';

import { CategoriaComunidadRepository } from '../repositories/categoria-comunidad.repository.interface';
import { CategoriaComunidadService as ICategoriaComunidadService } from './categoria-comunidad.service.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Implementación del servicio de categorías de comunidad.
 */
@Injectable()
export class CategoriaComunidadServiceImpl implements ICategoriaComunidadService {

  public constructor(
    private readonly repository: CategoriaComunidadRepository,
  ) { }

  /**
   * Obtiene todas las categorías activas a través del repositorio.
   *
   * @returns Listado de categorías.
   */
  public async getCategorias(): Promise<CategoriaComunidad[]> {
    return this.repository.buscarTodasActivas();
  }

  /**
   * Verifica la existencia de una categoría.
   *
   * @param id - ID de la categoría.
   * @returns Promesa con booleano.
   */
  public async existeCategoria(id: string): Promise<boolean> {
    return this.repository.existe(id);
  }
}

