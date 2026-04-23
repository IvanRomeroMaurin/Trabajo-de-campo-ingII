import { IPlanComunidad, ICicloPago } from '@repo/types';

/**
 * Interfaz que define el contrato para el acceso a datos de Planes.
 * Sigue el patrón Repository para desacoplar la lógica de negocio de la persistencia.
 */
export abstract class PlanesRepository {
  /**
   * Registra un nuevo plan en la base de datos.
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
  }): Promise<IPlanComunidad>;

  /**
   * Obtiene todos los planes asociados a una comunidad.
   */
  abstract buscarPorComunidad(id_comunidad: string): Promise<IPlanComunidad[]>;

  /**
   * Obtiene la lista de ciclos de pago disponibles.
   */
  abstract buscarCiclosPago(): Promise<ICicloPago[]>;
}
