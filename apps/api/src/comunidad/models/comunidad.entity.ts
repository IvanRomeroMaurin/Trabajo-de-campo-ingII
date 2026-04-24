import {
  IComunidad,
  ICategoriaComunidad,
  ICurso,
  IMiembroComunidad,
  IPlanComunidad,
} from '@repo/types';
export class Comunidad implements IComunidad {
  public constructor(
    public readonly id_comunidad: string,
    public readonly nombre: string,
    public readonly slug: string,
    public readonly activa: boolean,
    public readonly fecha_creacion: Date,
    public readonly id_categoria_comunidad: string,

    public readonly descripcion?: string | null,
    public readonly portada_url?: string | null,
    public readonly categoria_comunidad?: ICategoriaComunidad,
    public readonly curso?: ICurso[],
    public readonly miembro_comunidad?: IMiembroComunidad[],
    public readonly plan_comunidad?: IPlanComunidad[],
  ) {}
}

