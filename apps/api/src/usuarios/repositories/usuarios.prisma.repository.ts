import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUsuariosRepository } from '../infrastructure/usuarios.repository.interface';
import { UsuariosMapper } from '../infrastructure/usuarios.mapper';
import { Usuario } from '../models/usuario.entity';

/**
 * Implementación del repositorio de usuarios utilizando Prisma como ORM.
 * Encapsula las operaciones CRUD y consultas específicas sobre la tabla 'usuario'.
 */
@Injectable()
export class PrismaUsuariosRepository implements IUsuariosRepository {
  public constructor(private readonly prisma: PrismaService) {}

  /**
   * Ejecuta una consulta única para encontrar un usuario por su email.
   * @param email Correo electrónico.
   * @returns Entidad de dominio mapeada o null.
   */
  public async buscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }

  /**
   * Persiste un nuevo usuario en la base de datos.
   * @param usuario Entidad a crear.
   * @returns Entidad persistida y re-mapeada desde la DB.
   */
  public async crearUsuario(usuario: Usuario): Promise<Usuario> {
    const user = await this.prisma.usuario.create({
      data: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        fecha_alta: usuario.fecha_alta,
        activa: usuario.activa,
        password_hash: usuario.password_hash!,
      },
    });
    return UsuariosMapper.toIUsuario(user);
  }

  /**
   * Actualiza un usuario existente en la base de datos.
   * @param usuario Entidad a actualizar.
   * @returns Entidad persistida y re-mapeada desde la DB.
   */
  public async actualizarUsuario(usuario: Usuario): Promise<Usuario> {
    const user = await this.prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        activa: usuario.activa,
        password_hash: usuario.password_hash,
      },
    });
    return UsuariosMapper.toIUsuario(user);
  }

  /**
   * Recupera un usuario por su clave primaria UUID.
   * @param id Identificador único.
   * @returns Entidad de dominio mapeada o null.
   */
  public async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario: id },
    });
    return user ? UsuariosMapper.toIUsuario(user) : null;
  }
}
