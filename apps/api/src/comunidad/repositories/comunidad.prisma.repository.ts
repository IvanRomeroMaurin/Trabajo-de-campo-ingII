import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Comunidad } from '../models/comunidad.entity';
import { IComunidadRepository } from '../infrastructure/comunidad.repository.interface';
import { ComunidadMapper } from '../infrastructure/comunidad.mapper';

/**
 * Adaptador de persistencia para Comunidades usando Prisma.
 * Utiliza nestjs-cls para gestionar el contexto transaccional de forma transparente.
 */
@Injectable()
export class PrismaComunidadRepository implements IComunidadRepository {
  public constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) { }

  /**
   * Persiste o actualiza una comunidad en la base de datos (Upsert).
   *
   * @param comunidad - La entidad comunidad a persistir.
   * @returns La comunidad persistida mapeada a la interfaz de dominio.
   */
  public async guardarComunidad(comunidad: Comunidad): Promise<Comunidad> {
    const persistida = await this.txHost.tx.comunidad.upsert({
      where: { id_comunidad: comunidad.id_comunidad },
      update: {
        nombre: comunidad.nombre,
        slug: comunidad.slug,
        activa: comunidad.activa,
        descripcion: comunidad.descripcion,
        portada_url: comunidad.portada_url,
        id_categoria_comunidad: comunidad.id_categoria_comunidad,
      },
      create: {
        id_comunidad: comunidad.id_comunidad,
        nombre: comunidad.nombre,
        slug: comunidad.slug,
        activa: comunidad.activa,
        fecha_creacion: comunidad.fecha_creacion,
        descripcion: comunidad.descripcion,
        portada_url: comunidad.portada_url,
        id_categoria_comunidad: comunidad.id_categoria_comunidad,
      },
      include: { categoria_comunidad: true },
    });

    return ComunidadMapper.toIComunidad(persistida);
  }


  /**
   * Recupera una comunidad por su ID incluyendo su categoría.
   *
   * @param id_comunidad - UUID de la comunidad.
   * @returns IComunidad o null si no se encuentra.
   */
  public async buscarComunidadPorId(id_comunidad: string): Promise<Comunidad | null> {
    const comunidad = await this.txHost.tx.comunidad.findUnique({
      where: { id_comunidad },
      include: { categoria_comunidad: true },
    });

    if (!comunidad) return null;
    return ComunidadMapper.toIComunidad(comunidad);
  }

  /**
   * Recupera una comunidad por su slug.
   *
   * @param slug - Slug único de la comunidad.
   * @returns IComunidad o null si no se encuentra.
   */
  public async buscarComunidadPorSlug(slug: string): Promise<Comunidad | null> {
    const comunidad = await this.txHost.tx.comunidad.findUnique({
      where: { slug },
      include: { categoria_comunidad: true },
    });

    if (!comunidad) return null;
    return ComunidadMapper.toIComunidad(comunidad);
  }

  /**
   * Obtiene la lista de todas las comunidades activas ordenadas por novedad.
   *
   * @returns Lista de comunidades activas.
   */
  public async buscarComunidadesActivas(): Promise<Comunidad[]> {
    const comunidades = await this.txHost.tx.comunidad.findMany({
      where: { activa: true },
      include: { categoria_comunidad: true },
      orderBy: { fecha_creacion: 'desc' },
    });

    return comunidades.map((c) => ComunidadMapper.toIComunidad(c));
  }

  /**
   * Busca en la tabla asociativa de miembros para encontrar comunidades creadas por el usuario.
   *
   * @param id_usuario - UUID del usuario.
   * @param id_rol_creador - UUID del rol de creador.
   * @returns Lista de comunidades encontradas.
   */
  public async buscarComunidadesPorCreador(
    id_usuario: string,
    id_rol_creador: string,
  ): Promise<Comunidad[]> {
    const miembros = await this.txHost.tx.miembro_comunidad.findMany({
      where: {
        id_usuario,
        id_rol_comunidad: id_rol_creador,
      },
      include: {
        comunidad: {
          include: { categoria_comunidad: true },
        },
      },
    });

    return miembros.map((m) => ComunidadMapper.toIComunidad(m.comunidad));
  }
}
