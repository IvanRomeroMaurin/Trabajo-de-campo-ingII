import { Injectable } from '@nestjs/common';
import { IUsuariosRepository } from '../repositories/usuarios.repository.interface';
import { IUsuariosService } from './usuarios.service.interface';
import { Usuario } from '../models/usuario.entity';
import { CrearUsuarioCommand } from './usuarios.commands';

/**
 * Implementación del servicio de usuarios.
 * Se encarga de la orquestación entre la lógica de negocio y la persistencia a través del repositorio.
 */
@Injectable()
export class UsuariosService implements IUsuariosService {
  public constructor(private readonly repository: IUsuariosRepository) { }


  /**
   * Busca un usuario por su correo electrónico delegando la consulta al repositorio.
   *
   * @param email - Email del usuario.
   * @returns El usuario encontrado o null.
   */
  public async buscarPorCorreo(email: string): Promise<Usuario | null> {
    return this.repository.buscarPorEmail(email);
  }

  /**
   * Crea un nuevo usuario delegando la persistencia al repositorio.
   *
   * @param data - Datos del comando para crear el usuario.
   * @returns El usuario creado.
   */
  public async crearUsuario(data: CrearUsuarioCommand): Promise<Usuario> {
    return this.repository.guardar({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password_hash: data.password_hash,
    });
  }


  /**
   * Busca un usuario por su identificador único delegando la consulta al repositorio.
   *
   * @param id - ID único (UUID) del usuario.
   * @returns El usuario encontrado o null.
   */
  public async buscarPorId(id: string): Promise<Usuario | null> {
    return this.repository.buscarPorId(id);
  }
}
