import { IComunidad, ICategoriaComunidad, ICurso, IMiembroComunidad, IPlanComunidad } from '@repo/types';

export class Comunidad implements IComunidad {
  public id_comunidad: string;
  public nombre: string;
  public slug: string;
  public portada_url?: string | null;
  public activa: boolean;
  public fecha_creacion: string | Date;
  public descripcion?: string | null;
  public id_categoria_comunidad: string;
  public categoria_comunidad?: ICategoriaComunidad;
  public curso?: ICurso[];
  public miembro_comunidad?: IMiembroComunidad[];
  public plan_comunidad?: IPlanComunidad[];

  public constructor(partial: Partial<Comunidad>) {
    Object.assign(this, partial);
  }
}
