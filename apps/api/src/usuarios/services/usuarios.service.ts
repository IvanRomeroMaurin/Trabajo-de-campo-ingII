import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsuariosRepository } from '../infrastructure/usuarios.repository.interface';
import { IUsuariosService } from './usuarios.service.interface';
import { Usuario } from '../models/usuario.entity';
import type { CrearUsuarioCommand } from './usuarios.commands';
import { Transactional } from '@nestjs-cls/transactional';

/**
 * Implementación del servicio de usuarios.
 * Orquestra las operaciones de identidad, perfiles y estados de cuenta delegando la lógica al Dominio.
 */
@Injectable()
export class UsuariosService implements IUsuariosService {
  public constructor(private readonly repository: IUsuariosRepository) { }

  /**
   * Localiza un usuario por su dirección de correo electrónico.
   * @param email Email a buscar.
   * @returns El usuario encontrado o null.
   */
  public async buscarPorCorreo(email: string): Promise<Usuario | null> {
    return this.repository.buscarUsuarioPorEmail(email);
  }

  /**
   * Registra un nuevo usuario en el sistema.
   * Aplica la lógica de creación del dominio y persiste el resultado.
   * @param data Datos del comando (nombre, apellido, email, hash).
   * @returns La entidad Usuario creada y persistida.
   */
  @Transactional()
  public async crearUsuario(data: CrearUsuarioCommand): Promise<Usuario> {
    const usuario = Usuario.crearUsuario({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password_hash: data.password_hash,
    });

    return this.repository.crearUsuario(usuario);
  }

  /**
   * Busca un usuario por su identificador único.
   * @param id UUID del usuario.
   * @returns El usuario o null.
   */
  public async buscarPorId(id: string): Promise<Usuario | null> {
    return this.repository.buscarUsuarioPorId(id);
  }

  /**
   * Actualiza el nombre y apellido de un usuario existente.
   * Sigue el patrón Fetch -> Act -> Save.
   * @param id ID del usuario.
   * @param nombre Nuevo nombre.
   * @param apellido Nuevo apellido.
   * @throws NotFoundException si el usuario no existe.
   */
  @Transactional()
  public async actualizarDatosPersonales(id: string, nombre: string, apellido: string): Promise<void> {
    const usuario = await this.obtenerPorIdOError(id);
    usuario.actualizarDatosPersonales(nombre, apellido);
    await this.repository.actualizarUsuario(usuario);
  }

  /**
   * Suspende o desactiva la cuenta de un usuario.
   * @param id ID del usuario.
   * @throws NotFoundException si el usuario no existe.
   */
  @Transactional()
  public async desactivarUsuario(id: string): Promise<void> {
    const usuario = await this.obtenerPorIdOError(id);
    usuario.desactivarUsuario();
    await this.repository.actualizarUsuario(usuario);
  }

  /**
   * Restaura el acceso a un usuario previamente desactivado.
   * @param id ID del usuario.
   * @throws NotFoundException si el usuario no existe.
   */
  @Transactional()
  public async reactivarUsuario(id: string): Promise<void> {
    const usuario = await this.obtenerPorIdOError(id);
    usuario.reactivarUsuario();
    await this.repository.actualizarUsuario(usuario);
  }

  /**
   * Método de soporte interno para garantizar la existencia de un usuario.
   * @param id ID del usuario.
   * @returns La entidad Usuario.
   * @throws NotFoundException si no se encuentra.
   */
  private async obtenerPorIdOError(id: string): Promise<Usuario> {
    const usuario = await this.repository.buscarUsuarioPorId(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }
}
