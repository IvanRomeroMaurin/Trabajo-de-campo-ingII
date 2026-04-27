import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Interfaz que define las operaciones para la gestión de categorías de comunidad.
 */
export abstract class ICategoriaComunidadService {
  /**
   * Obtiene el listado completo de categorías disponibles en el sistema.
   */
  public abstract getCategorias(): Promise<CategoriaComunidad[]>;

  /**
   * Crea una nueva categoría.
   */
  public abstract crear(descripcion: string): Promise<CategoriaComunidad>;

  /**
   * Actualiza una categoría existente.
   */
  public abstract actualizar(id: string, descripcion: string): Promise<void>;

  /**
   * Desactiva una categoría.
   */
  public abstract desactivar(id: string): Promise<void>;

  /**
   * Verifica la existencia de una categoría.
   */
  public abstract existeCategoria(id: string): Promise<boolean>;
}
