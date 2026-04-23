import { categoria_comunidad } from '@prisma/client';

/**
 * Mapper para la entidad CategoriaComunidad.
 * Centraliza la lógica de transformación entre la base de datos y la capa de dominio.
 */
export class CategoriaComunidadMapper {
  /**
   * Transforma una entidad cruda de Prisma al formato esperado por el dominio.
   *
   * @param cat - La entidad obtenida de Prisma.
   * @returns Objeto mapeado con los campos esenciales de la categoría.
   */
  public static toDomain(cat: categoria_comunidad) {
    return {
      id_categoria_comunidad: cat.id_categoria_comunidad,
      descripcion: cat.descripcion,
      activa: cat.activa,
    };
  }
}
