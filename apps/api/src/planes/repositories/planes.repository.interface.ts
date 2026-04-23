import { IPlanComunidad, ICicloPago } from '@repo/types';
import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';

/**
 * Interfaz que define el contrato para el acceso a datos de Planes.
 * Sigue el patrón Repository para desacoplar la lógica de negocio de la persistencia.
 */
export abstract class PlanesRepository {
  /**
   * Registra un nuevo plan de suscripción en el sistema.
   *
   * @param data - Objeto con la información necesaria para crear el plan.
   * @param data.titulo - Nombre descriptivo del plan.
   * @param data.descripcion - (Opcional) Detalle de lo que incluye el plan.
   * @param data.precio - Monto a cobrar en la suscripción.
   * @param data.id_ciclo_pago - ID del ciclo de pago (frecuencia).
   * @param data.id_moneda - ID de la moneda del plan.
   * @param data.mp_preapproval_plan_id - ID del plan generado en Mercado Pago.
   * @param data.id_comunidad - ID de la comunidad a la que pertenece el plan.
   * @param data.activa - Estado inicial del plan.
   * @returns Una promesa que resuelve con el plan creado.
   */
  abstract guardar(data: {
    titulo: string;
    descripcion?: string;
    precio: number;
    id_ciclo_pago: string;
    id_moneda: string;
    mp_preapproval_plan_id: string;
    id_comunidad: string;
    activa: boolean;
  }): Promise<PlanComunidad>;

  /**
   * Obtiene todos los planes de suscripción asociados a una comunidad específica.
   * Incluye la información relacionada de ciclos de pago y moneda.
   *
   * @param id_comunidad - Identificador único de la comunidad.
   * @returns Una promesa con el listado de planes encontrados.
   */
  public abstract buscarPorComunidad(id_comunidad: string): Promise<PlanComunidad[]>;

  /**
   * Obtiene la lista completa de ciclos de pago (frecuencias) disponibles en el sistema.
   *
   * @returns Una promesa con el listado de ciclos de pago.
   */
  public abstract buscarCiclosPago(): Promise<CicloPago[]>;
}
