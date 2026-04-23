import { usuario } from '@prisma/client';
import { IUsuario } from '@repo/types';
import { Usuario } from '../models/usuario.entity';

/**
 * Mapeador para transformar entidades de base de datos (Prisma)
 * a objetos de dominio/interfaces (IUsuario).
 */
/**
 * Mapeador para transformar entidades de base de datos (Prisma)
 * a objetos de dominio/interfaces (IUsuario).
 */
export class UsuariosMapper {
  /**
   * Transforma una fila de la tabla usuario (entidad de Prisma) a la interfaz de dominio IUsuario.
   * Centraliza la lógica de conversión para asegurar consistencia en todo el módulo.
   *
   * @param user - El registro crudo obtenido de la base de datos a través de Prisma.
   * @returns El objeto formateado según la interfaz IUsuario.
   */
  public static toIUsuario(user: usuario): IUsuario {
    return new Usuario({
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      fecha_alta: user.fecha_alta,
      activa: user.activa,
      password_hash: user.password_hash ?? undefined, // Se incluye para procesos de autenticación en la capa de aplicación
    });
  }
}
