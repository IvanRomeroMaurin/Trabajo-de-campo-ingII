import { Injectable } from '@nestjs/common';
import { UsuariosRepository } from '../repositories/usuarios.repository.interface';
import { UsuariosService as IUsuariosService } from './usuarios.service.interface';
import { IUsuario } from '@repo/types';
import { CrearUsuarioCommand } from './usuarios.commands';

/**
 * Implementación del servicio de usuarios.
 * Se encarga de la orquestación entre la lógica de negocio y la persistencia a través del repositorio.
 */
@Injectable()
export class UsuariosService implements IUsuariosService {
  public constructor(private readonly repository: UsuariosRepository) {}

  /**
   * Busca un usuario por su correo electrónico delegando la consulta al repositorio.
   *
   * @param email - Email del usuario.
   * @returns El usuario encontrado o null.
   */
  public async buscarPorCorreo(email: string): Promise<IUsuario | null> {
    return this.repository.buscarPorEmail(email);
  }

  /**
   * Crea un nuevo usuario delegando la persistencia al repositorio.
   *
   * @param data - Datos del comando para crear el usuario.
   * @returns El usuario creado.
   */
  public async crearUsuario(data: CrearUsuarioCommand): Promise<IUsuario> {
    return this.repository.guardar(data);
  }

  /**
   * Busca un usuario por su identificador único delegando la consulta al repositorio.
   *
   * @param id - ID único (UUID) del usuario.
   * @returns El usuario encontrado o null.
   */
  public async buscarPorId(id: string): Promise<IUsuario | null> {
    return this.repository.buscarPorId(id);
  }
}
