import { comunidad, categoria_comunidad } from '@prisma/client';
import { IComunidad, ICategoriaComunidad } from '@repo/types';
import { Comunidad } from '../models/comunidad.entity';
import { CategoriaComunidad } from '../../categoria-comunidad/models/categoria-comunidad.entity';

/**
 * Mapper para transformar modelos de Prisma de Comunidad a interfaces de dominio.
 * Asegura el desacoplamiento de la infraestructura y el manejo de tipos opcionales.
 */
export class ComunidadMapper {
  /**
   * Mapea un modelo de Prisma comunidad a la interfaz IComunidad.
   *
   * @param comunidad - El modelo de comunidad de Prisma (puede incluir la categoría).
   * @returns La interfaz de dominio IComunidad.
   */
  public static toIComunidad(
    comunidad: comunidad & {
      categoria_comunidad?: categoria_comunidad;
    },
  ): IComunidad {
    return new Comunidad({
      id_comunidad: comunidad.id_comunidad,
      nombre: comunidad.nombre,
      slug: comunidad.slug,
      descripcion: comunidad.descripcion ?? undefined,
      portada_url: comunidad.portada_url ?? undefined,
      activa: comunidad.activa,
      fecha_creacion: comunidad.fecha_creacion,
      id_categoria_comunidad: comunidad.id_categoria_comunidad,
      // Mapeo de relación si está presente
      categoria_comunidad: comunidad.categoria_comunidad
        ? ComunidadMapper.toICategoriaComunidad(comunidad.categoria_comunidad)
        : undefined,
    });
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
    return new CategoriaComunidad({
      id_categoria_comunidad: categoria.id_categoria_comunidad,
      descripcion: categoria.descripcion,
      activa: categoria.activa,
    });
  }
}
