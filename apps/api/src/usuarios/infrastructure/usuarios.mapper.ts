import { usuario } from '@prisma/client';
import { Usuario } from '../models/usuario.entity';

/**
 * Mapeador para transformar entidades de base de datos (Prisma)
 * a objetos de dominio/interfaces (Usuario).
 */
export class UsuariosMapper {
  /**
   * Transforma una fila de la tabla usuario (entidad de Prisma) a la entidad de dominio Usuario.
   * Centraliza la lógica de conversión para asegurar consistencia en todo el módulo.
   *
   * @param user - El registro crudo obtenido de la base de datos a través de Prisma.
   * @returns El objeto de dominio Usuario.
   */
  public static toIUsuario(user: usuario): Usuario {
    return new Usuario(
      user.id_usuario,
      user.nombre,
      user.apellido,
      user.email,
      user.fecha_alta,
      user.activa,
      undefined, // miembro_comunidad
      undefined, // suscripcion
      user.password_hash ?? undefined,
    );
  }
}
