import { IUsuario, IMiembroComunidad, ISuscripcion } from '@repo/types';

export class Usuario implements IUsuario {
  public id_usuario: string;
  public nombre: string;
  public apellido: string;
  public email: string;
  public password_hash?: string;
  public fecha_alta: string | Date;
  public activa: boolean;
  public miembro_comunidad?: IMiembroComunidad[];
  public suscripcion?: ISuscripcion[];

  public constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }
}
