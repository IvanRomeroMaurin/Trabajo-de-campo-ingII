import { categoria_comunidad } from '@prisma/client';

/**
 * Interfaz que define las operaciones para la gestión de categorías de comunidad.
 */
export abstract class CategoriaComunidadService {
  /**
   * Obtiene el listado completo de categorías disponibles en el sistema.
   * Estas categorías se utilizan para clasificar las comunidades.
   *
   * @returns Una promesa que resuelve con un arreglo de categorías.
   */
  abstract getCategorias(): Promise<categoria_comunidad[]>;
}
