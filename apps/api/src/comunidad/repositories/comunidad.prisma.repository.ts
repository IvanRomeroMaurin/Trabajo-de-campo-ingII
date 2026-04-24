import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Comunidad } from '../models/comunidad.entity';
import {
  ComunidadRepository,
  CrearComunidadData,
} from './comunidad.repository.interface';
import { ComunidadMapper } from '../infrastructure/comunidad.mapper';

/**
 * Adaptador de persistencia para Comunidades usando Prisma.
 * Utiliza nestjs-cls para gestionar el contexto transaccional de forma transparente.
 */
@Injectable()
export class PrismaComunidadRepository implements ComunidadRepository {
  public constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  /**
   * Inserta un nuevo registro de comunidad en la base de datos.
   *
   * @param data - Atributos de la comunidad.
   * @returns La comunidad mapeada a la interfaz de dominio.
   */
  public async guardar(data: CrearComunidadData): Promise<Comunidad> {
    const comunidad = await this.txHost.tx.comunidad.create({
      data: {
        ...data,
        fecha_creacion: new Date(),
      },
      include: { categoria_comunidad: true },
    });

    return ComunidadMapper.toIComunidad(comunidad);
  }


  /**
   * Actualiza parcialmente una comunidad existente en la base de datos.
   *
   * @param id_comunidad - UUID de la comunidad.
   * @param data - Campos a actualizar.
   * @returns La comunidad con los cambios aplicados.
   */
  public async actualizar(
    id_comunidad: string,
    data: Partial<{
      nombre: string;
      slug: string;
      descripcion: string;
      portada_url: string;
      id_categoria_comunidad: string;
      activa: boolean;
    }>,
  ): Promise<Comunidad> {
    const comunidad = await this.txHost.tx.comunidad.update({
      where: { id_comunidad },
      data,
      include: { categoria_comunidad: true },
    });

    return ComunidadMapper.toIComunidad(comunidad);
  }

  /**
   * Recupera una comunidad por su ID incluyendo su categoría.
   *
   * @param id_comunidad - UUID de la comunidad.
   * @returns IComunidad o null si no se encuentra.
   */
  public async buscarPorId(id_comunidad: string): Promise<Comunidad | null> {
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
  public async buscarPorSlug(slug: string): Promise<Comunidad | null> {
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
  public async buscarTodasActivas(): Promise<Comunidad[]> {
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
  public async buscarPorCreador(
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
