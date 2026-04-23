import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { MiembroRepository } from './miembro.repository.interface';
import { ROLES } from '../../common/constants/roles';

/**
 * Implementación del repositorio de miembros utilizando Prisma.
 * Gestiona la persistencia de las relaciones entre usuarios y comunidades.
 */
@Injectable()
export class PrismaMiembroRepository implements MiembroRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  /**
   * Busca un miembro específico utilizando la clave compuesta (usuario + comunidad).
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns El registro de la tabla miembro_comunidad o null.
   */
  async buscarMiembro(id_usuario: string, id_comunidad: string): Promise<any> {
    return this.txHost.tx.miembro_comunidad.findUnique({
      where: {
        id_usuario_id_comunidad: {
          id_usuario,
          id_comunidad,
        },
      },
    });
  }

  /**
   * Inserta un nuevo registro de membresía en la base de datos.
   *
   * @param data - Datos de la membresía.
   */
  async crearMiembro(data: any): Promise<void> {
    await this.txHost.tx.miembro_comunidad.create({ data });
  }

  /**
   * Actualiza los datos de una membresía utilizando la clave compuesta para la identificación.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @param data - Datos a actualizar.
   */
  async actualizarMiembro(id_usuario: string, id_comunidad: string, data: any): Promise<void> {
    await this.txHost.tx.miembro_comunidad.update({
      where: {
        id_usuario_id_comunidad: {
          id_usuario,
          id_comunidad,
        },
      },
      data,
    });
  }

  /**
   * Verifica si existe un registro de membresía con el rol de 'CREADOR'.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns True si el usuario tiene el rol de creador en esa comunidad.
   */
  async esCreador(id_usuario: string, id_comunidad: string): Promise<boolean> {
    const miembro = await this.txHost.tx.miembro_comunidad.findFirst({
      where: {
        id_usuario,
        id_comunidad,
        id_rol_comunidad: ROLES.CREADOR,
      },
    });
    return !!miembro;
  }

  /**
   * Comprueba la existencia de un usuario mediante un conteo rápido.
   *
   * @param id_usuario - ID a buscar.
   * @returns True si el conteo es mayor a cero.
   */
  async existeUsuario(id_usuario: string): Promise<boolean> {
    const count = await this.txHost.tx.usuario.count({ where: { id_usuario } });
    return count > 0;
  }

  /**
   * Comprueba la existencia de una comunidad mediante un conteo rápido.
   *
   * @param id_comunidad - ID a buscar.
   * @returns True si la comunidad existe.
   */
  async existeComunidad(id_comunidad: string): Promise<boolean> {
    const count = await this.txHost.tx.comunidad.count({ where: { id_comunidad } });
    return count > 0;
  }

  /**
   * Comprueba si un rol está definido en la tabla de roles.
   *
   * @param id_rol - ID del rol.
   * @returns True si el rol existe.
   */
  async existeRol(id_rol: string): Promise<boolean> {
    const count = await this.txHost.tx.rol.count({ where: { id_rol } });
    return count > 0;
  }
}
