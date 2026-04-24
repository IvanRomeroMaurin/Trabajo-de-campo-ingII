import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Interfaz que define el contrato para el acceso a datos de categorías de comunidades.
 */
export abstract class CategoriaComunidadRepository {
  /**
   * Obtiene todas las categorías de comunidades que se encuentran en estado activo.
   *
   * @returns Una promesa con el listado de categorías.
   */
  public abstract buscarTodasActivas(): Promise<CategoriaComunidad[]>;

  /**
   * Verifica la existencia de una categoría específica en la base de datos.
   *
   * @param id - Identificador único de la categoría.
   * @returns True si la categoría existe, false en caso contrario.
   */
  public abstract existe(id: string): Promise<boolean>;
}

