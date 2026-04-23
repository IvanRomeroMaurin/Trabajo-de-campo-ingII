import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { IPlanComunidad, ICicloPago } from '@repo/types';
import { PlanesRepository } from './planes.repository.interface';
import { PlanesMapper } from './planes.mapper';

/**
 * Implementación de PlanesRepository usando Prisma.
 * Utiliza nestjs-cls para gestionar transacciones de forma transparente.
 */
@Injectable()
export class PrismaPlanesRepository implements PlanesRepository {
  public constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  /**
   * Guarda un nuevo plan en la base de datos.
   */
  public async guardar(data: {
    titulo: string;
    descripcion?: string;
    precio: number;
    id_ciclo_pago: string;
    id_moneda: string;
    mp_preapproval_plan_id: string;
    id_comunidad: string;
    activa: boolean;
  }): Promise<IPlanComunidad> {
    const plan = await this.txHost.tx.plan_comunidad.create({
      data: {
        ...data,
        fecha_creacion: new Date(),
      },
    });

    return PlanesMapper.toIPlanComunidad(plan);
  }

  /**
   * Busca todos los planes de una comunidad.
   */
  public async buscarPorComunidad(
    id_comunidad: string,
  ): Promise<IPlanComunidad[]> {
    const planes = await this.txHost.tx.plan_comunidad.findMany({
      where: { id_comunidad },
      include: {
        ciclo_pago: true,
        moneda: true,
      },
      orderBy: { fecha_creacion: 'desc' },
    });

    return planes.map(PlanesMapper.toIPlanComunidad);
  }

  /**
   * Obtiene los ciclos de pago configurados.
   */
  public async buscarCiclosPago(): Promise<ICicloPago[]> {
    const ciclos = await this.txHost.tx.ciclo_pago.findMany({
      orderBy: [{ tipo_frecuencia: 'asc' }, { frecuencia: 'asc' }],
    });

    return ciclos.map(PlanesMapper.toICicloPago);
  }
}
