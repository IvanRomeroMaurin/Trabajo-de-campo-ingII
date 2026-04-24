import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';

import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';
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
   * Registra un nuevo plan de suscripción utilizando Prisma.
   * Asigna automáticamente la fecha de creación actual.
   *
   * @param data - Datos para la creación del plan.
   * @returns El plan mapeado al dominio de la aplicación.
   */
  public async guardar(data: {
    titulo: string;
    descripcion?: string;
    precio: number;
    id_ciclo_pago: string;
    id_moneda: string;
    mp_preapproval_plan_id: string;
    id_comunidad: string;
  }): Promise<PlanComunidad> {
    const plan = await this.txHost.tx.plan_comunidad.create({
      data: {
        ...data,
        activa: true,
        fecha_creacion: new Date(),
      },
    });

    return PlanesMapper.toIPlanComunidad(plan);
  }


  /**
   * Recupera todos los planes de una comunidad desde la base de datos.
   * Realiza un join con las tablas de ciclo de pago y moneda.
   *
   * @param id_comunidad - ID de la comunidad propietaria de los planes.
   * @returns Lista de planes ordenados por fecha de creación descendente.
   */
  public async buscarPorComunidad(
    id_comunidad: string,
  ): Promise<PlanComunidad[]> {
    const planes = await this.txHost.tx.plan_comunidad.findMany({
      where: { id_comunidad },
      include: {
        ciclo_pago: true,
        moneda: true,
      },
      orderBy: { fecha_creacion: 'desc' },
    });

    return planes.map((p) => PlanesMapper.toIPlanComunidad(p));
  }

  /**
   * Obtiene todos los ciclos de pago disponibles ordenados por tipo y frecuencia.
   *
   * @returns Lista de ciclos de pago mapeados.
   */
  public async buscarCiclosPago(): Promise<CicloPago[]> {
    const ciclos = await this.txHost.tx.ciclo_pago.findMany({
      orderBy: [{ tipo_frecuencia: 'asc' }, { frecuencia: 'asc' }],
    });

    return ciclos.map((c) => PlanesMapper.toICicloPago(c));
  }
}
