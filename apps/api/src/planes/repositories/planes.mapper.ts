import { plan_comunidad, ciclo_pago, moneda } from '@prisma/client';
import { IPlanComunidad, ICicloPago } from '@repo/types';
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
  ): IPlanComunidad {
    return new PlanComunidad({
      ...p,
      id_plan_comunidad: p.id_plan_comunidad,
      id_comunidad: p.id_comunidad,
      id_ciclo_pago: p.id_ciclo_pago,
      id_moneda: p.id_moneda,
      precio: Number(p.precio),
      descripcion: p.descripcion ?? undefined,
      mp_preapproval_plan_id: p.mp_preapproval_plan_id ?? undefined,
      // Mapear relaciones anidadas si existen
      ciclo_pago: p.ciclo_pago
        ? new CicloPago({
            ...p.ciclo_pago,
            id_ciclo_pago: p.ciclo_pago.id_ciclo_pago,
          })
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
   * Transforma una entidad de ciclo de pago de Prisma a la interfaz ICicloPago.
   *
   * @param c - El objeto de ciclo de pago de la base de datos.
   * @returns El ciclo de pago formateado.
   */
  public static toICicloPago(c: ciclo_pago): ICicloPago {
    return new CicloPago({
      ...c,
      id_ciclo_pago: c.id_ciclo_pago,
    });
  }
}
