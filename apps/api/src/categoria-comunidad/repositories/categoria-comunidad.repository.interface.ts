import { categoria_comunidad } from '@prisma/client';

/**
 * Interfaz que define el contrato para el acceso a datos de categorías de comunidades.
 */
export abstract class CategoriaComunidadRepository {
  /**
   * Obtiene todas las categorías de comunidades que se encuentran en estado activo.
   *
   * @returns Una promesa con el listado de categorías.
   */
  abstract buscarTodasActivas(): Promise<categoria_comunidad[]>;

  /**
   * Verifica la existencia de una categoría específica en la base de datos.
   *
   * @param id - Identificador único de la categoría.
   * @returns True si la categoría existe, false en caso contrario.
   */
  abstract existe(id: string): Promise<boolean>;
}
