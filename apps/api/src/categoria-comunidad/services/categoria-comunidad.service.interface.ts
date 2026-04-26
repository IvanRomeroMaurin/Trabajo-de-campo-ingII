import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Interfaz que define las operaciones para la gestión de categorías de comunidad.
 */
export abstract class ICategoriaComunidadService {
  /**
   * Obtiene el listado completo de categorías disponibles en el sistema.
   * Estas categorías se utilizan para clasificar las comunidades.
   *
   * @returns Una promesa que resuelve con un arreglo de categorías.
   */
  public abstract getCategorias(): Promise<CategoriaComunidad[]>;

  /**
   * Verifica la existencia de una categoría.
   *
   * @param id - ID de la categoría.
   * @returns Promesa con booleano.
   */
  public abstract existeCategoria(id: string): Promise<boolean>;
}
