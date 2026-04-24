import { IMiembroComunidad, IComunidad, IRol, IUsuario } from '@repo/types';

export class Miembro implements IMiembroComunidad {
  public constructor(
    public readonly id_usuario: string,
    public readonly id_comunidad: string,
    public readonly id_rol_comunidad: string,
    public readonly fecha_ingreso: string | Date,
    public readonly fecha_actualizacion?: string | Date | null,
    public readonly comunidad?: IComunidad,
    public readonly rol?: IRol,
    public readonly usuario?: IUsuario,
  ) {}
}

