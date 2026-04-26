import { PlanComunidad } from '../models/plan.entity';
import { CicloPago } from '../models/ciclo-pago.entity';

/**
 * Interfaz que define el contrato para el acceso a datos de Planes.
 * Sigue el patrón Repository para desacoplar la lógica de negocio de la persistencia.
 */
export abstract class IPlanesRepository {
  /**
   * Registra o actualiza un plan de suscripción en el sistema (Upsert).
   *
   * @param plan - La entidad plan a persistir.
   * @returns Una promesa que resuelve con el plan persistido.
   */
  public abstract guardar(plan: PlanComunidad): Promise<PlanComunidad>;

  /**
   * Busca un plan por su identificador único.
   *
   * @param id_plan - Identificador del plan.
   * @returns El plan encontrado o null.
   */
  public abstract buscarPorId(id_plan: string): Promise<PlanComunidad | null>;

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

