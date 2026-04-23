import { Injectable } from '@nestjs/common';
import { categoria_comunidad } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriaComunidadService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene todas las categorías de comunidades disponibles.
   */
  public async getCategorias(): Promise<categoria_comunidad[]> {
    const categorias = await this.prisma.categoria_comunidad.findMany({
      where: { activa: true },
    });

    return categorias;
  }
}
