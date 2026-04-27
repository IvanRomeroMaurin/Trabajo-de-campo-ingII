import { Injectable } from '@nestjs/common';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';
import { IPlanesRepository } from '../infrastructure/planes.repository.interface';
import { PlanesMapper } from '../infrastructure/planes.mapper';

/**
 * Implementación de PlanesRepository usando Prisma.
 * Utiliza nestjs-cls para gestionar transacciones de forma transparente.
 */
@Injectable()
export class PrismaPlanesRepository implements IPlanesRepository {
  public constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) { }

  /**
   * Registra o actualiza un plan de suscripción utilizando Prisma (Upsert).
   *
   * @param plan - La entidad plan a persistir.
   * @returns El plan mapeado al dominio de la aplicación.
   */
  public async guardarPlan(plan: PlanComunidad): Promise<PlanComunidad> {
    const persistido = await this.txHost.tx.plan_comunidad.upsert({
      where: { id_plan_comunidad: plan.id_plan_comunidad },
      update: {
        precio: plan.precio,
        titulo: plan.titulo,
        activa: plan.activa,
        descripcion: plan.descripcion,
        id_ciclo_pago: plan.id_ciclo_pago,
        id_moneda: plan.id_moneda,
        mp_preapproval_plan_id: plan.mp_preapproval_plan_id,
      },
      create: {
        id_plan_comunidad: plan.id_plan_comunidad,
        precio: plan.precio,
        titulo: plan.titulo,
        activa: plan.activa,
        fecha_creacion: plan.fecha_creacion,
        id_comunidad: plan.id_comunidad,
        id_ciclo_pago: plan.id_ciclo_pago,
        id_moneda: plan.id_moneda,
        descripcion: plan.descripcion,
        mp_preapproval_plan_id: plan.mp_preapproval_plan_id,
      },
      include: { ciclo_pago: true, moneda: true },
    });

    return PlanesMapper.toIPlanComunidad(persistido);
  }

  /**
   * Recupera un plan por su ID único.
   *
   * @param id_plan - UUID del plan.
   * @returns La entidad PlanComunidad or null.
   */
  public async buscarPlanPorId(id_plan: string): Promise<PlanComunidad | null> {
    const plan = await this.txHost.tx.plan_comunidad.findUnique({
      where: { id_plan_comunidad: id_plan },
      include: {
        ciclo_pago: true,
        moneda: true,
      },
    });

    if (!plan) return null;
    return PlanesMapper.toIPlanComunidad(plan);
  }

  /**
   * Recupera todos los planes de una comunidad desde la base de datos.
   * Realiza un join con las tablas de ciclo de pago y moneda.
   *
   * @param id_comunidad - ID de la comunidad propietaria de los planes.
   * @returns Lista de planes ordenados por fecha de creación descendente.
   */
  public async buscarPlanesPorComunidad(
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
  public async buscarCiclosDePago(): Promise<CicloPago[]> {
    const ciclos = await this.txHost.tx.ciclo_pago.findMany({
      orderBy: [{ tipo_frecuencia: 'asc' }, { frecuencia: 'asc' }],
    });

    return ciclos.map((c) => PlanesMapper.toICicloPago(c));
  }
}
