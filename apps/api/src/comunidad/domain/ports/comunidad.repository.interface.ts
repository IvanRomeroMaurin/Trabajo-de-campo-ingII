import { Comunidad } from '../entities/comunidad.entity';

/**
 * Puerto (Interfaz) para la persistencia de Comunidades.
 * Define el contrato que cualquier adaptador de persistencia debe implementar.
 * Mantiene la lógica de negocio desacoplada de la tecnología de base de datos.
 */
export abstract class IComunidadRepository {
  /**
   * Persiste una nueva comunidad en la base de datos.
   */
  public abstract crearComunidad(comunidad: Comunidad): Promise<Comunidad>;

  /**
   * Actualiza una comunidad existente en la base de datos.
   */
  public abstract actualizarComunidad(comunidad: Comunidad): Promise<Comunidad>;

  /**
   * Busca una comunidad por su identificador único primario.
   *
   * @param id_comunidad - UUID de la comunidad.
   * @returns La comunidad encontrada o null si no existe.
   */
  public abstract buscarComunidadPorId(id_comunidad: string): Promise<Comunidad | null>;

  /**
   * Busca una comunidad por su slug (URL friendly name).
   *
   * @param slug - El slug único de la comunidad.
   * @returns La comunidad encontrada con su categoría o null.
   */
  public abstract buscarComunidadPorSlug(slug: string): Promise<Comunidad | null>;

  /**
   * Recupera todas las comunidades que están marcadas como activas.
   *
   * @returns Lista de comunidades activas ordenadas por fecha de creación descendente.
   */
  public abstract buscarComunidadesActivas(): Promise<Comunidad[]>;

  /**
   * Obtiene la lista de comunidades donde un usuario específico tiene el rol de creador.
   * El detalle del rol de creador es un concepto de infraestructura, encapsulado en el repositorio.
   *
   * @param id_usuario - UUID del usuario creador.
   * @returns Lista de comunidades vinculadas al usuario como creador.
   */
  public abstract buscarComunidadesDelCreador(
    id_usuario: string,
  ): Promise<Comunidad[]>;
}

