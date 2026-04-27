import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ICategoriaComunidadRepository } from '../infrastructure/categoria-comunidad.repository.interface';
import { CategoriaComunidad } from '../models/categoria-comunidad.entity';
import { CategoriaComunidadMapper } from '../infrastructure/categoria-comunidad.mapper';


/**
 * Implementación del repositorio de categorías utilizando Prisma.
 * Gestiona la persistencia física de las categorías de comunidad.
 */
@Injectable()
export class PrismaCategoriaComunidadRepository implements ICategoriaComunidadRepository {
  public constructor(private readonly prisma: PrismaService) { }

  /**
   * Recupera todas las categorías activas de la base de datos.
   * @returns Listado de categorías activas ordenadas alfabéticamente.
   */
  public async buscarCategoriasActivas(): Promise<CategoriaComunidad[]> {
    const categorias = await this.prisma.categoria_comunidad.findMany({
      where: { activa: true },
      orderBy: { descripcion: 'asc' },
    });
    return categorias.map((c) => CategoriaComunidadMapper.toDomain(c));
  }

  /**
   * Busca una única categoría por su clave primaria.
   * @param id ID de la categoría.
   * @returns Entidad de dominio o null si no se encuentra.
   */
  public async buscarCategoriaPorId(id: string): Promise<CategoriaComunidad | null> {
    const categoria = await this.prisma.categoria_comunidad.findUnique({
      where: { id_categoria_comunidad: id },
    });
    return categoria ? CategoriaComunidadMapper.toDomain(categoria) : null;
  }

  /**
   * Registra una nueva categoría en la base de datos.
   * @param categoria Entidad de dominio con los datos.
   * @returns La entidad persistida y mapeada.
   */
  public async crearCategoria(categoria: CategoriaComunidad): Promise<CategoriaComunidad> {
    const persistida = await this.prisma.categoria_comunidad.create({
      data: {
        id_categoria_comunidad: categoria.id_categoria_comunidad,
        descripcion: categoria.descripcion,
        activa: categoria.activa,
      },
    });
    return CategoriaComunidadMapper.toDomain(persistida);
  }

  /**
   * Actualiza una categoría existente en la base de datos.
   * @param categoria Entidad de dominio con los cambios.
   */
  public async actualizarCategoria(categoria: CategoriaComunidad): Promise<void> {
    await this.prisma.categoria_comunidad.update({
      where: { id_categoria_comunidad: categoria.id_categoria_comunidad },
      data: {
        descripcion: categoria.descripcion,
        activa: categoria.activa,
      },
    });
  }

  /**
   * Verifica la existencia de una categoría sin recuperar todos sus datos.
   * @param id ID a buscar.
   * @returns True si el registro existe.
   */
  public async existeCategoria(id: string): Promise<boolean> {
    const count = await this.prisma.categoria_comunidad.count({
      where: { id_categoria_comunidad: id },
    });
    return count > 0;
  }
}
