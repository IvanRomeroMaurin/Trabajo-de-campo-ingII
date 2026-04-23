import { CrearPlanCommand } from './planes.commands';
import { ICreatePlanResponse, IPlanComunidad, ICicloPago } from '@repo/types';

/**
 * Interfaz que define el contrato para el servicio de Planes.
 */
export abstract class PlanesService {
  /**
   * Registra un nuevo plan de suscripción asociado a una comunidad.
   *
   * @param command - Datos del plan a crear.
   * @returns Una promesa con la respuesta de creación del plan.
   */
  abstract crearPlan(command: CrearPlanCommand): Promise<ICreatePlanResponse>;

  /**
   * Obtiene la lista de todos los ciclos de pago configurados en el sistema.
   *
   * @returns Una promesa con el arreglo de ciclos de pago.
   */
  abstract getValidCiclosPago(): Promise<ICicloPago[]>;

  /**
   * Obtiene todos los planes de suscripción asociados a una comunidad.
   *
   * @param id_comunidad - ID de la comunidad.
   * @returns Una promesa con el arreglo de planes encontrados.
   */
  abstract getPlanesPorComunidad(id_comunidad: string): Promise<IPlanComunidad[]>;
}
