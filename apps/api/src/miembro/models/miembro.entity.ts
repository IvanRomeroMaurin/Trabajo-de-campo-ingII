import { IMiembroComunidad, IComunidad, IRol, IUsuario } from '@repo/types';

export class Miembro implements IMiembroComunidad {
  public id_usuario: string;
  public id_comunidad: string;
  public id_rol_comunidad: string;
  public fecha_ingreso: string | Date;
  public fecha_actualizacion?: string | Date | null;
  public comunidad?: IComunidad;
  public rol?: IRol;
  public usuario?: IUsuario;

  public constructor(partial: Partial<Miembro>) {
    Object.assign(this, partial);
  }
}
