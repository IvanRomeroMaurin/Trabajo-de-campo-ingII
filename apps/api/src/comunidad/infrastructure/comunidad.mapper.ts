import { comunidad, categoria_comunidad } from '@prisma/client';
import { ICategoriaComunidad } from '@repo/types';
import { Comunidad } from '../models/comunidad.entity';
import { CategoriaComunidad } from '../../categoria-comunidad/models/categoria-comunidad.entity';

/**
 * Mapper para transformar modelos de Prisma de Comunidad a interfaces de dominio.
 * Asegura el desacoplamiento de la infraestructura y el manejo de tipos opcionales.
 */
export class ComunidadMapper {
  /**
   * Mapea un modelo de Prisma comunidad a la entidad de dominio Comunidad.
   *
   * @param comunidad - El modelo de comunidad de Prisma (puede incluir la categoría).
   * @returns La entidad de dominio Comunidad.
   */
  public static toIComunidad(
    comunidad: comunidad & {
      categoria_comunidad?: categoria_comunidad;
    },
  ): Comunidad {

    return new Comunidad(
      comunidad.id_comunidad,
      comunidad.nombre,
      comunidad.slug,
      comunidad.activa,
      comunidad.fecha_creacion,
      comunidad.id_categoria_comunidad,
      comunidad.descripcion ?? undefined,
      comunidad.portada_url ?? undefined,
      comunidad.categoria_comunidad
        ? ComunidadMapper.toICategoriaComunidad(comunidad.categoria_comunidad)
        : undefined,
    );

  }

  /**
   * Mapea un modelo de Prisma categoria_comunidad a la interfaz ICategoriaComunidad.
   *
   * @param categoria - El modelo de categoría de Prisma.
   * @returns La interfaz de dominio ICategoriaComunidad.
   */
  public static toICategoriaComunidad(
    categoria: categoria_comunidad,
  ): ICategoriaComunidad {
    return new CategoriaComunidad(
      categoria.id_categoria_comunidad,
      categoria.descripcion,
      categoria.activa,
    );

  }
}
