import { api } from '@/shared/lib/api/client';
import type { IUsuario, IRespuestaAuth, IRegistrarUsuario } from '@repo/types';

/**
 * Servicio de Autenticación
 * Encapsula todas las llamadas a la API relacionadas con la gestión de usuarios y sesiones.
 */
export const authService = {
  /**
   * Inicia sesión con correo y contraseña.
   */
  async login(credenciales: { email: string; password: string }): Promise<IRespuestaAuth> {
    return api.post<IRespuestaAuth>('/auth/iniciar-sesion', credenciales);
  },

  /**
   * Registra un nuevo usuario en la plataforma.
   */
  async registro(datos: IRegistrarUsuario & { password: string }): Promise<IUsuario> {
    return api.post<IUsuario>('/auth/registrar', datos);
  },

  /**
   * Obtiene el perfil del usuario autenticado.
   */
  async getPerfil(): Promise<Partial<IUsuario>> {
    return api.get<Partial<IUsuario>>('/auth/perfil');
  },
};
