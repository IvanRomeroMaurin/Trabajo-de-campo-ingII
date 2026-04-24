import { categoria_comunidad } from '@prisma/client';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

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
  public static toDomain(cat: categoria_comunidad): CategoriaComunidad {
    return new CategoriaComunidad(
      cat.id_categoria_comunidad,
      cat.descripcion,
      cat.activa,
    );
  }
}
