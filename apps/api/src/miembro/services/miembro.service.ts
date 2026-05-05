import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Transactional } from '@nestjs-cls/transactional';
import { IMiembroRepository } from '../infrastructure/miembro.repository.interface';
import { IMiembroService } from './miembro.service.interface';
import { IUsuariosService } from '../../usuarios/services/usuarios.service.interface';
import { Miembro } from '../models/miembro.entity';
import type {
  AgregarMiembroCommand,
  CambiarRolMiembroCommand,
} from './miembro.commands';

/**
 * Implementación del servicio de gestión de miembros.
 * Orquestra la lógica para unir usuarios a comunidades, gestionar sus roles y verificar permisos.
 */
@Injectable()
export class MiembroService implements IMiembroService {
  public constructor(
    private readonly repository: IMiembroRepository,
    private readonly usuariosService: IUsuariosService,
  ) {}

  /**
   * Une a un usuario a una comunidad.
   * Valida la existencia del usuario y la comunidad antes de proceder.
   * Si el usuario ya era miembro, el dominio gestionará su actualización.
   */
  @Transactional()
  public async agregarMiembro(command: AgregarMiembroCommand): Promise<void> {
    const { id_usuario, id_comunidad, id_rol } = command;

    const usuario = await this.usuariosService.buscarPorId(id_usuario);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!(await this.repository.existeComunidad(id_comunidad))) {
      throw new NotFoundException('Comunidad no encontrada');
    }

    const existe = await this.repository.buscarMiembroPorId(
      id_usuario,
      id_comunidad,
    );
    if (existe) {
      throw new ConflictException('El usuario ya es miembro de esta comunidad');
    }

    const miembro = Miembro.crearMiembro({
      id_usuario,
      id_comunidad,
      id_rol_comunidad: id_rol,
    });

    await this.repository.crearMiembro(miembro);
  }

  /**
   * Actualiza el rol de un miembro en una comunidad.
   * Verifica que el miembro exista y que el nuevo rol sea válido.
   */
  @Transactional()
  public async cambiarRolMiembro(
    command: CambiarRolMiembroCommand,
  ): Promise<void> {
    const { id_usuario, id_comunidad, id_rol_nuevo } = command;

    const miembro = await this.repository.buscarMiembroPorId(
      id_usuario,
      id_comunidad,
    );
    if (!miembro) {
      throw new NotFoundException(`El usuario no es miembro de esta comunidad`);
    }

    if (!(await this.repository.existeRol(id_rol_nuevo))) {
      throw new NotFoundException(`El rol solicitado no existe`);
    }

    miembro.cambiarRol(id_rol_nuevo);
    await this.repository.actualizarMiembro(miembro);
  }

  /**
   * Verifica si un usuario posee el rol de creador en una comunidad específica.
   * @param id_usuario ID del usuario.
   * @param id_comunidad ID de la comunidad.
   * @returns True si es el creador.
   */
  public async esCreador(
    id_usuario: string,
    id_comunidad: string,
  ): Promise<boolean> {
    return this.repository.esCreadorDeComunidad(id_usuario, id_comunidad);
  }
}
