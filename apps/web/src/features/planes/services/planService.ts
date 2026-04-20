import { api } from '@/shared/lib/api/client';
import { ICreatePlanRequest, ICreatePlanResponse } from '@repo/types';

export const planService = {
  /**
   * Crea un nuevo plan de suscripción en la comunidad y en Mercado Pago
   */
  async createPlan(dto: ICreatePlanRequest): Promise<ICreatePlanResponse> {
    return api.post<ICreatePlanResponse>('/planes', dto);
  },

  /**
   * Obtiene los planes de una comunidad (opcional, si existe endpoint)
   * Nota: El backend suele incluirlos en el detalle de la comunidad.
   */
  async getPlanesByComunidad(idComunidad: string) {
    // Si no hay endpoint específico, se obtienen a través del detalle de la comunidad
    return api.get<any>(`/planes/comunidad/${idComunidad}`);
  }
};
