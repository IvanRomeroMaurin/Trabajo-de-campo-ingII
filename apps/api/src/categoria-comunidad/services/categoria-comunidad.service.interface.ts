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
   * Actualiza la descripción de una categoría existente.
   */
  public abstract actualizarDescripcion(
    id: string,
    descripcion: string,
  ): Promise<void>;

  /**
   * Desactiva una categoría.
   */
  public abstract desactivarCategoria(id: string): Promise<void>;

  /**
   * Verifica la existencia de una categoría.
   */
  public abstract existeCategoria(id: string): Promise<boolean>;

  /**
   * Valida que una categoría exista. Lanza CategoriaNotFoundException si no existe.
   * @param id ID de la categoría a validar.
   * @throws {CategoriaNotFoundException} Si la categoría no existe.
   */
  public abstract validarExistencia(id: string): Promise<void>;
}
