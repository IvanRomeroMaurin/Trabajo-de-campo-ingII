import { ICategoriaComunidad, IComunidad } from '@repo/types';

export class CategoriaComunidad implements ICategoriaComunidad {
  public id_categoria_comunidad: string;
  public descripcion: string;
  public activa: boolean;
  public comunidad?: IComunidad[];

  public constructor(partial: Partial<CategoriaComunidad>) {
    Object.assign(this, partial);
  }
}
