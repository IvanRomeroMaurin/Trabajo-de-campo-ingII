import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsuariosRepository } from './usuarios.repository.interface';
import { IUsuario } from '@repo/types';
import { CrearUsuarioCommand } from '../services/usuarios.commands';
import { UsuariosMapper } from './usuarios.mapper';

/**
 * Implementación del repositorio de usuarios utilizando Prisma como ORM.
 */
@Injectable()
export class PrismaUsuariosRepository implements UsuariosRepository {
  public constructor(private readonly prisma: PrismaService) {}

  /**
   * Busca un usuario por email utilizando el cliente de Prisma.
   *
   * @param email - Email del usuario a buscar.
   * @returns El usuario mapeado al dominio o null.
   */
  public async buscarPorEmail(email: string): Promise<IUsuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }

  /**
   * Crea un nuevo registro de usuario en la base de datos de Prisma.
   *
   * @param data - Comandos con la información del usuario.
   * @returns El usuario creado y mapeado.
   */
  public async guardar(data: CrearUsuarioCommand): Promise<IUsuario> {
    const user = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        password_hash: data.password_hash,
        activa: data.activa ?? true,
      },
    });
    return UsuariosMapper.toIUsuario(user);
  }

  /**
   * Busca un usuario por su identificador primario (id_usuario) en Prisma.
   *
   * @param id - Identificador único.
   * @returns El usuario mapeado o null.
   */
  public async buscarPorId(id: string): Promise<IUsuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario: id },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }
}
