import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoriaComunidadRepository } from './categoria-comunidad.repository.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';
import { CategoriaComunidadMapper } from '../infrastructure/categoria-comunidad.mapper';


/**
 * Implementación del repositorio de categorías utilizando Prisma.
 */
@Injectable()
export class PrismaCategoriaComunidadRepository implements CategoriaComunidadRepository {
  public constructor(private readonly prisma: PrismaService) { }

  /**
   * Consulta la base de datos para obtener categorías activas ordenadas por descripción.
   *
   * @returns Lista de categorías activas.
   */
  public async buscarTodasActivas(): Promise<CategoriaComunidad[]> {
    const categorias = await this.prisma.categoria_comunidad.findMany({
      where: { activa: true },
      orderBy: { descripcion: 'asc' },
    });
    return categorias.map((c) => CategoriaComunidadMapper.toDomain(c));
  }

  /**
   * Realiza un conteo en la base de datos para verificar la existencia de un ID de categoría.
   *
   * @param id - Identificador de categoría.
   * @returns True si existe al menos un registro.
   */
  public async existe(id: string): Promise<boolean> {
    const count = await this.prisma.categoria_comunidad.count({
      where: { id_categoria_comunidad: id },
    });
    return count > 0;
  }
}
