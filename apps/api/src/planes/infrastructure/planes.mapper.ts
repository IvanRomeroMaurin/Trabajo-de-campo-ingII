import { plan_comunidad, ciclo_pago, moneda } from '@prisma/client';
import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';

/**
 * Mapper para transformar entidades de Prisma a interfaces de dominio (IPlanComunidad, ICicloPago).
 */
export class PlanesMapper {
  /**
   * Transforma una entidad de base de datos (Prisma) en una interfaz de dominio IPlanComunidad.
   * Maneja la conversión de tipos (como Decimal a Number) y mapea relaciones anidadas.
   *
   * @param p - El objeto crudo de la base de datos.
   * @returns El plan formateado según la interfaz de dominio.
   */
  public static toIPlanComunidad(
    p: plan_comunidad & {
      ciclo_pago?: ciclo_pago;
      moneda?: moneda;
    },
  ): PlanComunidad {
    return PlanComunidad.reconstituirPlanComunidad({
      id_plan_comunidad: p.id_plan_comunidad,
      precio: Number(p.precio),
      titulo: p.titulo,
      activa: p.activa,
      fecha_creacion: p.fecha_creacion,
      id_comunidad: p.id_comunidad,
      id_ciclo_pago: p.id_ciclo_pago,
      id_moneda: p.id_moneda,
      descripcion: p.descripcion ?? undefined,
      mp_preapproval_plan_id: p.mp_preapproval_plan_id ?? undefined,
      ciclo_pago: p.ciclo_pago
        ? PlanesMapper.toICicloPago(p.ciclo_pago)
        : undefined,
      moneda: p.moneda
        ? {
            ...p.moneda,
            id_moneda: p.moneda.id_moneda,
          }
        : undefined,
    });
  }

  /**
   * Transforma una entidad de ciclo de pago de Prisma a la entidad de dominio CicloPago.
   *
   * @param c - El objeto de ciclo de pago de la base de datos.
   * @returns El ciclo de pago formateado.
   */
  public static toICicloPago(c: ciclo_pago): CicloPago {
    return new CicloPago(c.id_ciclo_pago, c.frecuencia, c.tipo_frecuencia);
  }
}
