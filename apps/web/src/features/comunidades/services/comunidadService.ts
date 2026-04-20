import { api } from '@/shared/lib/api/client';
import { IComunidad, ICategoriaComunidad } from '@repo/types';

export interface CreateCommunityDto {
  nombre: string;
  descripcion?: string;
  id_categoria_comunidad: number;
  portada_url?: string;
}

export const comunidadService = {
  /**
   * Crea una nueva comunidad
   */
  async createComunidad(dto: CreateCommunityDto): Promise<IComunidad> {
    return api.post<IComunidad>('/comunidades', dto);
  },

  /**
   * Obtiene las comunidades del usuario autenticado
   */
  async getMisComunidades(): Promise<IComunidad[]> {
    return api.get<IComunidad[]>('/comunidades/mis-comunidades');
  },

  /**
   * Obtiene una comunidad por ID
   */
  async getComunidad(id: string): Promise<IComunidad> {
    return api.get<IComunidad>(`/comunidades/${id}`);
  },

  /**
   * Obtiene la lista de categorías disponibles
   */
  async getCategorias(): Promise<ICategoriaComunidad[]> {
    return api.get<ICategoriaComunidad[]>('/comunidades/categorias');
  }
};
