import { Comunidad } from '../models/comunidad.entity';

/**
 * Puerto (Interfaz) para la persistencia de Comunidades.
 * Define el contrato que cualquier adaptador de persistencia debe implementar.
 * Mantiene la lógica de negocio desacoplada de la tecnología de base de datos.
 */
export abstract class ComunidadRepository {
  /**
   * Persiste una nueva comunidad en el sistema de almacenamiento.
   *
   * @param data - Objeto con los atributos de la comunidad a crear.
   * @param data.nombre - Nombre de la comunidad.
   * @param data.slug - Identificador único amigable para la URL.
   * @param data.descripcion - Breve descripción de la comunidad (opcional).
   * @param data.portada_url - URL de la imagen de portada (opcional).
   * @param data.id_categoria_comunidad - ID de la categoría a la que pertenece.
   * @param data.activa - Estado inicial de la comunidad.
   * @returns Promesa con la comunidad creada y su categoría cargada.
   */
  public abstract guardar(data: {
    nombre: string;
    slug: string;
    descripcion?: string;
    portada_url?: string;
    id_categoria_comunidad: string;
    activa: boolean;
  }): Promise<Comunidad>;

  /**
   * Actualiza los datos de una comunidad existente.
   *
   * @param id_comunidad - UUID de la comunidad a modificar.
   * @param data - Atributos parciales a actualizar.
   * @returns Promesa con la comunidad actualizada.
   */
  public abstract actualizar(
    id_comunidad: string,
    data: Partial<{
      nombre: string;
      slug: string;
      descripcion: string;
      portada_url: string;
      id_categoria_comunidad: string;
      activa: boolean;
    }>,
  ): Promise<Comunidad>;

  /**
   * Busca una comunidad por su identificador único primario.
   *
   * @param id_comunidad - UUID de la comunidad.
   * @returns La comunidad encontrada o null si no existe.
   */
  public abstract buscarPorId(id_comunidad: string): Promise<Comunidad | null>;

  /**
   * Busca una comunidad por su slug (URL friendly name).
   *
   * @param slug - El slug único de la comunidad.
   * @returns La comunidad encontrada con su categoría o null.
   */
  public abstract buscarPorSlug(slug: string): Promise<Comunidad | null>;

  /**
   * Recupera todas las comunidades que están marcadas como activas.
   *
   * @returns Lista de comunidades activas ordenadas por fecha de creación descendente.
   */
  public abstract buscarTodasActivas(): Promise<Comunidad[]>;

  /**
   * Obtiene la lista de comunidades donde un usuario específico tiene el rol de creador.
   *
   * @param id_usuario - UUID del usuario.
   * @param id_rol_creador - UUID del rol que identifica al creador.
   * @returns Lista de comunidades vinculadas al usuario como creador.
   */
  public abstract buscarPorCreador(
    id_usuario: string,
    id_rol_creador: string,
  ): Promise<Comunidad[]>;

  /**
   * Verifica si una categoría de comunidad existe en la base de datos.
   *
   * @param id_categoria - UUID de la categoría.
   * @returns true si la categoría existe, false en caso contrario.
   */
  public abstract existeCategoria(id_categoria: string): Promise<boolean>;
}
