import { categoria_comunidad } from '@prisma/client';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';

/**
 * Mapper para la entidad CategoriaComunidad.
 * Centraliza la lógica de transformación entre los modelos de persistencia (Prisma) y el Dominio.
 */
export class CategoriaComunidadMapper {
  /**
   * Transforma un registro crudo de Prisma a una entidad de dominio CategoriaComunidad.
   * Utiliza el patrón de reconstitución para evitar validaciones de negocio en datos ya existentes.
   *
   * @param cat - El registro obtenido de la base de datos.
   * @returns La entidad de dominio hidratada.
   */
  public static toDomain(cat: categoria_comunidad): CategoriaComunidad {
    return CategoriaComunidad.reconstituirCategoria({
      id_categoria_comunidad: cat.id_categoria_comunidad,
      descripcion: cat.descripcion,
      activa: cat.activa,
    });
  }
}
