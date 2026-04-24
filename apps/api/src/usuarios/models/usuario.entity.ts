import { IUsuario, IMiembroComunidad, ISuscripcion } from '@repo/types';

export class Usuario implements IUsuario {
  public constructor(
    public readonly id_usuario: string,
    public readonly nombre: string,
    public readonly apellido: string,
    public readonly email: string,
    public readonly fecha_alta: string | Date,
    public readonly activa: boolean,
    public readonly miembro_comunidad?: IMiembroComunidad[],
    public readonly suscripcion?: ISuscripcion[],
    /**
     * Solo disponible en contextos de autenticación.
     * NUNCA serializar en respuestas HTTP.
     */
    public readonly password_hash?: string,
  ) {}
}

