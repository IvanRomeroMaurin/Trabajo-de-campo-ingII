import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import {
  IMiembroRepository,
} from '../infrastructure/miembro.repository.interface';

import { Miembro } from '../models/miembro.entity';
import { ROLES } from '../../common/constants/roles';
import { MiembroMapper } from '../infrastructure/miembro.mapper';

/**
 * Implementación del repositorio de miembros utilizando Prisma.
 * Gestiona la persistencia de las relaciones entre usuarios y comunidades.
 */
@Injectable()
export class PrismaMiembroRepository implements IMiembroRepository {
  public constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) { }

  /**
   * Busca un registro de membresía específico por su PK compuesta (id_usuario + id_comunidad).
   * @param id_usuario UUID del usuario.
   * @param id_comunidad UUID de la comunidad.
   * @returns Entidad Miembro mapeada o null.
   */
  public async buscarMiembroPorId(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<Miembro | null> {
    const miembro = await this.txHost.tx.miembro_comunidad.findUnique({
      where: {
        id_usuario_id_comunidad: {
          id_usuario,
          id_comunidad,
        },
      },
    });
    return miembro ? MiembroMapper.toDomain(miembro) : null;
  }

  /**
   * Registra o actualiza un miembro en la base de datos utilizando Upsert.
   * @param miembro Entidad Miembro a persistir.
   */
  public async guardarMiembro(miembro: Miembro): Promise<void> {
    await this.txHost.tx.miembro_comunidad.upsert({
      where: {
        id_usuario_id_comunidad: {
          id_usuario: miembro.id_usuario,
          id_comunidad: miembro.id_comunidad,
        },
      },
      update: {
        id_rol_comunidad: miembro.id_rol_comunidad,
        fecha_actualizacion: miembro.fecha_actualizacion,
      },
      create: {
        id_usuario: miembro.id_usuario,
        id_comunidad: miembro.id_comunidad,
        id_rol_comunidad: miembro.id_rol_comunidad,
        fecha_ingreso: miembro.fecha_ingreso,
      },
    });
  }

  /**
   * Verifica si existe un registro de membresía con el rol de 'CREADOR'.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns True si el usuario tiene el rol de creador en esa comunidad.
   */
  public async esCreadorDeComunidad(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean> {
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
   * Comprueba la existencia de una comunidad mediante un conteo rápido.
   * // TODO: mover a ComunidadService cuando se resuelva la dependencia circular.
   *
   * @param id_comunidad - ID a buscar.
   * @returns True si la comunidad existe.
   */
  public async existeComunidad(id_comunidad: string): Promise<boolean> {
    const count = await this.txHost.tx.comunidad.count({
      where: { id_comunidad },
    });
    return count > 0;
  }

  /**
   * Comprueba si un rol está definido en la tabla de roles.
   *
   * @param id_rol - ID del rol.
   * @returns True si el rol existe.
   */
  public async existeRol(id_rol: string): Promise<boolean> {
    const count = await this.txHost.tx.rol.count({ where: { id_rol } });
    return count > 0;
  }
}

