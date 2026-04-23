import { IPlanComunidad, ICicloPago } from '@repo/types';

/**
 * Mapper para transformar entidades de Prisma a interfaces de dominio (IPlanComunidad, ICicloPago).
 */
export class PlanesMapper {
  /**
   * Mapea un objeto de plan proveniente de Prisma a IPlanComunidad.
   */
  static toIPlanComunidad(p: any): IPlanComunidad {
    return {
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
        ? {
            ...p.ciclo_pago,
            id_ciclo_pago: p.ciclo_pago.id_ciclo_pago,
          }
        : undefined,
      moneda: p.moneda
        ? {
            ...p.moneda,
            id_moneda: p.moneda.id_moneda,
          }
        : undefined,
    } as IPlanComunidad;
  }

  /**
   * Mapea un objeto de ciclo de pago de Prisma a ICicloPago.
   */
  static toICicloPago(c: any): ICicloPago {
    return {
      ...c,
      id_ciclo_pago: c.id_ciclo_pago,
    };
  }
}
