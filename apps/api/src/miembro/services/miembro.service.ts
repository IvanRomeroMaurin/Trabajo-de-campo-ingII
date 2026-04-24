import { Injectable, NotFoundException } from '@nestjs/common';
import { MiembroRepository } from '../repositories/miembro.repository.interface';
import { MiembroService as IMiembroService } from './miembro.service.interface';
import {
  AgregarMiembroCommand,
  CambiarRolMiembroCommand,
} from './miembro.commands';

/**
 * Implementación del servicio de gestión de miembros.
 * Orquestra la lógica para unir usuarios a comunidades, gestionar sus roles y verificar permisos.
 */
@Injectable()
export class MiembroService implements IMiembroService {
  public constructor(private readonly repository: MiembroRepository) {}

  /**
   * Une a un usuario a una comunidad.
   * Valida la existencia del usuario y la comunidad antes de proceder.
   * Si el usuario ya era miembro, actualiza su marca de tiempo de actividad.
   *
   * @param command - Datos de la membresía (usuario, comunidad y rol inicial).
   * @throws {NotFoundException} Si el usuario o la comunidad no existen.
   */
  public async agregarMiembro(command: AgregarMiembroCommand): Promise<void> {
    const { id_usuario, id_comunidad, id_rol } = command;

    if (!(await this.repository.existeUsuario(id_usuario))) {
      throw new NotFoundException(`Usuario no encontrado`);
    }

    if (!(await this.repository.existeComunidad(id_comunidad))) {
      throw new NotFoundException(`Comunidad no encontrada`);
    }

    const miembroExistente = await this.repository.buscarMiembro(
      id_usuario,
      id_comunidad,
    );

    if (miembroExistente) {
      await this.repository.actualizarMiembro(id_usuario, id_comunidad, {
        fecha_actualizacion: new Date(),
      });
    } else {
      await this.repository.crearMiembro({
        id_usuario,
        id_comunidad,
        id_rol_comunidad: id_rol,
        fecha_ingreso: new Date(),
      });
    }
  }

  /**
   * Actualiza el rol de un miembro en una comunidad.
   * Verifica que el miembro exista y que el nuevo rol sea válido.
   *
   * @param command - Datos del cambio de rol.
   * @throws {NotFoundException} Si el miembro no existe en la comunidad o el rol no existe.
   */
  public async cambiarRolMiembro(
    command: CambiarRolMiembroCommand,
  ): Promise<void> {
    const { id_usuario, id_comunidad, id_rol_nuevo } = command;

    const miembro = await this.repository.buscarMiembro(
      id_usuario,
      id_comunidad,
    );
    if (!miembro) throw new NotFoundException(`El usuario no es miembro`);

    if (!(await this.repository.existeRol(id_rol_nuevo))) {
      throw new NotFoundException(`El rol no existe`);
    }

    await this.repository.actualizarMiembro(id_usuario, id_comunidad, {
      id_rol_comunidad: id_rol_nuevo,
      fecha_actualizacion: new Date(),
    });
  }

  /**
   * Verifica permisos de creador delegando la consulta al repositorio especializado.
   *
   * @param id_usuario - ID del usuario.
   * @param id_comunidad - ID de la comunidad.
   * @returns True si es creador.
   */
  public async esCreador(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean> {
    return this.repository.esCreador(id_usuario, id_comunidad);
  }
}
