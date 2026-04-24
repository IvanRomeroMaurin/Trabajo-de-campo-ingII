import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UsuariosRepository,
  CrearUsuarioData,
} from './usuarios.repository.interface';
import { UsuariosMapper } from '../infrastructure/usuarios.mapper';
import { Usuario } from '../models/usuario.entity';


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
  public async buscarPorEmail(email: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }

  /**
   * Crea un nuevo registro de usuario en la base de datos de Prisma.
   *
   * @param data - Datos con la información del usuario.
   * @returns El usuario creado y mapeado.
   */
  public async guardar(data: CrearUsuarioData): Promise<Usuario> {
    const user = await this.prisma.usuario.create({
      data: {
        ...data,
        activa: true,
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
  public async buscarPorId(id: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario: id },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }
}

