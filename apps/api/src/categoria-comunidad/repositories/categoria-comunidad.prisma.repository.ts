import { Injectable } from '@nestjs/common';
import { categoria_comunidad } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoriaComunidadRepository } from './categoria-comunidad.repository.interface';

/**
 * Implementación del repositorio de categorías utilizando Prisma.
 */
@Injectable()
export class PrismaCategoriaComunidadRepository implements CategoriaComunidadRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Consulta la base de datos para obtener categorías activas ordenadas por descripción.
   *
   * @returns Lista de categorías activas.
   */
  async buscarTodasActivas(): Promise<categoria_comunidad[]> {
    return this.prisma.categoria_comunidad.findMany({
      where: { activa: true },
      orderBy: { descripcion: 'asc' },
    });
  }

  /**
   * Realiza un conteo en la base de datos para verificar la existencia de un ID de categoría.
   *
   * @param id - Identificador de categoría.
   * @returns True si existe al menos un registro.
   */
  async existe(id: string): Promise<boolean> {
    const count = await this.prisma.categoria_comunidad.count({
      where: { id_categoria_comunidad: id },
    });
    return count > 0;
  }
}
