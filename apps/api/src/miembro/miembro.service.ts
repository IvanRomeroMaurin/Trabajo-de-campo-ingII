import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { ROLES } from '../common/constants/roles';

@Injectable()
export class MiembroService {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>
  ) {}

  /**
   * Agrega un usuario como miembro de una comunidad.
   */
  public async agregarMiembro(
    id_usuario: string,
    id_comunidad: string,
    id_rol: string,
  ): Promise<void> {
    // Validar que el usuario existe
    const usuario = await this.txHost.tx.usuario.findUnique({
      where: { id_usuario: id_usuario },
    });
    if (!usuario) throw new NotFoundException(`Usuario no encontrado`);

    // Validar que la comunidad existe
    const comunidad = await this.txHost.tx.comunidad.findUnique({
      where: { id_comunidad: id_comunidad },
    });
    if (!comunidad) throw new NotFoundException(`Comunidad no encontrada`);

    // Verificar si ya es miembro
    const miembroExistente = await this.txHost.tx.miembro_comunidad.findFirst({
      where: {
        id_usuario: id_usuario,
        id_comunidad: id_comunidad,
      },
    });

    if (miembroExistente) {
      await this.txHost.tx.miembro_comunidad.update({
        where: {
          id_usuario_id_comunidad: {
            id_usuario: id_usuario,
            id_comunidad: id_comunidad,
          },
        },
        data: { fecha_actualizacion: new Date() },
      });
    } else {
      await this.txHost.tx.miembro_comunidad.create({
        data: {
          id_usuario: id_usuario,
          id_comunidad: id_comunidad,
          id_rol_comunidad: id_rol,
          fecha_ingreso: new Date(),
        },
      });
    }
  }

  /**
   * Cambia el rol de un miembro.
   */
  public async cambiarRolMiembro(
    id_usuario: string,
    id_comunidad: string,
    id_rol_nuevo: string,
  ): Promise<void> {
    const miembro = await this.txHost.tx.miembro_comunidad.findFirst({
      where: {
        id_usuario: id_usuario,
        id_comunidad: id_comunidad,
      },
    });

    if (!miembro) throw new NotFoundException(`El usuario no es miembro`);

    const rol = await this.txHost.tx.rol.findUnique({
      where: { id_rol: id_rol_nuevo },
    });
    if (!rol) throw new NotFoundException(`El rol no existe`);

    await this.txHost.tx.miembro_comunidad.update({
      where: {
        id_usuario_id_comunidad: {
          id_usuario: id_usuario,
          id_comunidad: id_comunidad,
        },
      },
      data: {
        id_rol_comunidad: id_rol_nuevo,
        fecha_actualizacion: new Date(),
      },
    });
  }

  /**
   * Verifica si un usuario es el creador.
   */
  public async esCreador(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean> {
    const miembro = await this.txHost.tx.miembro_comunidad.findFirst({
      where: {
        id_usuario: id_usuario,
        id_comunidad: id_comunidad,
        id_rol_comunidad: ROLES.CREADOR,
      },
    });
    return !!miembro;
  }
}
