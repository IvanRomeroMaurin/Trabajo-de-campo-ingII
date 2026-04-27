import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Interfaz que define el contrato para el acceso a datos de categorías de comunidades.
 * Permite desacoplar el dominio de la implementación técnica (Prisma, memoria, etc.).
 */
export abstract class ICategoriaComunidadRepository {
  /**
   * Obtiene todas las categorías de comunidades que se encuentran en estado activo.
   * @returns Listado de categorías activas.
   */
  public abstract buscarCategoriasActivas(): Promise<CategoriaComunidad[]>;

  /**
   * Busca una categoría específica por su identificador único.
   * @param id ID de la categoría.
   * @returns La entidad encontrada o null.
   */
  public abstract buscarCategoriaPorId(id: string): Promise<CategoriaComunidad | null>;

  /**
   * Registra una nueva categoría o actualiza una existente (patrón Upsert).
   * @param categoria Entidad a persistir.
   */
  public abstract guardarCategoria(categoria: CategoriaComunidad): Promise<void>;

  /**
   * Verifica si una categoría existe en el sistema.
   * @param id ID de la categoría.
   * @returns True si existe.
   */
  public abstract existeCategoria(id: string): Promise<boolean>;
}

