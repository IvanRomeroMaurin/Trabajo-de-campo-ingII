import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, usuario } from '@prisma/client';

/**
 * Servicio de Usuarios
 * Componente que interactúa de manera directa y exclusiva en la capa de persistencia 
 * (Prisma Client) para todo lo relacionado al manejo y búsqueda de usuarios.
 */
@Injectable()
export class UsuariosService {
  private readonly prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  /**
   * Busca un usuario analizando la unicidad de su correo electrónico.
   * @param email El email exacto y tipado como string.
   * @returns La promesa que devuelve una fila `usuario` de prisma o un null si no se halló nada.
   */
  public async buscarPorCorreo(email: string): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  /**
   * Emite el comando directo a PostgreSQL a través de Prisma para crear una nueva fila.
   * @param data Estructura tipada autogenerada por Prisma (`Prisma.usuarioCreateInput`)
   */
  public async crearUsuario(data: Prisma.usuarioCreateInput): Promise<usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  /**
   * Busca un usuario por su ID (BigInt).
   * @param id El ID del usuario.
   */
  public async buscarPorId(id: number): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { id_usuario: BigInt(id) },
    });
  }
}
