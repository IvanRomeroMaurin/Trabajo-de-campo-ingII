import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';

/**
 * Datos necesarios para la creación de un nuevo plan de suscripción.
 */
export interface CrearPlanData {
  readonly titulo: string;
  readonly descripcion?: string;
  readonly precio: number;
  readonly id_ciclo_pago: string;
  readonly id_moneda: string;
  readonly mp_preapproval_plan_id: string;
  readonly id_comunidad: string;
}

/**
 * Interfaz que define el contrato para el acceso a datos de Planes.
 * Sigue el patrón Repository para desacoplar la lógica de negocio de la persistencia.
 */
export abstract class PlanesRepository {
  /**
   * Registra un nuevo plan de suscripción en el sistema.
   *
   * @param data - Datos para la creación del plan.
   * @returns Una promesa que resuelve con el plan creado.
   */
  public abstract guardar(data: CrearPlanData): Promise<PlanComunidad>;

  /**
   * Obtiene todos los planes de suscripción asociados a una comunidad específica.
   * Incluye la información relacionada de ciclos de pago y moneda.
   *
   * @param id_comunidad - Identificador único de la comunidad.
   * @returns Una promesa con el listado de planes encontrados.
   */
  public abstract buscarPorComunidad(
    id_comunidad: string,
  ): Promise<PlanComunidad[]>;

  /**
   * Obtiene la lista completa de ciclos de pago (frecuencias) disponibles en el sistema.
   *
   * @returns Una promesa con el listado de ciclos de pago.
   */
  public abstract buscarCiclosPago(): Promise<CicloPago[]>;
}

