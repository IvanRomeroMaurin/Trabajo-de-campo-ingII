import { usuario } from '@prisma/client';
import { Usuario } from '../models/usuario.entity';

/**
 * Mapeador para transformar entidades de base de datos (Prisma) a objetos de dominio (Usuario).
 */
export class UsuariosMapper {
  /**
   * Transforma una fila de la tabla 'usuario' (entidad de Prisma) a la entidad de dominio Usuario.
   * Utiliza el método de reconstitución para evitar validaciones de setters.
   * @param user El registro crudo obtenido de la base de datos.
   * @returns La entidad de dominio Usuario hidratada.
   */
  public static toIUsuario(user: usuario): Usuario {
    return Usuario.reconstituirUsuario({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      fecha_alta: user.fecha_alta,
      activa: user.activa,
      password_hash: user.password_hash ?? undefined,
    });
  }
}
