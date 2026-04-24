import { miembro_comunidad } from '@prisma/client';
import { Miembro } from '../models/miembro.entity';

/**
 * Mapper para transformar entidades de membresía de Prisma a objetos de dominio.
 */
export class MiembroMapper {
  /**
   * Transforma un registro de la tabla miembro_comunidad a un objeto de dominio simplificado.
   *
   * @param miembro - El registro crudo de la base de datos.
   * @returns Un objeto con la estructura de dominio para membresía.
   */
  public static toDomain(miembro: miembro_comunidad): Miembro {
    return new Miembro(
      miembro.id_usuario,
      miembro.id_comunidad,
      miembro.id_rol_comunidad,
      miembro.fecha_ingreso,
      miembro.fecha_actualizacion,
    );
  }
}
